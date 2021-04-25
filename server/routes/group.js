import express from "express";
import { GroupController } from "../controllers/groupController";

var router = express.Router();
export default router;
/* GET users listing. */
router.post("/", GroupController.create);

router.get("/:groupId", GroupController.get);

router.get("/:groupId/members", GroupController.members);

router.get("/:groupId/memberships", GroupController.memberships);

// router.delete("/:groupId/exit", GroupController.leave);
