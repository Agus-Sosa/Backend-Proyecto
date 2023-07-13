import { Router  } from "express";
import ProductManager from "../models/ProductManager.js";

const product = new ProductManager()




const router = Router()

router.get('/home', (req,res)=> {
    const productList = product.getProducts()
    res.render('home', { productList, style: "home.css" })
    
})


router.get('/realTimeProducts', (req, res)=> {
    const productList = product.getProducts()
    res.render('realTimeProducts', {productList, style: 'realTime.css'})
})


export {router as viewRouter}