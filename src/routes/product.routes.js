import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router()


router.get('/', ProductsController.getProductsPage)
router.get('/mockingproducts',ProductsController.generateMockingProducts)


export {router as productRouter}