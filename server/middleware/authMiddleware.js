const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma.js");

const { createAccessToken } = require("../utils/createTokens");

const requireAuth2 = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken && !accessToken) {
        return next();
    }

    try {
        const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.userId = data.userId;
        console.log(data);
        return next();
    } catch {
        console.log("we are here", req);
    }

    if (!refreshToken) {
        return next();
    }

    let data;

    try {
        data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
        return next();
    }

    // const user = await User.findOne(data.userId);

    //token has been invalidated
    if (!user || user.count !== data.count) {
        return next();
    }

    // if all is good
    const tokens = createTokens({ userId: user._id, userName: user.username, count: user.count });
    res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: false, // set to true if your using https
    });

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false, // set to true if your using https
    });
    req.userId = user._id;
    console.log("we are here", req.userId);

    next();
};

// authenticate token
const requireAuth = async (req, res, next) => {
    let access_token = req.headers["authorization"];
    const refresh_token = req.body.refresh_token;
    console.log({ access_token, refresh_token });

    // if token not found
    if (!access_token || !refresh_token) {
        return res.sendStatus(401);
    }

    try {
        const { userId } = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Correct access token");
        req.body.user_id = userId;
        next();
    } catch (err) {
        try {
            console.log("Wrong access token");
            const { userId } = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

            // refresh_token that was sent is valid
            const user = await prisma.user.findFirst({
                where: { id: userId },
            });

            // refresh_token are the same that's in the databse
            if (user.refresh_token === refresh_token) {
                console.log("Refresh_tokens are the same");
                res.locals.access_token = createAccessToken({ userId });
                req.body.user_id = userId;
                res.locals.role = user.role;
                next();
            } else {
                console.log("Refresh_tokens don't match");
                res.sendStatus(403);
                next();
            }
        } catch (err) {
            console.log("Wrong refresh token");
            return res.status(403).send({
                error: true,
                message: "Invalid refresh token",
            });
        }
    }

    delete req.body.refresh_token;
};

const adminOnly = async (req, res, next) => {
    // IS ADMIN;

    if (!res.locals.role) {
        try {
            // so we dont make multiple requests as we do one in requireAuth if access_token expired
            const user = await prisma.user.findFirst({
                where: { id: req.body.user_id },
            });

            if (user.role.toLowerCase() === "admin") {
                next();
            } else {
                console.log("Not an admin");
                res.sendStatus(403);
            }
        } catch (err) {
            console.log("adminOnly: userId not found");
            res.sendStatus(403);
        }
    } else if (res.locals.role.toLowerCase() === "admin") {
        delete res.locals.role;

        next();
    } else {
        console.log("Not an admin");
        res.sendStatus(403);
    }
};

module.exports = {
    requireAuth,
    adminOnly,
    requireAuth2,
};
