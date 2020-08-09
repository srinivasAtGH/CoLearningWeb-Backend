var auth = require("../auth");
var router = require("express").Router();
var { LearningConnection } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var secret = require("../../config").secret;

const learningConnectionController = require("../../src/interfaces/controllers/learningconnection.controller");

router.post("/learning_connection/send_request", auth, learningConnectionController.postLearningConnection);

router.get("/learning_connections", auth, learningConnectionController.listLearningConnections);

module.exports = router;