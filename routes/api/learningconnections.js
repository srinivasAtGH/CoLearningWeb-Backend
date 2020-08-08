var auth = require("../auth");
var router = require("express").Router();
var { LearningConnection } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var secret = require("../../config").secret;

const learningConnectionService = require("../../services/learningconnections.js");

router.post("/learning_connection/send_request", auth, (req, res) => {
   
    let payload = req.body;

    learningConnectionService.createLearningConnectionRequest(payload, req.user, (err, learningConnection) => {
        // TODO: Better error response
        if (err) 
        {
          console.log(err);
          return res.sendStatus(422);
        }
        if (!learningConnection) return res.sendStatus(422);
        return res.json(constructLearningConnectionResponse(learningConnection));
  });
});

router.get("/learning_connections", auth, (req, res) => {

    learningConnectionService.getLearningConnections(req.user, (err, learningConnections) => {
    // TODO: Better error response
    console.log("inside callback");
    if (err) 
    {
      console.log(err);
      return res.sendStatus(422);
    }
    if (!learningConnections) return res.sendStatus(422);
    return res.json(learningConnections);
});

});

function constructLearningConnectionResponse(learningConnection) {

    let connection = { learningConnection: learningConnection.toJSON() };
    return connection;
  }

module.exports = router;