var router = require("express").Router();

const skillController = require("../../src/interfaces/controllers/skill.controller");

router.get("/skills", skillController.getSkills);

module.exports = router;
