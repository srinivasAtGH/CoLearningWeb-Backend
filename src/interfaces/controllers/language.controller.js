const { getAllLanguages } = require("../../services/language.service");

const getLanguages = async (req, res, next) => {
  console.log("inside getLanguages of controller");
  skills = await getAllLanguages();
  res.json(skills);
  next();
};

module.exports = {
  getLanguages,
};
