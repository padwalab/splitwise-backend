import express from "express";
import { GroupController } from "../controllers/groupController";
const jwt = require("jsonwebtoken");

var router = express.Router();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    // req.body.token = bearerToken;
    jwt.verify(bearerToken, "secret", (err, authData) => {
      err
        ? res.status(403).send({ status: "ERROR", message: "User Unathorized" })
        : next();
    });
  } else {
    res.status(403).send({ status: "ERROR", message: "User unauthorized" });
  }
}
export default router;
/* GET users listing. */
router.post("/", verifyToken, GroupController.create);

router.get("/:groupId", verifyToken, GroupController.get);

router.get("/:groupId/members", verifyToken, GroupController.members);

router.get("/:groupId/memberships", verifyToken, GroupController.memberships);

// router.delete("/:groupId/exit", GroupController.leave);
