const { getValidation } = require("../utils/exp-validator");

const getUserValidator = [getValidation("user_id", "int")];

module.exports = {
    getUserValidator,
};
