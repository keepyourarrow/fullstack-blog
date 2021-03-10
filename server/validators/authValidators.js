const { getValidation } = require("../utils/exp-validator");

const signupValidator = [
    getValidation("userName", "string"),
    getValidation("email", "email"),
    getValidation("password", "string"),
];

const loginValidator = [getValidation("userField", "string"), getValidation("password", "string")];

const resendVerificationValidator = [getValidation("email", "email")];

module.exports = {
    signupValidator,
    loginValidator,
    resendVerificationValidator,
};
