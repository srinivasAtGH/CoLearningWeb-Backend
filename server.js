const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
  apis: ["./routes/api/users.js"],
};
const swaggerDocument = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyparser.json());

var users = require("./routes/api/users.js");

app.use(require("./routes"));

app.listen(3000, () => {
  console.log("Server listening at 3000 ...");
});
