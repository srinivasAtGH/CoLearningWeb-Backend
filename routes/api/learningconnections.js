var auth = require("../auth");
var router = require("express").Router();
var { LearningConnection } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var secret = require("../../config").secret;

const learningConnectionController = require("../../src/interfaces/controllers/learningconnection.controller");

router.post("/learning_connection/send_request", auth, learningConnectionController.postLearningConnection);

router.get("/learning_connections", auth, learningConnectionController.listLearningConnections);

//TBD - This is not working as req.params.id is always returning undefined even when using mergeParams true
//TBD - Fix this issue at a later date
//router.delete("/learning_connection/:id", auth, learningConnectionController.deleteLearningConnection);
router.delete("/learning_connection/:id", auth, async(req,res, next)=> {
    await learningConnectionController.deleteLearningConnection(req.user, req.params.id, res, next);
});

router.put("/learning_connection/:id/accept", auth, async(req,res, next)=> {
    await learningConnectionController.acceptLearningConnection(req.user, req.params.id, req.body, res, next);
})

router.put("/learning_connection/:id/reject", auth, async(req,res, next)=> {
    await learningConnectionController.rejectLearningConnection(req.user, req.params.id, req.body, res, next);
})

router.put("/learning_connection/:id/cancel", auth, async(req,res, next)=> {
    await learningConnectionController.cancelLearningConnection(req.user, req.params.id, res, next);
})

router.get("/learning_connections/:id", auth, async(req,res, next)=> {
    await learningConnectionController.getLearningConnectionDetails(req.user, req.params.id, res, next);
})

module.exports = router;