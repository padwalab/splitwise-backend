"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Groups, {
        foreignKey: "expensesId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Users, {
        foreignKey: "createdBy",
        onDelete: "CASCADE",
      });
    }
  }
  Expenses.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      reciept: { type: DataTypes.STRING },
      createdBy: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Expenses",
    }
  );
  return Expenses;
};
