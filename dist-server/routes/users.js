"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var _default = router;
/* GET users listing. */

exports["default"] = _default;
router.get("/", _userController.UserController.register);
router.post("/signin", _userController.UserController.signin);
router.post("/login", _userController.UserController.login);
router.put("/:groupId/invite", _userController.UserController.invite);
router.put("/:groupId/accept", _userController.UserController.accept);
router.put("/:userEmail/update", _userController.UserController.update);
router.get("/:userId/groups", _userController.UserController.groups);
router.get("/:userEmail/details", _userController.UserController.getUserDetails);
router.get("/:userEmail/getId", _userController.UserController.getUserIdFromEmail);
router.get("/list", _userController.UserController.list);
router.get("/:userId/invites", _userController.UserController.getInvites);