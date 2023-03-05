const { body } = require("express-validator");

/**
 *
 * @type {ValidationChain[]}
 */
exports.indexValidator = [body("key").exists().withMessage("key is required")];

exports.validateUsername = [
  body("username").exists().notEmpty().withMessage("Username is required. Please enter a username to find the favorite program"),
];
