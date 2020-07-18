const Sequelize = require("sequelize");
const UserModel = require("./User");

var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "colearningweb.sqlite",
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User };
