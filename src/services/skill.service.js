var { Skill } = require("../../models/sequelize");

const getAllSkills = async () => {
  let skills = await Skill.findAll();
  return skills;
};

module.exports = {
  getAllSkills,
};
