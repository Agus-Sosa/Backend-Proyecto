import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { authorizeRoles, checkLogin } from "../authentication/auth.js";

const router = Router()


router.get('/', ProductsController.getProductsPage)
router.get('/mockingproducts',authorizeRoles(["admin"]) , ProductsController.generateMockingProducts)
router.post('/createProduct',authorizeRoles(["admin", "premium"]) ,ProductsController.createNewProduct)
router.delete('/:pid', authorizeRoles(["admin", "premium"]), ProductsController.deleteProduct);


export {router as productRouter}