module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("Users", {
    name: { type: DataTypes.STRING, allowNull: true },
    // lastName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    platform_id: { type: DataTypes.INTEGER, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    level: { type: DataTypes.STRING, allowNull: true },
    jobName: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    mobilePhone: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    birthday: { type: DataTypes.STRING, allowNull: true },
    profileImg: { type: DataTypes.STRING, allowNull: true },
    privacy: { type: DataTypes.BOOLEAN, allowNull: true },
    admin: { type: DataTypes.BOOLEAN, allowNull: false },
    yearsOfExp: { type: DataTypes.INTEGER, allowNull: true },
    mediaGroup: { type: DataTypes.FLOAT, allowNull: true },
    termsAndConditions: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false,
    },
  });

  return User;
};
