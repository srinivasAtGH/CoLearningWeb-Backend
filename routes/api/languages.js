var router = require("express").Router();

const languageController = require("../../src/interfaces/controllers/language.controller");

router.get("/languages", languageController.getLanguages);

module.exports = router;
