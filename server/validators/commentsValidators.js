const { getValidation } = require("../utils/exp-validator");
const { check } = require("express-validator");

//fix email to accept empty
const postCommentValidator = [
    check("name").isString(),
    check("email").not().isEmpty().bail().normalizeEmail().isEmail(),
    getValidation("blog_id", "string"),
    getValidation("body", "string"),
    getValidation("notify", "boolean"),
];

module.exports = {
    postCommentValidator,
};
