const UserGroups = require("../models").UserGroups;
const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;
const Payments = require("../models").Payments;
const { Sequelize } = require("sequelize");

module.exports = {
  getPayment(req, res) {
    Payments.findAll({
      where: {
        groupId: req.params.groupId,
      },
    }).then((result) => res.status(200).send(result));
  },
};
