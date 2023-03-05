const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/index.controller");
const { validate } = require("../middlewares/validators/wrapper.validator");
const {
  indexValidator, validateUsername,
} = require("../middlewares/validators/index.validations");

router.get("/", IndexController.HomePage);
router.post(
  "/getFavoriteLanguage",
  validate(validateUsername),
  IndexController.getFavoriteProgammingLanguage
);

router.post("/", validate(indexValidator), IndexController.indexPost);

module.exports = router;
