import { Router } from "express";
import { authorizeRoles } from "../authentication/auth.js";
import { usersController } from "../controllers/users.controller.js";

const router = Router();


router.get('/', usersController.getUsers)
router.post("/premium/:uid", authorizeRoles(['admin']),usersController.modifyRole);

export {router as usersRouter}