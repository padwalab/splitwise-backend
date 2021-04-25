import express from "express";
import { UserController } from "../controllers/userController";

var router = express.Router();
export default router;
/* GET users listing. */
router.get("/", UserController.register);

router.post("/signin", UserController.signin);

router.post("/login", UserController.login);

router.put("/:groupId/invite", UserController.invite);

router.put("/:groupId/accept", UserController.accept);

router.put("/:userEmail/update", UserController.update);

router.get("/:userId/groups", UserController.groups);

router.get("/:userEmail/details", UserController.getUserDetails);

router.get("/:userEmail/getId", UserController.getUserIdFromEmail);

router.get("/list", UserController.list);

router.get("/:userId/invites", UserController.getInvites);
