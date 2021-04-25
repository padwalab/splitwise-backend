import express from "express";
import { MembershipController } from "../controllers/membershipController";

var router = express.Router();
export default router;
/* GET users listing. */
router.post("/:membershipId/add", MembershipController.add);

router.put("/:membershipId/exit", MembershipController.exit);

router.get("/:membershipId/balance", MembershipController.userBalance);

router.post("/settleup", MembershipController.settleUp);
