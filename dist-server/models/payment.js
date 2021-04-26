"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PaymentSchema = new _mongoose["default"].Schema({
  payer: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Membership"
  },
  payee: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Membership"
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

var Payment = _mongoose["default"].model("Payment", PaymentSchema);

exports.Payment = Payment;