module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: { type: DataTypes.TEXT },
    salt: DataTypes.STRING(1000),
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    citty: DataTypes.STRING,
    emai: DataTypes.STRING,
    emaiprivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    phonenumber: DataTypes.STRING,
    phonenumberprivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    whatsappnumber: DataTypes.STRING,
    whatsappnumberprivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    connectionprivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    birthdate: DataTypes.DATE,
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    occupation: DataTypes.STRING,
    photo: DataTypes.STRING,
    islearner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isguide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    bio: DataTypes.STRING,
    iscolearner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    termsandconditionsaccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    emailverified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return User;
};
