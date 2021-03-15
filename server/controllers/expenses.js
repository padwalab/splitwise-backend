const Expenses = require("../models").Expenses;

module.exports = {
  create(req, res) {
    return Expenses.create({
      name: req.body.name,
      amount: req.body.amount,
      reciept: req.body.reciept,
      expensesId: req.params.expensesId,
    })
      .then((expenses) => res.status(201).send(expenses))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Expenses.findAll()
      .then((expenses) => res.status(200).send(expenses))
      .catch((error) => res.status(400).send(error));
  },
};
