module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define("Skill", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    skillname: DataTypes.STRING,
  });

  return Skill;
};
