import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const router = Router()

router.get('/:cid', CartController.getCartId)
router.post('/', CartController.createCart)
router.post('/:cid/products/:pid/', CartController.addProductToCart)
router.delete('/:cid/products/:pid', CartController.removeProductFromCart)
router.delete('/:cid', CartController.removeAllProductoCart)
router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart)
router.put('/:cid', CartController.updateCart)


export {router as cartRouter};