"use strict";
var { LearningConnection } = require("../models/sequelize"); 

function createLearningConnectionRequest(payload, user, callback) {

    let learningConnection = new LearningConnection();
  
    learningConnection.userId = payload.request.userId;
    learningConnection.partnerId = payload.request.partnerId;
    learningConnection.skillId = payload.request.skillId;
    learningConnection.skillFluency = payload.request.skillFluency;
    learningConnection.timeCommitment = payload.request.timeCommitment;
    learningConnection.personalNoteRequest = payload.request.personalNoteRequest;
    learningConnection.actionUserId = user.Id;
    learningConnection.connectionType = payload.request.connectionType;

    /*learningConnection.save((err, learningConnection) => {
        if (err) return callback(err, null);
        return callback(null, learningConnection);
      });*/

      learningConnection
      .save()
      .then((learningConnection) => {
        return callback(null, learningConnection);
      })
      .catch((err) => callback(err, null));
}

function getLearningConnections(payload, callback) {

    LearningConnection.findAll({ where: { userId: payload.id } }).then((learningConnections) => {

      return callback(null, learningConnections);
    
    /*if (!learningConnection) {
      return res.status(404).json({ message: "Learning Connection does not exist." });
    }
    res.json(learningConnection);*/
  })
  .catch((err) => callback(err, null));

}


module.exports = {createLearningConnectionRequest, getLearningConnections}
