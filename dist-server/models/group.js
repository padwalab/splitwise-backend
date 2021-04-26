"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// this.belongsToMany(models.Groups, {
//   through: "UserGroups",
//   as: "groups",
//   foreignKey: "userId",
//   otherKey: "groupId",
// });
// this.hasMany(models.Expenses, {
//   foreignKey: "createdBy",
//   as: "expenses",
var groupSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Membership"
  }],
  expenses: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Expense"
  }],
  payments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Payment"
  }]
}, {
  timestamps: true
});

var Group = _mongoose["default"].model("Group", groupSchema);

exports.Group = Group;