"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _groupController = require("../controllers/groupController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jwt = require("jsonwebtoken");

var router = _express["default"].Router();

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

var _default = router;
/* GET users listing. */

exports["default"] = _default;
router.post("/", verifyToken, _groupController.GroupController.create);
router.get("/:groupId", verifyToken, _groupController.GroupController.get);
router.get("/:groupId/members", verifyToken, _groupController.GroupController.members);
router.get("/:groupId/memberships", verifyToken, _groupController.GroupController.memberships); // router.delete("/:groupId/exit", GroupController.leave);