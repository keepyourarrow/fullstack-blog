const { getValidation } = require("../utils/exp-validator");
const { check } = require("express-validator");

const postBlogValidator = [
    getValidation("user_id", "int"),
    getValidation("title", "string"),
    check("content").notEmpty().isString(),
    getValidation("category", "string"),
];

const putBlogValidator = [getValidation("title", "string")];

module.exports = {
    postBlogValidator,
    putBlogValidator,
};
