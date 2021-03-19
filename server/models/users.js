"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Groups, {
        through: "UserGroups",
        as: "groups",
        foreignKey: "userId",
        otherKey: "groupId",
      });
      this.hasMany(models.Expenses, {
        foreignKey: "createdBy",
        as: "expenses",
      });
    }
  }
  Users.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.TEXT, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      profile_photo: { type: DataTypes.STRING },
      default_currency: { type: DataTypes.STRING, defaultValue: "USD" },
      time_zone: { type: DataTypes.STRING, defaultValue: "PT" },
      language: { type: DataTypes.STRING, defaultValue: "ENG" },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
