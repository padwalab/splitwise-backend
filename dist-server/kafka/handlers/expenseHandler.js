"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpenseHandler = void 0;

var _user = require("../../models/user");

var _group = require("../../models/group");

var _expense = require("../../models/expense");

var _membership = require("../../models/membership");

var _note = require("../../models/note");

var ExpenseHandler = {};
exports.ExpenseHandler = ExpenseHandler;

ExpenseHandler.register = function (params, body, res) {
  res.status(200).send("success");
};

ExpenseHandler.add = function (params, body, res) {
  return _expense.Expense.create({
    name: body.name,
    description: body.description,
    amount: body.amount,
    createdBy: body.createdBy
  }).then(function (expense) {
    _group.Group.findOneAndUpdate({
      _id: params.groupId
    }, {
      $addToSet: {
        expenses: expense._id
      }
    }).then(function (group) {
      return res.status(200).send(expense);
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};

ExpenseHandler.note = function (params, body, res) {
  return _note.Note.create({
    note: body.note,
    createdBy: body.userId
  }).then(function (note) {
    return _expense.Expense.findOneAndUpdate({
      _id: params.expenseId
    }, {
      $addToSet: {
        notes: note._id
      }
    }, {
      returnOriginal: false,
      "new": true
    }).populate({
      path: "notes",
      populate: {
        path: "createdBy"
      }
    }).then(function (expense) {
      return res.status(200).send(expense);
    });
  })["catch"](function (error) {
    return res.status(400).send(error);
  });
};