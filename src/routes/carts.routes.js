import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { ticketController } from "../controllers/tickets.controller.js";
import { authorizeRoles } from "../authentication/auth.js";

const router = Router()

router.get('/:cid', /* authorizeRoles(["admin"]) */CartController.getCartId)
router.post('/:cid/products/:pid/', /* authorizeRoles(["user", "premium"]), */CartController.addProductToCart)
router.delete('/:cid/products/:pid', /* authorizeRoles(["user", "premium"]), */CartController.removeProductFromCart)
router.delete('/:cid', /* authorizeRoles(["premium", "user"]), */CartController.removeAllProductoCart)
router.put('/:cid/products/:pid', /* authorizeRoles(["premium", "user"]), */CartController.updateProductQuantityInCart)
router.put('/:cid', /* authorizeRoles(["premium", "user"]), */CartController.updateCart)
router.post('/:cid/purchase',/* authorizeRoles(["premium", "user"]), */ticketController.createTicket)


export {router as cartRouter};