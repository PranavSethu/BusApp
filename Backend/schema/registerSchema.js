const { check } = require("express-validator");

const userValidationSchema = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
  check("password").notEmpty().withMessage("Password cannot be empty"),
];

module.exports = { userValidationSchema };
