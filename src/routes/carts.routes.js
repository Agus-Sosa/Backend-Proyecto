import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";



const router = Router()

// Mongo
// const cartMongo = new CartMongoManager()




// Metodos con Fs

//Post: Metodo para agregar un producto al carrito
// router.post('/:cid/product/:pid', async (req, res)=> {
//     const cartId = parseInt(req.params.cid)
//     const productId = parseInt(req.params.pid)

//     try {

//         const existingCart = await cartManager.getCartById(cartId)
//         if(!existingCart) {
//             res.status(404).json({error: `El carrito ${cartId} no existe`})
//             return;
//         }

//         const existingProduct = await productManager.getProductoById(productId)
//         if(!existingProduct){
//             res.status(404).json({error: `El producto ${productId} no existe`})
//             return;
//         }


//         cartManager.addProductToCart(cartId, productId)

//         const ProductInCart = await cartManager.getCartById(cartId) 
//         res.status(200).json({message: 'Producto agregado correctamente', ProductInCart })

//     } catch (error) {
//         console.error('Error al agregar los productos al carrito')
//         res.status(500).json({error: 'Error del servidor al agregar el producto'})
//     }
// })


// // Post: Crear un nuevo carrito
// router.post('/', async(req, res)=> {
//     try {
//         const newCart =  cartManager.createCart()
//         res.status(200).json({message: 'Carrito creado correctamente', newCart})
//     } catch (error) {
//         res.status(500).json({error: 'Error al crear el carrito'})
//     }
// })

// // Get: Obtener carrito por id

//     router.get('/:cid', async(req, res)=> {
//         try {
//             const cid = parseInt(req.params.cid)
//             const getCartId = await cartManager.getCartById(cid)
//             res.status(200).json({message: `Producto encontrado con id ${cid}`, cart: [getCartId]})

//         } catch (error) {
//             if(error instanceof Error){
//                 res.status(404).json({error: error.message})
//             } else {
//             res.status(500).json({error: 'Error al obtener el carrito'})
//             }
//         }
//     })

// // Delete:Eliminar carrito por id

// router.delete('/:cid', async(req, res)=> {
//     try {
//         const cid = parseInt(req.params.cid)
//         cartManager.deleteCart(cid)
//         res.status(200).json({message:  `El carrito ${cid} fue eliminado correctamente`})

//     } catch (error) {
//         if(error instanceof Error){
//             res.status(404).json({error: error.message})
//         } else {
//         res.status(500).json({error: 'Error al eliminar el carrito'})
//         }
//     }



    

// })




// Metodos con Mongo


router.get('/:cid', CartController.getCartId)
router.post('/', CartController.createCart)
router.post('/:cid/products/:pid/', CartController.addProductToCart)
router.delete('/:cid/products/:pid', CartController.removeProductFromCart)
router.delete('/:cid', CartController.removeAllProductoCart)
router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart)
router.put('/:cid', CartController.updateCart)


export {router as cartRouter};