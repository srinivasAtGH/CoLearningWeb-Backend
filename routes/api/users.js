var auth = require("../auth");
var router = require("express").Router();
var { User, Skill, UserSkills } = require("../../models/sequelize");

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
    termsandconditionsaccepted: newUser.terms_and_conditions_checked,
    emailverified: true,
    gender: newUser.gender,
  })
    .then((user) => {
      if (user.isguide) {
        Skill.findOne({
          where: { skillname: newUser.skill_to_guide },
        }).then((skill) => {
          if (!skill) {
            Skill.create({ skillname: newUser.skill_to_guide }).then(
              (createdSkill) => {
                user.addSkill(createdSkill, {
                  through: { skilltype: "guide" },
                });
              }
            );
          } else {
            user.addSkill(skill, { through: { skilltype: "guide" } });
          }
        });
      }

      if (user.islearner) {
        Skill.findOne({
          where: { skillname: newUser.skill_to_learn },
        }).then((skill) => {
          if (!skill) {
            Skill.create({ skillname: newUser.skill_to_learn }).then(
              (createdSkill) => {
                user.addSkill(createdSkill, {
                  through: { skilltype: "learner" },
                });
              }
            );
          } else {
            user.addSkill(skill, { through: { skilltype: "learner" } });
          }
        });
      }

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
  User.findAll().then((users) => res.json(users));
});

router.get("/users/:id", auth, (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Skill,
        attributes: ["skillname"],
        through: { attributes: ["skilltype"] },
      },
    ],
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
    if (updatedUser.bio !== undefined) {
      user.bio = updatedUser.bio;
    }

    if (updatedUser.phonenumber !== undefined) {
      user.phonenumber = updatedUser.phonenumber;
    }

    if (updatedUser.photo !== undefined) {
      user.photo = updatedUser.photo;
    }

    if (updatedUser.photo !== undefined) {
      user.photo = updatedUser.photo;
    }

    if (updatedUser.occupation !== undefined) {
      user.occupation = updatedUser.occupation;
    }

    if (updatedUser.firstname !== undefined) {
      user.firstname = updatedUser.firstname;
    }
    if (updatedUser.lastname !== undefined) {
      user.lastname = updatedUser.lastname;
    }

    if (updatedUser.country !== undefined) {
      user.country = updatedUser.country;
    }

    if (updatedUser.state !== undefined) {
      user.state = updatedUser.state;
    }

    if (updatedUser.city !== undefined) {
      user.city = updatedUser.city;
    }

    if (updatedUser.email !== undefined) {
      user.email = updatedUser.email;
    } //

    if (updatedUser.emaiprivacy !== undefined) {
      user.emaiprivacy = updatedUser.emaiprivacy;
    }

    if (updatedUser.phonenumber !== undefined) {
      user.phonenumber = updatedUser.phonenumber;
    }
    if (updatedUser.phonenumberprivacy !== undefined) {
      user.phonenumberprivacy = updatedUser.phonenumberprivacy;
    }

    if (updatedUser.whatsappnumber !== undefined) {
      user.whatsappnumber = updatedUser.whatsappnumber;
    }

    if (updatedUser.whatsappnumberprivacy !== undefined) {
      user.whatsappnumberprivacy = updatedUser.whatsappnumberprivacy;
    }

    if (updatedUser.connectionprivacy !== undefined) {
      user.connectionprivacy = updatedUser.connectionprivacy;
    }

    if (updatedUser.birthdate !== undefined) {
      user.birthdate = updatedUser.birthdate;
    }

    if (updatedUser.gender !== undefined) {
      user.gender = updatedUser.gender;
    }

    if (updatedUser.occupation !== undefined) {
      user.occupation = updatedUser.occupation;
    }

    if (updatedUser.islearner !== undefined) {
      user.islearner = updatedUser.islearner;
    }

    if (updatedUser.isguide !== undefined) {
      user.isguide = updatedUser.isguide;
    }

    if (updatedUser.bio !== undefined) {
      user.bio = updatedUser.bio;
    }

    if (updatedUser.iscolearner !== undefined) {
      user.iscolearner = updatedUser.iscolearner;
    }

    // Todo: For all other editable fields
    user.save().then((user) => res.json(user));
  });
});

module.exports = router;
