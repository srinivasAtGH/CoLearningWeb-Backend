"use strict";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
var {
  LearningConnection,
  User,
  UserSkills,
  Skill,
} = require("../../models/sequelize");
var util = require("util");
const { use } = require("../../routes/api/users");

const createLearningConnectionRequest = async (user, payload) => {
  try {
    let learningConnection = new LearningConnection();

    learningConnection.userId = payload.request.userId;
    learningConnection.partnerId = payload.request.partnerId;
    learningConnection.skillName = payload.request.skillName;
    learningConnection.skillFluency = payload.request.skillFluency;
    learningConnection.timeCommitment = payload.request.timeCommitment;
    learningConnection.personalNoteRequest =
      payload.request.personalNoteRequest;
    learningConnection.actionUserId = user.Id;
    learningConnection.connectionType = payload.request.connectionType;
    learningConnection.connectionStatus = "pending";
    learningConnection.dateOfRequest = Date();

    return await learningConnection.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

const getLearningConnections = async (user, connectionStatus) => {
  try {
    var condition_userorpartner = {}
    var whereCondition = {}
    
    if(user.id)
    {
      condition_userorpartner = { 

        [Op.or]: [ 
          { 
            userId: {
              [Op.eq]: user.id
              },
          },
          { 
            partnerId: {
              [Op.eq]: user.id
              },
          },
        ]
      }
    } 

    console.log(
      util.inspect(connectionStatus, { showHidden: false, depth: null })
    );
    if (Object.entries(connectionStatus).length != 0) {
      //whereStatement.connectionStatus = connectionStatus.status;
      whereCondition = Sequelize.and(condition_userorpartner, {connectionStatus: connectionStatus.status});
    }
    else
    {
      whereCondition = condition_userorpartner;
    }

    let learningConnections = await LearningConnection.findAll({
      where: whereCondition,
    });

    return Promise.all(
      learningConnections.map(async (learningConnection) => {
        const learner = await User.findOne({
          where: { id: learningConnection.userId },
        });
        const partner = await User.findOne({
          where: { id: learningConnection.partnerId },
        });

        return {
          id: learningConnection.id,
          mentee: await getUser(learner),
          mentor: await getUser(partner),
          actionUserId: learningConnection.actionUserId,
          creation_date: learningConnection.dateOfRequest,
          accept_date: learningConnection.acceptanceRejectionDate,
          state: learningConnection.connectionStatus,
          notesrequest: learningConnection.personalNoteRequest,
          notesresponse: learningConnection.personalNoteResponse,
          skillname: learningConnection.skillName,
          connectionType: learningConnection.connectionType,
        };
      })
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

async function getUser(user) {
  return {
    id: user.Id,
    name: user.firstname + " " + user.lastname,
  };
}

module.exports = {
  createLearningConnectionRequest,
  getLearningConnections,
};
