import { Router  } from "express";
import { requireLogin, checkLogin, isUserAuth,isAdminAuth } from "../authentication/auth.js";
import { ViewController } from "../controllers/views.controller.js";


const router = Router()


// Vista con fs

// router.get('/home', (req,res)=> {
//     res.render('home', { productList, style: "home.css" })
    
// })

// router.get('/realTimeProducts', (req, res)=> {
//     res.render('realTimeProducts', {productList, style: 'realTime.css'})
// })




// Routers con la arquitectura de capas

router.get('/register',checkLogin, ViewController.renderRegister)
router.get('/login', checkLogin, ViewController.renderLogin)
router.get('/home', ViewController.renderHome)
router.get('/realTimeProducts',isAdminAuth, ViewController.renderRealTime)
router.get('/products', requireLogin, isUserAuth,ViewController.renderProducts)
router.get('/product/:productId', isUserAuth,ViewController.renderProductsDetails)
router.get('/carts', ViewController.renderCartId)
router.get('/current', ViewController.renderCurrent)
router.get('/chat', isUserAuth,ViewController.renderChat)

export {router as viewRouter}