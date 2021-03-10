const jwt = require("jsonwebtoken");

const createAccessToken = ({ userId }) => {
    const access_token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "45min",
    });
    return access_token;
};

const createRefreshToken = ({ userId }) => {
    const refresh_token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);

    return refresh_token;
};

module.exports = {
    createAccessToken,
    createRefreshToken,
};
