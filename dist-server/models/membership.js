"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Membership = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MmeberShipSchema = new _mongoose["default"].Schema({
  member: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  share: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});

var Membership = _mongoose["default"].model("Membership", MmeberShipSchema);

exports.Membership = Membership;