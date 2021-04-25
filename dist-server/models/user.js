"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = require("validator");

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
var userSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [_validator.isEmail, "invalid email"]
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  profile_photo: {
    type: String
  },
  default_currency: {
    type: String,
    "default": "USD"
  },
  time_zone: {
    type: String,
    "default": "PT"
  },
  language: {
    type: String,
    "default": "ENG"
  },
  groups: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Group"
  }],
  invites: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Group"
  }]
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;