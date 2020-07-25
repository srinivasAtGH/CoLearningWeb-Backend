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

router.post("/learningconnection", (req, res) => {
   
    let payload = req.body;

    learningConnectionService.createLearningConnectionRequest(payload, (err, learningConnection) => {
        // TODO: Better error response
        console.log("inside callback");
        if (err) 
        {
          console.log(err);
          return res.sendStatus(422);
        }
        if (!learningConnection) return res.sendStatus(422);
        return res.json(constructLearningConnectionResponse(learningConnection));
  });
});

function constructLearningConnectionResponse(learningConnection) {
    console.log("inside constructUserResponse1");
    let connection = { learningConnection: learningConnection.toJSON() };
    return connection;
  }

module.exports = router;