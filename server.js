const express = require("express");
var cors = require("cors");

const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./Docs/swagger.yaml');

app.use(bodyparser.json());
app.use(cors());

app.use("/api/", require('./routes/api'));
app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDocument));

app.listen(3100, () => {
  console.log("Server listening at 3100 ...");
});
