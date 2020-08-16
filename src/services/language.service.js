var { Language } = require("../../models/sequelize");

const getAllLanguages = async () => {
  let skills = await Language.findAll();
  return skills;
};

module.exports = {
  getAllLanguages,
};
