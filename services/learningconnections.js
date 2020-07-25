"use strict";
var { LearningConnection } = require("../models/sequelize"); 

function createLearningConnectionRequest(payload, callback) {

    let learningConnection = new LearningConnection();
  
    learningConnection.userId = payload.request.userId;
    learningConnection.partnerId = payload.request.partnerId;
    learningConnection.skillId = payload.request.skillId;
    learningConnection.skillFluency = payload.request.skillFluency;
    learningConnection.timeCommitment = payload.request.timeCommitment;
    learningConnection.personalNoteRequest = payload.request.personalNoteRequest;
    learningConnection.actionUserId = payload.request.userId;
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

module.exports = {createLearningConnectionRequest}
