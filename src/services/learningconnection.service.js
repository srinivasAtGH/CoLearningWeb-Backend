"use strict";
var { LearningConnection } = require("../../models/sequelize"); 

const createLearningConnectionRequest = async (user, payload) => {
    try
    {
    let learningConnection = new LearningConnection();
  
    learningConnection.userId = payload.request.userId;
    learningConnection.partnerId = payload.request.partnerId;
    learningConnection.skillId = payload.request.skillId;
    learningConnection.skillFluency = payload.request.skillFluency;
    learningConnection.timeCommitment = payload.request.timeCommitment;
    learningConnection.personalNoteRequest = payload.request.personalNoteRequest;
    learningConnection.actionUserId = user.Id;
    learningConnection.connectionType = payload.request.connectionType;

      return await learningConnection.save()
    }
    catch(e)
    {
        throw new Error(e.message)
    } 
}

const getLearningConnections = async (user) => {
    try
    {
        return await LearningConnection.findAll({ where: { userId: user.id } })
    }
    catch(e)
    {
        throw new Error(e.message)
    }
}

module.exports = {
  createLearningConnectionRequest,
  getLearningConnections
}
