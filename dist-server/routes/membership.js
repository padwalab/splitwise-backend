"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _membershipController = require("../controllers/membershipController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = router;
/* GET users listing. */

exports["default"] = _default;
router.post("/:membershipId/add", _membershipController.MembershipController.add);
router.put("/:membershipId/exit", _membershipController.MembershipController.exit);
router.get("/:membershipId/balance", _membershipController.MembershipController.userBalance);
router.post("/settleup", _membershipController.MembershipController.settleUp);