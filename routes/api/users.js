const auth = require("../auth");
const Sequelize = require("sequelize");
const router = require("express").Router();
const { User, Skill } = require("../../models/sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var secret = require("../../config").secret;

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ errors: ["User name or password is missing"] });
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
      res.json({ errors: ["User name or password is wrong"] });
      return;
    } else {
      var today = new Date();
      var exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      console.log("id:" + user.Id);
      console.log("username:" + user.username);
      const token = jwt.sign(
        {
          id: user.Id,
          username: user.username,
          exp: parseInt(exp.getTime() / 1000),
        },
        secret
      );
      res.json({
        user: { access_token: token, username: user.username, userid: user.id },
      });
    }
  });
});

router.post("/register", (req, res) => {
  const newUser = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(newUser.password, salt, 10000, 512, "sha512")
    .toString("hex");

  User.create({
    username: newUser.username,
    hash: hash,
    salt: salt,
    email: newUser.email,
    isguide: newUser.available_to_mentor,
    islearner: newUser.need_mentoring,
    iscolearner: newUser.need_colearner,
    istermsandconditionschecked: newUser.terms_and_conditions_checked,
    emailverified: true,
    gender: newUser.gender,
    guidingSkills: newUser.guidingskills,
    learningSkills: newUser.learningskills,
  })
    .then((user) => {
      return res.json({
        status: "success",
        message: "User " + user.username + " was created successfully",
      });
    })
    .catch((response) => {
      res.status(422).json({
        errors: response.errors.map((error) => {
          return error.message;
        }),
      });
    });
});

router.get("/users", auth, (req, res) => {
  const filter = req.body;

  var whereStatement = {};
  if (filter.skill)
    var whereStatement = {
      [Op.or]: [
        {
          guidingSkills: {
            [Op.like]: "%" + filter.skill + "%",
          },
        },
        {
          learningSkills: {
            [Op.like]: "%" + filter.skill + "%",
          },
        },
      ],
    };

  console.log(whereStatement);

  User.findAll({ where: whereStatement, logging: console.log }).then((users) =>
    res.json(users)
  );
});

router.get("/users/:id", auth, (req, res) => {
  User.findOne({
    where: { id: req.params.id },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }
    res.json(user);
  });
});

router.put("/changepassword", auth, (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(function (user) {
    if (
      !user ||
      user.hash !==
        crypto
          .pbkdf2Sync(
            req.body.username.oldpassword,
            user.salt,
            10000,
            512,
            "sha512"
          )
          .toString("hex")
    ) {
      res.status(404).json({ message: "password is wrong" });
      return;
    }
  });

  res.json(user);
});

router.put("/users/:id", auth, (req, res) => {
  const updatedUser = req.body;
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.bio = updatedUser.bio;
    user.phonenumber = updatedUser.phonenumber;
    user.photo = updatedUser.photo;
    user.occupation = updatedUser.occupation;
    user.firstname = updatedUser.firstname;
    user.lastname = updatedUser.lastname;
    user.country = updatedUser.country;
    user.state = updatedUser.state;
    user.city = updatedUser.city;
    user.email = updatedUser.email;
    user.emaiprivacy = updatedUser.emaiprivacy;
    user.phonenumber = updatedUser.phonenumber;
    user.phonenumberprivacy = updatedUser.phonenumberprivacy;
    user.whatsappnumber = updatedUser.whatsappnumber;
    user.whatsappnumberprivacy = updatedUser.whatsappnumberprivacy;
    user.connectionprivacy = updatedUser.connectionprivacy;
    user.birthdate = updatedUser.birthdate;
    user.gender = updatedUser.gender;
    user.occupation = updatedUser.occupation;
    user.islearner = updatedUser.islearner;
    user.isguide = updatedUser.isguide;
    user.bio = updatedUser.bio;
    user.iscolearner = updatedUser.iscolearner;
    user.languages = updatedUser.languages;
    user.learningSkils = updatedUser.learningSkils;
    user.guidingSkills = updatedUser.guidingSkills;

    user.save().then((user) => res.json(user));
  });
});

module.exports = router;
