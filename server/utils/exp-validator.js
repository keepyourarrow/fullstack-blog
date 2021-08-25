const { check, body } = require("express-validator");

const getValidation = (val, type) => {
    if (type === "string") {
        return check(val).trim().escape().notEmpty().isString();
    } else if (type === "email") {
        // console.log(check(val).normalizeEmail().isEmail());
        return check(val).normalizeEmail().isEmail();
    } else if (type == "boolean") {
        return check(val).isBoolean();
    }

    //int
    return check(val).notEmpty().bail().isInt().toInt();
};

module.exports = {
    getValidation,
};
