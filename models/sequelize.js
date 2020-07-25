const Sequelize = require("sequelize");
const UserModel = require("./User");
const LearningConnectionModel = require("./LearningConnection");

var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "colearningweb.sqlite",
});

const User = UserModel(sequelize, Sequelize);
const LearningConnection = LearningConnectionModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User, LearningConnection };
