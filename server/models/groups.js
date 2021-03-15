"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Expenses, {
        foreignKey: "expensesId",
        as: "expenseItems",
      });
    }
  }
  Groups.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Groups",
    }
  );
  return Groups;
};
