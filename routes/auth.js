const jwt = require("jsonwebtoken");
var secret = require("../config").secret;

module.exports = function (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ message: "The authorization token is missing!" }); // if there isn't any token

  jwt.verify(token, secret, (err, user) => {
    console.log(err);
    if (err) return res.status(401).json({ message: "The token is invalid!" });
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
};
