"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Expense = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ExpenseSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  notes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Note"
  }]
}, {
  timestamps: true
});

var Expense = _mongoose["default"].model("Expense", ExpenseSchema);

exports.Expense = Expense;