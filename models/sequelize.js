const Sequelize = require("sequelize");
const UserModel = require("./User");
const LearningConnectionModel = require("./LearningConnection");
const SkillModel = require("./Skill");
// const UserSkillModel = require("./UserSkill");
// const UserLanguageModel = require("./UserLanguage");

var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "colearningweb.sqlite",
  logging: console.log,
});

const Skill = SkillModel(sequelize, Sequelize);
console.log("skill: " + Skill);

const User = UserModel(sequelize, Sequelize);
console.log("User: " + User);

const LearningConnection = LearningConnectionModel(sequelize, Sequelize);
console.log("LearningConnection: " + LearningConnection);

// const UserSkill = UserSkillModel(sequelize, Sequelize);
// console.log("UserSkill: " + UserSkill);

// const UserLanguage = UserLanguageModel(sequelize, Sequelize);
// console.log("UserLanguage: " + UserLanguage);

// User.hasMany(UserLanguage);
// User.hasMany(UserSkill);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User, Skill, LearningConnection };
