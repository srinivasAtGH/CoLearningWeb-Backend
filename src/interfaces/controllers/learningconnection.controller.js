const url = require('url')
const { createLearningConnectionRequest, getLearningConnections } = require('../../services/learningconnection.service')

/*
 * call other imported services, or same service but different functions here if you need to
*/
/*const postBlogpost = async (req, res, next) => {
  const {user, content} = req.body
  try {
    await createBlogpost(user, content)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.sendStatus(201)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}s

module.exports = {
  postBlogpost
}*/


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

    learningConnections = await getLearningConnections(req.user, url.parse(req.url, true).query, null)
    res.json(learningConnections)
    next()
}

function constructLearningConnectionResponse(learningConnection) {
    let connection = { learningConnection: learningConnection.toJSON() };
    return connection;
  }

module.exports = {
    postLearningConnection,
    listLearningConnections
  }


