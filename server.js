const express = require("express");
var cors = require("cors");

const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

app.use(bodyparser.json());
app.use(cors());
var users = require("./routes/api/users.js");
var learningconnections = require("./routes/api/learningconnections.js");

app.use(require("./routes"));
//app.use(users);
//app.use(learningconnections);

app.listen(3100, () => {
  console.log("Server listening at 3100 ...");
});
