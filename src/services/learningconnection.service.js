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

const LearningConnectionStatus = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  cancelled: 'cancelled',
  deleted: 'deleted'
}

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

const getLearningConnectionDetailsSvc = async (user, id) => {

  var whereStatement = {};
  if(user.id) whereStatement.userId = user.id;
  if(id) whereStatement.id = id;

  let learningConnection = await LearningConnection.findOne({where: whereStatement});

  if(learningConnection !== null)
  {
    const learner = await User.findOne({ where: { id: learningConnection.userId } });
    const partner = await User.findOne({ where: { id: learningConnection.partnerId } });
    //const userSkill = await UserSkills.findOne({ where: { id: learningConnection.skillId } });
    //const skill = await Skill.findOne({ where: { id: userSkill.skillId } });

    return {
      "id":  learningConnection.id,
      "mentee": await getUser(learner),
      "mentor": await getUser(partner),
      "actionUserId": learningConnection.actionUserId,
      "creation_date": learningConnection.dateOfRequest,
      "accept_date": learningConnection.acceptanceRejectionDate,
      "state": learningConnection.connectionStatus,
      "notesrequest": learningConnection.personalNoteRequest,
      "notesresponse": learningConnection.personalNoteResponse,
      "skillname": learningConnection.skillName,
      "connectionType": learningConnection.connectionType,
      "timecommitment": learningConnection.timeCommitment,
      "skillfluency": learningConnection.skillFluency
    }    
  }
  else
  {
    var message = "Learning connection with id:" + id + " not found for user:" + user.id;
    throw new Error(message);  
  }
}

const updateLearningConnectionSvc = async(user, id, notes, targetStatus) => {

  var learningConnection = await LearningConnection.findOne({where: {id: id}});

  if(learningConnection !== null){
    if((targetStatus === LearningConnectionStatus.accepted) || 
      (targetStatus === LearningConnectionStatus.rejected)  || 
      (targetStatus === LearningConnectionStatus.cancelled))
    {
      if(learningConnection.connectionStatus === LearningConnectionStatus.pending)
      {
        learningConnection.connectionStatus = targetStatus;
        if(notes !== null)
        {
          learningConnection.personalNoteResponse = notes;
        }
        if((targetStatus === LearningConnectionStatus.accepted) || 
          (targetStatus === LearningConnectionStatus.rejected))
        {
          learningConnection.acceptanceRejectionDate = Date();  
        }
        await learningConnection.save();
      }
      else
      {
        await throwStatusUpdateError(learningConnection,targetStatus);
      }
    }
    else //deleted
    {
      if((targetStatus === LearningConnectionStatus.deleted) && 
        (learningConnection.connectionStatus !== LearningConnectionStatus.deleted))
      {
        learningConnection.connectionStatus = targetStatus;
        await learningConnection.save();
      }
      else
      {
        await throwStatusUpdateError(learningConnection,targetStatus);  
      }
    }
  }
  else
  {
    var message = "Learning connection with id:" + id + " not found.";
    throw new Error(message);  
  }
}


module.exports = {
  createLearningConnectionRequest,
  getLearningConnections,
  updateLearningConnectionSvc,
  getLearningConnectionDetailsSvc,
  LearningConnectionStatus,
};
