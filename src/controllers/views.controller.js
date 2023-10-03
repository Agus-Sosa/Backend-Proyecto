import { CartService } from "../Services/carts.service.js";
import { ProductService } from "../Services/product.service.js";

export class ViewController {


    static  renderRegister (req,res) {
        try {
            res.render('register', {style: 'register.css'})
        } catch (error) {
            res.status(404).render('register', {error: error.menssage, style: 'register.css'})
        }
    }

    static renderLogin (req, res) {
        try {
            res.render('login', {style: 'login.css'})
        } catch (error) {
            res.status(404).render('login', {error: error.message, style: 'login.css'})
        }
    }

    static async renderHome (req, res){
        try {
            const productsMongo = await ProductService.getProducts();
            res.render('home', {productsMongo, style: 'home.css'})
        } catch (error) {
            res.status(500).send('Error al obtener todos los productos')
        }
    }


    static async renderRealTime (req, res){
        try {
            const productsMongo = await ProductService.getProducts()
            res.render('realTimeProducts', {productsMongo, style: 'realTime.css'})
        } catch (error) {
            res.status(404).send('Error al obtener los datos')
        }
    }

    static async renderProducts (req, res){
        try {
            const user = req.user;
            const userCartId = req.user.cart

            // const emailUser = user.email
            const {limit=5, page=1, stock, sort="asc"} =req.query;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if(!["asc", "desc"].includes(sort)) {
                return res.render("products", {error: 'Orden no valida'})
            }
            const sortValue = sort === 'asc' ? 1 : -1;
            let query = {};
            if(stockValue) {
                query = {stock: {$gte: stockValue}}
            } 

            const result = await ProductService.getProductPage(query,{
                page,
                limit,
                sort:{price: sortValue},
                lean:true
            });
            // Http
            const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
            
            const resultProductsViews = {
                status: 'Success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNexPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
                nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null,
                
            }

            
            res.render('products', {resultProductsViews,userCartId,user: user.email ,style: 'products.css', })

        } catch (error) {
            if(error instanceof Error) {
                console.log(error)
                res.status(404).send(error.message)
            } else {
                res.status(500).send('Error del servidor al mostrar los productos')
            }
        }
    }

    static async renderProductsDetails (req, res){
        try {
            const productId = req.params.productId
            const userCartId = req.user.cart
            
            const product = await ProductService.getProductId(productId)

            const productDetails = {
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnails: product.thumbnails,
                stock: product.stock,
                category: product.category
            }
            res.render('productDetails', {productDetails,userCartId, style: 'productDetails.css'})
        } catch (error) {
            res.status(404).send(error.message)
        }
    }


    static async renderCartId(req, res){
        try {
            const cartId = req.user.cart;
            const cart = await CartService.getCartById(cartId);
            const productInCart = cart.products;
    
            res.render('carts', {productInCart, style: 'cartsProducts.css'})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static renderCurrent (req, res) {
        if(req.isAuthenticated()){
            const user =req.user;
            res.render('current', {user, style:'current.css'})
        } else {
            res.redirect('/login')
        }
    }

    static renderChat (req, res){
        res.render('chat',{style: 'chat.css'})
    }
}