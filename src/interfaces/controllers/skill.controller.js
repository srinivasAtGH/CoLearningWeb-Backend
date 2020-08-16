const { getAllSkills } = require("../../services/skill.service");

const getSkills = async (req, res, next) => {
  console.log("inside getskills of controller");
  skills = await getAllSkills();
  res.json(skills);
  next();
};

module.exports = {
  getSkills,
};
