module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    Id: {
      field: "id",
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      field: "username",
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required",
        },
        len: {
          args: [6, 15],
          msg: "Username must be between 6 and 15 characters",
        },
      },
    },
    email: {
      field: "email",
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required",
        },
        isEmail: { args: true, msg: "Email is not valid" },
      },
    },
    hash: { type: DataTypes.TEXT },
    salt: DataTypes.STRING(1000),
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    emailprivacy: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: true,
    },
    phonenumber: DataTypes.STRING,
    phonenumberprivacy: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: true,
    },
    whatsappnumber: DataTypes.STRING,
    whatsappnumberprivacy: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: true,
    },
    connectionprivacy: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: true,
    },
    birthdate: DataTypes.DATE,
    gender: {
      type: DataTypes.ENUM("male", "female"),
      allowNull: true,
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
    istermsandconditionschecked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isemailverified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guidingSkills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    learningSkills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return User;
};
