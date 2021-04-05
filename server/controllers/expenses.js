const Expenses = require("../models").Expenses;
import { A } from "../mongomodels/a";
import { B } from "../mongomodels/b";

module.exports = {
  create(req, res) {
    return Expenses.create({
      name: req.body.name,
      amount: req.body.amount,
      reciept: req.body.reciept,
      expensesId: req.params.expensesId,
      createdBy: req.body.createdBy,
    })
      .then((expenses) => res.status(201).send(expenses))
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Expenses.findAll()
      .then((expenses) => res.status(200).send(expenses))
      .catch((error) => res.status(400).send(error));
  },
  createA(req, res) {
    return A.create({
      name: req.params.name,
    })
      .then((result) => res.status(201).send(result))
      .catch((error) => res.status(400).send(error));
  },
  createB(req, res) {
    return B.create({
      name: req.params.name,
    })
      .then((result) => {
        A.updateOne({ _id: req.params.id }, { $push: { bs: result._id } })
          .then(() => res.status(201).send(result))
          .catch((error) => res.status(400).send(error));
        // res.status(201).send(result);
      })
      .catch((error) => res.status(400).send(error));
  },
  getas(req, res) {
    return A.find({ _id: req.params.id })
      .populate("bs")
      .then((result) => res.status(200).send(result))
      .catch((error) => res.status(400).send(error));
  },
};
