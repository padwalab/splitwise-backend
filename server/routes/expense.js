import express from "express";
import { ExpenseController } from "../controllers/expenseController";

var router = express.Router();
export default router;
/* GET users listing. */
router.post("/:groupId/add", ExpenseController.add);

router.put("/:expenseId/comment", ExpenseController.note);
