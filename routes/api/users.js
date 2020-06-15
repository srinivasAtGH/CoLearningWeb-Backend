var auth = require("../auth");
var router = require("express").Router();
var { User } = require("../../models/sequelize");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var secret = require("../../config").secret;

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
  apis: ["users.js"],
};
const swaggerDocument = swaggerJsDoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.post("/login", (req, res) => {
  const { username, password } = req.body;

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
      res.send("User name or password is wrong");
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
      res.send(token);
    }
  });
});

/**
 * @swagger
 * /register:
 *  post:
 *      description: some description
 *      responses:
 *          '200':
 *              description: res descr *
 */
router.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");

  User.create({
    username: username,
    hash: hash,
    salt: salt,
    email: email,
  }).then((result) => res.json(result));
});

router.get("/users", auth, (req, res) => {
  User.findAll().then((users) => res.json(users));
});

router.get("/users/:id", auth, (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => res.json(user));
});

router.put("/users/:id", auth, (req, res) => {
  const updatedUser = req.body;
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    user.Countryid = updatedUser.Countryid;
    user.save().then((user) => res.json(user));
  });
});

module.exports = router;
