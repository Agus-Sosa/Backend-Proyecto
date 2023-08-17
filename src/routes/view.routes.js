import { Router  } from "express";
import ProductManager from "../dao/fileSystem/controllers/controllers/ProductManager.js";
import { ProductMongoManager } from "../dao/mongo/ProductMongoManager.js";
import { CartMongoManager } from "../dao/mongo/CartMongoManager.js";
import { requireLogin, checkLogin } from "../authentication/auth.js";
// Manager fs
const product = new ProductManager()
const productList = product.getProducts();

// Manager mongo
const productMongo = new ProductMongoManager();
const cartMongo = new CartMongoManager()
const router = Router()




// Vista con fs





// router.get('/home', (req,res)=> {
//     res.render('home', { productList, style: "home.css" })
    
// })

// router.get('/realTimeProducts', (req, res)=> {
//     res.render('realTimeProducts', {productList, style: 'realTime.css'})
// })



// Vistas con mongo


/* Vista con MongoDb */

// Vista de chat en tiempo real
router.get('/chat', (req, res)=> {
    res.render('chat',{style: 'chat.css'})
})


// Vista para registrarse

router.get('/register',checkLogin ,async (req, res)=> {
    try {
        res.render('register', {style: 'register.css'})
    } catch (error) {
        res.status(404).render('register', {error: error.menssage, style: 'register.css'})
    }
})


router.get('/login', checkLogin,async(req,res)=> {
    try {
        res.render('login', {style: 'login.css'})
    } catch (error) {
        res.status(404).render('login', {error: error.message, style: 'login.css'})
    }
})

// Pagina principal 
router.get('/home', async(req, res)=> {
    try {
        const productsMongo = await productMongo.getAllProducts();
        res.render('home', {productsMongo, style: 'home.css'})
    } catch (error) {
        res.status(500).send('Error al obtener todos los productos')
    }
})

    router.get('/realTimeProducts', async(req, res)=> {
        try {
            const productsMongo = await productMongo.getAllProducts()
            res.render('realTimeProducts', {productsMongo, style: 'realTime.css'})
        } catch (error) {
            res.status().send('Error al obtener los datos')
        }
    })

    // Vista de los productos con paginacion
    router.get('/products', requireLogin,async(req,res)=> {
        try {
            const user = req.session.user;
            if(!user) {
                res.render('products', {error: 'Debes iniciar sesion', style: 'products.css'})
            }
            const {limit=5, page=1, stock, sort="asc"} =req.query;
            // console.log(limit, sort, page, stock);
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if(!["asc", "desc"].includes(sort)) {
                return res.render("products", {error: 'Orden no valida'})
            }
            const sortValue = sort === 'asc' ? 1 : -1;
            let query = {};
            if(stockValue) {
                query = {stock: {$gte: stockValue}}
            } 

            const result = await productMongo.getProductPerPage(query,{
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
                nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null
            }


            res.render('products', {resultProductsViews, user: user ,style: 'products.css', })
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).send(error.message)
            } else {
                res.status(500).send('Error del servidor al mostrar los productos')
            }
        }
    })

    // Vista del producto seleccionado detalladamente
    router.get('/product/:productId', async(req, res)=> {
        try {
            const productId = req.params.productId
            const product = await productMongo.getProductById(productId)

            const productDetails = {
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnails: product.thumbnails,
                stock: product.stock,
                category: product.category
            }
            res.render('productDetails', {productDetails, style: 'productDetails.css'})
        } catch (error) {
            res.status(404).send(error.message)
        }
    })


// Pagina para entrar en el apartado del cart
router.get('/carts', async(req, res)=> {
    try {
        res.send('Coloca un id del carrito por parametro')
    } catch (error) {
        res.status(500).send('Error al ingresar a la pagina')
    }
})


// Pagina para ver el carrito pasado por id y ver los productos
router.get('/carts/:cid', async(req,res)=> {
    try {
        const cid = req.params.cid;
        const cart = await cartMongo.getCartById(cid)
        const productInCart = cart.products

        res.render('carts', {productInCart, style: 'cartsProducts.css'})
    } catch (error) {
        res.status(500).send('Error al obtener el carrito', error.message)
    }
})




export {router as viewRouter}