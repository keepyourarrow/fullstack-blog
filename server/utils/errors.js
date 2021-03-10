const { validationResult } = require("express-validator");

const checkValidatorError = (req) => {
  const result = validationResult(req).array();

  console.log(result);
  const errors = result.map((item) => {
    return { field: item.param, message: item.msg };
  });

  return errors;
};

const notFoundError = (res, message) => {
  return res.status(404).json({ message });
};

const conflictError = (res, message) => {
  return res.status(409).json({ message });
};

const internalServerError = (res, message) => {
  return res.status(500).json({ message });
};

module.exports = {
  checkValidatorError,
  notFoundError,
  conflictError,
  internalServerError,
};
