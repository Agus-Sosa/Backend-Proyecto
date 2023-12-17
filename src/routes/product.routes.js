import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import { authorizeRoles, checkLogin, requireLogin } from "../authentication/auth.js";
import { updloaderProducts } from "../utils.js";
const router = Router()


router.get('/', ProductsController.getProductsPage)
router.get('/mockingproducts',requireLogin,authorizeRoles(["admin"]),  ProductsController.generateMockingProducts)
router.post('/createProduct', requireLogin,authorizeRoles(["admin", "premium"]), updloaderProducts.single("thumbnails"),ProductsController.createNewProduct)
router.delete('/:pid', requireLogin,authorizeRoles(["admin", "premium"]), ProductsController.deleteProduct);


export {router as productRouter}