module.exports = (sequelize, DataTypes) => {
  var UserSkills = sequelize.define("UserSkills", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    skilltype: DataTypes.ENUM("guide", "learner"),
    skillname: DataTypes.STRING,
  });
  return UserSkills;
};
