const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

app.use(bodyparser.json());

var users = require("./routes/api/users.js");

//app.use(require("./routes"));
app.use(users);

app.listen(3000, () => {
  console.log("Server listening at 3000 ...");
});
