"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Note = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NoteSchema = new _mongoose["default"].Schema({
  note: {
    type: String,
    required: true
  },
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

var Note = _mongoose["default"].model("Note", NoteSchema);

exports.Note = Note;