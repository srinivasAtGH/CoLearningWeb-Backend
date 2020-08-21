const url = require('url')
var util = require("util");
const { 
        createLearningConnectionRequest, 
        getLearningConnections, 
        updateLearningConnectionSvc,
        getLearningConnectionDetailsSvc,
        LearningConnectionStatus} = require('../../services/learningconnection.service')

const postLearningConnection = async (req, res, next) => {
    let payload = req.body
    try 
    {
        learningConnection = await createLearningConnectionRequest(req.user, payload) 
        res.json(constructLearningConnectionResponse(learningConnection));
        next()
    } catch(e) {
      console.log(e.message)
      res.sendStatus(500) && next(e)
    }
  }
  
const listLearningConnections = async(req, res, next) => {
  try
  {
    learningConnections = await getLearningConnections(req.user, url.parse(req.url, true).query, null)
    res.json(learningConnections)
    next()
  } catch(e){
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

const getLearningConnectionDetails = async(user, id, res, next) => {
  try
  {
    learningConnectionDetails = await getLearningConnectionDetailsSvc(user, id)
    res.json(learningConnectionDetails)
    next()
  } catch(e){
    console.log(e.message)
    res.sendStatus(500) && next(e)
  }
}

//const deleteLearningConnection = async(req, res) => {
const deleteLearningConnection = async(user, id, res, next) => {
  await updateLearningConnectionSvc(user, id, null, LearningConnectionStatus.deleted).then(()=> {
    res.sendStatus(200)
    next()
  }).catch((e)=> {
    res.sendStatus(500) && next(e)
  });
}

//notes
const acceptLearningConnection = async(user, id, body, res, next)=>{
    await updateLearningConnectionSvc(user, id, body.notes, LearningConnectionStatus.accepted).then(()=> {
      res.sendStatus(200)
      next()
    }).catch((e)=> {
      res.sendStatus(500) && next(e)
    });
}

//notes
const rejectLearningConnection = async(user, id, body, res, next)=>{
  await updateLearningConnectionSvc(user, id, body.notes, LearningConnectionStatus.rejected).then(()=> {
    res.sendStatus(200)
    next()
  }).catch((e)=> {
    res.sendStatus(500) && next(e)
  });
}

const cancelLearningConnection = async(user, id, res, next)=>{
  await updateLearningConnectionSvc(user, id, null, LearningConnectionStatus.cancelled).then(()=> {
    res.sendStatus(200)
    next()
  }).catch((e)=> {
    res.sendStatus(500) && next(e)
  });
}

function constructLearningConnectionResponse(learningConnection) {
    let connection = { learningConnection: learningConnection.toJSON() };
    return connection;
}

module.exports = {
    postLearningConnection,
    listLearningConnections,
    deleteLearningConnection,
    acceptLearningConnection,
    rejectLearningConnection,
    cancelLearningConnection,
    getLearningConnectionDetails,
  }


