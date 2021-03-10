const { prisma } = require("../lib/prisma.js");
const { checkValidatorError, notFoundError } = require("../utils/errors");

function removeUselessProperties(user) {
    delete user.password;
    delete user.refresh_token;
    delete user.password_reset_count;
    delete user.disabled;
}

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({});

    for (let user of users) {
        removeUselessProperties(user);
        // removeUselessProperties(user);
        // removeUselessProperties(user);
        // removeUselessProperties(user);
    }

    res.json(users);
};
const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);

    let user = await prisma.user.findFirst({
        where: { id },
    });

    if (!user) {
        return notFoundError(res, "user not found");
    }

    removeUselessProperties(user);

    console.log("request has been made");
    res.json(user);
};

module.exports = {
    getAllUsers,
    getUserById,
};
