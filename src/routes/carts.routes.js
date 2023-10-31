import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { ticketController } from "../controllers/tickets.controller.js";
import { authorizeRoles } from "../authentication/auth.js";

const router = Router()

router.get('/:cid', CartController.getCartId)
router.post('/', CartController.createCart)
router.post('/:cid/products/:pid/', authorizeRoles(["user", "premium"]),CartController.addProductToCart)
router.delete('/:cid/products/:pid', CartController.removeProductFromCart)
router.delete('/:cid', CartController.removeAllProductoCart)
router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart)
router.put('/:cid', CartController.updateCart)
router.post('/:cid/purchase',ticketController.createTicket)


export {router as cartRouter};