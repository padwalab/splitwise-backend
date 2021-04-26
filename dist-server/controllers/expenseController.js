"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpenseController = void 0;

var _user = require("../models/user");

var _group = require("../models/group");

var _expense = require("../models/expense");

var _membership = require("../models/membership");

var _note = require("../models/note");

var _kafkaRunner = _interopRequireDefault(require("../kafka/kafkaRunner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var kafkaRunner = new _kafkaRunner["default"]();
var producer = kafkaRunner.producer;
producer.connect();
kafkaRunner.startExpenseConsumer();
var ExpenseController = {};
exports.ExpenseController = ExpenseController;

ExpenseController.register = function (req, res) {
  res.status(200).send("success");
};

ExpenseController.add = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "expense",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "add",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Expense.create({
  //   name: req.body.name,
  //   description: req.body.description,
  //   amount: req.body.amount,
  //   createdBy: req.body.createdBy,
  // })
  //   .then((expense) => {
  //     Group.findOneAndUpdate(
  //       { _id: req.params.groupId },
  //       { $addToSet: { expenses: expense._id } }
  //     ).then((group) => res.status(200).send(expense));
  //   })
  //   .catch((error) => res.status(400).send(error));
};

ExpenseController.note = function (req, res) {
  var replyId = Math.random().toString(36).substr(2);
  kafkaRunner.pushResponses(replyId, res);
  producer.send({
    topic: "expense",
    messages: [{
      value: JSON.stringify({
        id: replyId,
        action: "note",
        params: req.params,
        body: req.body
      })
    }]
  }); // return Note.create({
  //   note: req.body.note,
  //   createdBy: req.body.userId,
  // })
  //   .then((note) =>
  //     Expense.findOneAndUpdate(
  //       { _id: req.params.expenseId },
  //       { $addToSet: { notes: note._id } },
  //       { returnOriginal: false, new: true }
  //     )
  //       .populate({ path: "notes", populate: { path: "createdBy" } })
  //       .then((expense) => res.status(200).send(expense))
  //   )
  //   .catch((error) => res.status(400).send(error));
};