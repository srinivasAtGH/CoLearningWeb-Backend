const Sequelize = require("sequelize");
const UserModel = require("./User");
const LearningConnectionModel = require("./LearningConnection");
const SkillModel = require("./Skill");
const UserSkillsModel = require("./UserSkills");

var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "colearningweb.sqlite",
});

const Skill = SkillModel(sequelize, Sequelize);

console.log("skill: " + Skill);
const User = UserModel(sequelize, Sequelize);
const LearningConnection = LearningConnectionModel(sequelize, Sequelize);

console.log("User: " + User);

const UserSkills = UserSkillsModel(sequelize, Sequelize, User, Skill);

User.belongsToMany(Skill, { through: UserSkills });
Skill.belongsToMany(User, { through: UserSkills });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User, Skill, UserSkills, LearningConnection };
