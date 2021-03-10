const { getValidation } = require("../utils/exp-validator");
const { check } = require("express-validator");

const putCountViews = [getValidation("name", "string")];

module.exports = {
    putCountViews,
};
