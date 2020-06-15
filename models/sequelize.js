const Sequelize = require("sequelize");
const UserModel = require("./User");

var sequelize = new Sequelize("keepitsimple", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User };
