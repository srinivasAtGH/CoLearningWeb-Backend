module.exports = (sequelize, DataTypes) => {
  var Language = sequelize.define("Language", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    languagename: DataTypes.STRING,
  });

  return Language;
};
