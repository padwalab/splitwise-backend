"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expenseController = require("../controllers/expenseController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = router;
/* GET users listing. */

exports["default"] = _default;
router.post("/:groupId/add", _expenseController.ExpenseController.add);
router.put("/:expenseId/comment", _expenseController.ExpenseController.note);