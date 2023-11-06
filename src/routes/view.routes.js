import { Router  } from "express";
import { requireLogin, checkLogin,  authorizeRoles } from "../authentication/auth.js";
import { ViewController } from "../controllers/views.controller.js";


const router = Router()


// Routers con la arquitectura de capas

router.get('/register',checkLogin, ViewController.renderRegister)

router.get('/login', checkLogin, ViewController.renderLogin)

router.get('/home', ViewController.renderHome)

router.get('/realTimeProducts',authorizeRoles(['admin', 'premium']), ViewController.renderRealTime)

router.get('/products', requireLogin, authorizeRoles(['user', "premium", "admin"])/* isUserAuth */,ViewController.renderProducts)

router.get('/product/:productId', requireLogin,authorizeRoles(['user',"premium", "admin"])/* isUserAuth */,ViewController.renderProductsDetails)

router.get('/carts',requireLogin,authorizeRoles(["user", "premium"]),ViewController.renderCartId)

router.get('/current', ViewController.renderCurrent)

router.get('/chat',authorizeRoles(['user', "premium"]) /* isUserAuth */,ViewController.renderChat)


router.get('/forgot-password', ViewController.renderForgotPassword)
router.get('/reset-password', ViewController.renderResetPassword)


export {router as viewRouter}