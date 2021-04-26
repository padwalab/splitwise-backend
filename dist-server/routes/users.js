"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require("jsonwebtoken");

var router = _express["default"].Router();

var _default = router;
exports["default"] = _default;

function verifyToken(req, res, next) {
  var bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    var bearerToken = bearerHeader.split(" ")[1]; // req.body.token = bearerToken;

    jwt.verify(bearerToken, "secret", function (err, authData) {
      err ? res.status(403).send({
        status: "ERROR",
        message: "User Unathorized"
      }) : next();
    });
  } else {
    res.status(403).send({
      status: "ERROR",
      message: "User unauthorized"
    });
  }
}
/* GET users listing. */


router.get("/", _userController.UserController.register);
router.post("/signin", _userController.UserController.signin);
router.post("/login", _userController.UserController.login);
router.put("/:groupId/invite", verifyToken, _userController.UserController.invite);
router.put("/:groupId/accept", verifyToken, _userController.UserController.accept);
router.put("/:userEmail/update", verifyToken, _userController.UserController.update);
router.get("/:userId/groups", verifyToken, _userController.UserController.groups);
router.get("/:userEmail/details", verifyToken, _userController.UserController.getUserDetails);
router.get("/:userEmail/getId", verifyToken, _userController.UserController.getUserIdFromEmail);
router.get("/list", verifyToken, _userController.UserController.list);
router.get("/:userId/invites", verifyToken, _userController.UserController.getInvites);