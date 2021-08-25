const addMinutes = require("date-fns/addMinutes");
const bcrypt = require("bcrypt");
const compareAsc = require("date-fns/compareAsc");
const cryptoRandomString = require("crypto-random-string");
const nodemailer = require("nodemailer");
const { prisma } = require("../lib/prisma.js");

const { createAccessToken, createRefreshToken } = require("../utils/createTokens");
const { checkValidatorError, notFoundError, conflictError } = require("../utils/errors.js");

const verificationTemplate = require("../emailTemplates/verificationEmail.js");

//#region Creating a new user
const signup = async (req, res) => {
    let { userName, email, password, role } = req.body;

    let errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(400).json({ errors });
    }

    //hash password
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    role = userName.includes("@admin") ? "ADMIN" : "USER";
    userName = userName.replaceAll("@admin", "");

    try {
        // email verification token
        let token = cryptoRandomString({ length: 100, type: "base64" });

        await prisma.user.create({
            data: {
                email,
                userName,
                password,
                role,
                verifificationToken: {
                    create: { token },
                },
            },
        });

        await sendEmail({ host: req.get("host"), email, userName }, token);
        res.status(201).send();
    } catch (err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json(errors);
    }
};
//#endregion

//#region Login user
const login = async (req, res) => {
    let user;
    const { userField, password } = req.body;

    let errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // check if user is email or username
        if (userField.includes("@")) {
            // if email
            user = await prisma.user.findFirst({
                where: { email: userField },
            });
        } else {
            //if username
            user = await prisma.user.findFirst({
                where: { userName: userField },
            });
        }

        if (!user) {
            throw new Error("Invalid username or email");
        }

        if (!user.verified) {
            throw new Error("Please confirm your email to login");
        }

        /* IF we found user and he is verified */
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid password");
        }

        /* if all good */
        const access_token = createAccessToken({
            userId: user.id,
            userName: user.userName,
            role: user.role,
        });

        const refresh_token = createRefreshToken({
            userId: user.id,
        });

        // store token in database
        // if (user.refresh_token) {
        await prisma.user.update({
            where: { id: user.id },
            data: { refresh_token },
            // update: { refresh_token },
            // create: { refresh_token },
        });
        // }

        console.log({ refresh_token, access_token }, "authController login");
        res.json({ refresh_token, access_token });
    } catch (err) {
        console.log("authController login error", err);
        res.status(400).json({ err: err.message });
    }
    // const user = await User.find
};

// api/auth/verification-email
const resendVerificationEmail = async (req, res) => {
    let { email } = req.params;

    let errors = checkValidatorError(req, res);
    if (errors && errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // email verification token
        let token = cryptoRandomString({ length: 100, type: "base64" });
        const userFound = await prisma.user.findFirst({
            where: { email },
        });

        if (!userFound) {
            return notFoundError(res, "User with this email doesn't exist");
        }
        if (userFound.verified) {
            return conflictError(res, "You are already verified");
        }

        const user = await prisma.user.update({
            where: { email },
            data: {
                verifificationToken: {
                    upsert: {
                        update: {
                            token,
                            created_at: new Date().toJSON(),
                        },
                        create: {
                            token,
                            created_at: new Date().toJSON(),
                        },
                    },
                },
            },
        });

        await sendEmail({ host: req.get("host"), email, userName: user.userName }, token);
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "email hasn't been sent" });
    }
};

//#endregion

// api/auth/verify
const verifyEmail = async (req, res) => {
    // req.prasedUrl.query instead of req.query because req.query has spaces
    let token = req._parsedUrl.query.split("=")[1];

    const user = await prisma.user.findFirst({
        where: {
            verifificationToken: { token },
        },
        include: {
            verifificationToken: true,
        },
    });

    if (!user) {
        return notFoundError(res, "presented email token is not found");
    }

    const currentDate = new Date();

    const { created_at, expires_in } = user.verifificationToken;

    const tokenDate = addMinutes(new Date(created_at), expires_in);
    const difference = compareAsc(currentDate, tokenDate);

    // current date is before the token date expiry
    // user verified = true
    if (difference == -1) {
        await prisma.verifificationToken.update({
            where: { token },
            data: {
                user: {
                    update: {
                        verified: true,
                    },
                },
            },
        });

        //delete token
        deleteToken(token);

        res.status(200).json({ message: "Email has been successfully verified" });
    } else {
        res.status(401).json({ message: "Email token has expired. Please get a new one" });
    }
};

//#endregion

//#region - functions
// send verification email
const sendEmail = async (request, token) => {
    let link = "http://" + request.host + "/api/auth/verify?token=" + token;

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASS,
        },
    });

    let options = {
        from: process.env.OUTLOOK_EMAIL,
        to: request.email,
        subject: "Please confirm your Email account",
        html: verificationTemplate(request.userName, "raphi-blog", link),
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info.response);
    });
};

// deleteToken
async function deleteToken(token) {
    await prisma.verifificationToken.delete({
        where: { token },
    });
}
// handle errors
const handleErrors = (err) => {
    let { code, meta } = err;
    message = JSON.stringify(meta);
    let errors = {};

    // duplicate email error
    if (code === "P2002" && message.includes("email")) {
        errors.email = "Email already exists, you can try logging in with this email";
        return errors;
    }
    if (code === "P2002" && message.includes("userName")) {
        errors.userName = "A member with that username already exists";
        return errors;
    }

    //default error
    return {
        message: "Something went wrong while trying to signup",
        code: `Error code: ${code}`,
        meta: `Error meta: ${message}`,
    };
};
//#endregion

module.exports = {
    signup,
    login,
    resendVerificationEmail,
    verifyEmail,
    //   logout_get,
};
