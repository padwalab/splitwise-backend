import express from "express";
import { UserController } from "../controllers/userController";
const jwt = require("jsonwebtoken");
var router = express.Router();
export default router;

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
/* GET users listing. */
router.get("/", UserController.register);

router.post("/signin", UserController.signin);

router.post("/login", UserController.login);

router.put("/:groupId/invite", verifyToken, UserController.invite);

router.put("/:groupId/accept", verifyToken, UserController.accept);

router.put("/:userEmail/update", verifyToken, UserController.update);

router.get("/:userId/groups", verifyToken, UserController.groups);

router.get("/:userEmail/details", verifyToken, UserController.getUserDetails);

router.get("/:userEmail/getId", verifyToken, UserController.getUserIdFromEmail);

router.get("/list", verifyToken, UserController.list);

router.get("/:userId/invites", verifyToken, UserController.getInvites);
