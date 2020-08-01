var auth = require("../auth");
var router = require("express").Router();
var { LearningConnection } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var secret = require("../../config").secret;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const learningConnectionService = require("../../services/learningconnections.js");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "TakeItEasy API",
      description: "desc",
      contact: {
        name: "Some name",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["users.js"],
};
const swaggerDocument = swaggerJsDoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.post("/learningconnection", auth, (req, res) => {
   
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

router.get("/learningconnections", auth, (req, res) => {

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