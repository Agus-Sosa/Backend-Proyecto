import { Router } from "express";
import { authorizeRoles, requireLogin } from "../authentication/auth.js";
import { usersController } from "../controllers/users.controller.js";
import { updloaderDocuments } from "../utils.js";

const router = Router();


router.get('/',requireLogin, authorizeRoles(['admin']),usersController.getUsers)
router.post("/premium/:uid", requireLogin,authorizeRoles(['admin']),usersController.modifyRole);
router.put('/:uid/documents', requireLogin,updloaderDocuments.fields([
    {name: "identificacion", maxCount:1},
    {name: "domicilio", maxCount: 1},
    {name: "estadoDeCuenta", maxCount:1},
]), usersController.uploadDocuments)
router.delete('/deleteInactiveUsers', requireLogin, authorizeRoles(['admin']), usersController.deleteUsersIncative )
router.delete('/deletUser/:uid', requireLogin, authorizeRoles(["admin"]), usersController.deleteUser)


export {router as usersRouter}