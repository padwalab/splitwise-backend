"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _membershipController = require("../controllers/membershipController");

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
router.post("/:membershipId/add", verifyToken, _membershipController.MembershipController.add);
router.put("/:membershipId/exit", verifyToken, _membershipController.MembershipController.exit);
router.get("/:membershipId/balance", verifyToken, _membershipController.MembershipController.userBalance);
router.post("/settleup", verifyToken, _membershipController.MembershipController.settleUp);