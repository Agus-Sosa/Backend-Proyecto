import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router()


router.get('/', ProductsController.getProductsPage)



export {router as productRouter}