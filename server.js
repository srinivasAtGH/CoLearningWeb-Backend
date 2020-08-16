const express = require("express");
var cors = require("cors");

const app = express();

const bodyparser = require("body-parser");
const crypto = require("crypto");

app.use(bodyparser.json());
app.use(cors());

app.use("/api/", require('./routes/api'));

app.listen(3100, () => {
  console.log("Server listening at 3100 ...");
});
