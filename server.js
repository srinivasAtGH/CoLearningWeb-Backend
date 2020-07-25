const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

app.use(bodyparser.json());

var users = require("./routes/api/users.js");
var learningconnections = require("./routes/api/learningconnections.js");

app.use(require("./routes"));
//app.use(users);
//app.use(learningconnections);

app.listen(3000, () => {
  console.log("Server listening at 3000 ...");
});
