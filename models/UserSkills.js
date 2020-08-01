module.exports = (sequelize, DataTypes, User, Skill) => {
  var UserSkills = sequelize.define("userSkills", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    skilltype: DataTypes.ENUM("guide", "learner"),
  });
  return UserSkills;
};
