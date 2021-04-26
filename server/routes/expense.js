import express from "express";
import { ExpenseController } from "../controllers/expenseController";
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
router.post("/:groupId/add", verifyToken, ExpenseController.add);

router.put("/:expenseId/comment", verifyToken, ExpenseController.note);
