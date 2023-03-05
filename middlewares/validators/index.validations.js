const { body } = require("express-validator");

/**
 *
 * @type {ValidationChain[]}
 */
exports.indexValidator = [body("key").exists().withMessage("key is required")];

exports.validateUsername = [
  body("username").exists().withMessage("username is required"),
];
