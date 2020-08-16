const Sequelize = require("sequelize");
const UserModel = require("./User");
const LearningConnectionModel = require("./LearningConnection");
const SkillModel = require("./Skill");
const LanguageModel = require("./Language");
const UserSkillsModel = require("./UserSkills");
const UserLanguagesModel = require("./UserLanguages");

var sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "colearningweb.sqlite",
});

const Language = LanguageModel(sequelize, Sequelize);
console.log("Language: " + Language);

const Skill = SkillModel(sequelize, Sequelize);
console.log("skill: " + Skill);

const User = UserModel(sequelize, Sequelize);
console.log("User: " + User);

const LearningConnection = LearningConnectionModel(sequelize, Sequelize);
console.log("LearningConnection: " + LearningConnection);

const UserSkills = UserSkillsModel(sequelize, Sequelize, User, Skill);
console.log("UserSkills: " + UserSkills);

const UserLanguages = UserLanguagesModel(sequelize, Sequelize, User, Language);
console.log("UserLanguages: " + UserLanguages);

User.belongsToMany(Skill, { through: UserSkills });
Skill.belongsToMany(User, { through: UserSkills });

User.belongsToMany(Language, { through: UserLanguages });
Language.belongsToMany(User, { through: UserLanguages });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = { User, Skill, UserSkills, LearningConnection, Language };
