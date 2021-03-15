const Groups = require("../models").Groups;
const Expenses = require("../models").Expenses;

module.exports = {
  create(req, res) {
    return Groups.create({
      name: req.body.name,
    })
      .then((group) => res.status(201).send(group))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Groups.findAll({
      include: [{ model: Expenses, as: "expenseItems" }],
    })
      .then((groups) => res.status(200).send(groups))
      .catch((error) => res.status(400).send(error));
  },
};
