"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Groups, {
        foreignKey: "groupId",
      });
      this.belongsTo(models.Users, {
        foreignKey: "userId",
      });
    }
  }
  UserGroups.init(
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
      share: {type: DataTypes.INTEGER, defaultValue: 0},
    },
    {
      sequelize,
      modelName: "UserGroups",
    }
  );
  return UserGroups;
};
