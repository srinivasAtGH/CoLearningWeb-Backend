module.exports = (sequelize, DataTypes, User, Skill) => {
  var UserSkills = sequelize.define("UserLanguages", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Description: DataTypes.STRING,
  });
  return UserSkills;
};
