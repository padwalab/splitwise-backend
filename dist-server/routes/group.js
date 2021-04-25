"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _groupController = require("../controllers/groupController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = router;
/* GET users listing. */

exports["default"] = _default;
router.post("/", _groupController.GroupController.create);
router.get("/:groupId", _groupController.GroupController.get);
router.get("/:groupId/members", _groupController.GroupController.members);
router.get("/:groupId/memberships", _groupController.GroupController.memberships); // router.delete("/:groupId/exit", GroupController.leave);