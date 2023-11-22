import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { ticketController } from "../controllers/tickets.controller.js";
import { authorizeRoles, requireLogin } from "../authentication/auth.js";

const router = Router()

router.get('/:cid', requireLogin, authorizeRoles(["admin"]),CartController.getCartId)
router.post('/:cid/products/:pid/', requireLogin, authorizeRoles(["user", "premium"]),CartController.addProductToCart)
router.delete('/:cid/products/:pid', requireLogin, authorizeRoles(["user", "premium"]),CartController.removeProductFromCart)
router.delete('/:cid', requireLogin, authorizeRoles(["premium", "user"]),CartController.removeAllProductoCart)
router.put('/:cid/products/:pid', requireLogin, authorizeRoles(["premium", "user"]),CartController.updateProductQuantityInCart)
router.put('/:cid', requireLogin, authorizeRoles(["premium", "user"]),CartController.updateCart)
router.post('/:cid/purchase',requireLogin, authorizeRoles(["premium", "user"]),ticketController.createTicket)


export {router as cartRouter};