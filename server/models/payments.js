"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Groups, {
        foreignKey: "groupToId",
        onDelete: "CASCADE",
      });
    }
  }
  Payments.init(
    {
      payeeName: DataTypes.STRING,
      payerName: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Payments",
    }
  );
  return Payments;
};
