var auth = require("../auth");
var router = require("express").Router();
var { User } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var secret = require("../../config").secret;

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "User name or password is missing" });
    return;
  }
  User.findOne({
    where: {
      username: username,
    },
  }).then(function (user) {
    if (
      !user ||
      user.hash !==
        crypto
          .pbkdf2Sync(password, user.salt, 10000, 512, "sha512")
          .toString("hex")
    ) {
      res.status(404).json({ message: "User name or password is wrong" });
      return;
    } else {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      const token = jwt.sign(
        {
          id: this._id,
          username: this.username,
          exp: parseInt(exp.getTime() / 1000),
        },
        secret
      );
      res.json({ access_token: token });
    }
  });
});

router.post("/register", (req, res) => {
  const {
    username,
    password,
    email,
    terms_and_conditions_checked,
    need_mentoring,
    available_to_mentor,
    need_colearner,
  } = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");

  User.create({
    username: username,
    hash: hash,
    salt: salt,
    email: email,
    isguide: available_to_mentor,
    islearner: need_mentoring,
    iscolearner: need_colearner,
    termsandconditionsaccepted: terms_and_conditions_checked,
    emailverified: true,
  }).then((result) =>
    res.json({ message: "User " + username + " was created successfully" })
  );
});

router.get("/users", auth, (req, res) => {
  User.findAll().then((users) => res.json(users));
});

router.get("/users/:id", auth, (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    res.json(user);
  });
});

router.put("/users/:id", auth, (req, res) => {
  const updatedUser = req.body;
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.Countryid = updatedUser.Countryid;
    user.save().then((user) => res.json(user));
  });
});

module.exports = router;
