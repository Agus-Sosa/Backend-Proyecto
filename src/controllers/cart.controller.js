import { CartService } from "../Services/carts.service.js";
import { CustomError } from "../Services/error/CustomError.service.js";
import { addToCartErrorMsg } from "../Services/error/addToCartError.service.js";
import { ProductService } from "../Services/product.service.js";
import { EError } from "../enums/EError.js";
import { logger } from "../helpers/logger.js";
export class CartController {

    // Metodo para obtener el carrito
    static async getCartId (req, res){
        try {
            const cid = req.params.cid
            const getCartId = await CartService.getCartById(cid)
    
            if(!getCartId){
                res.status(404).json({error: 'Carrito no encontrado'})
            }
    
            res.status(200).json({
                status: 'Success',
                getCartId
            })
        
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({error: error.message})
            } else{
                res.status(500).json({error: 'Error al buscar el carrito'})
            }
        }
    }

    // Metodo para crear carrito
    static async createCart (req, res){
        try {
            const newCart =  await CartService.createCart();
            res.status(201).json({
                status: 'Success',
                message: 'Carrito creado correctamente'
            })
    
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: 'Error al crear el carrito'})
    
            }
        }
    }


    static async addProductToCart(req, res){
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const product = await ProductService.getProductId(pid);
            const user = req.user;
            if (user.role === 'premium' && product.owner.toString() === user._id.toString()) {
                const customError = CustomError.createError({
                    name: 'AddToCartError',
                    cause: 'No se permite agregar el producto al carrito',
                    message: "Los usuarios premium no pueden agregar sus propios productos",
                    errorCode: EError.CART_ERROR
                })
                return res.status(403).json({
                    status: "Error",
                    error: customError
                });
            }
    
            
            const updateCart = await CartService.addProductToCart(cid, pid)
    
            logger.info(`Producto agregado correctamented`, {cart:updateCart})


            res.status(200).json({
                status: 'Success',
                message: 'Producto agregado al carrito correctamente',
                cart: updateCart
            })
    
        } catch (error) {
            const customError = CustomError.createError({
                name: 'AddToCartError',
                cause: addToCartErrorMsg(),
                message: 'No se pudo agregar el producto al carrito',
                errorCode: EError.CART_ERROR
            });
            res.status(404).json({
                status: 'error',
                error: customError
            })
        }
    }

       

    static async removeProductFromCart(req, res){
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
    
            await CartService.deleteProductFromCart(cid, pid)
            res.status(200).json({status: 'Succes', message: 'Producto eliminado correctamente'})
    
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: 'Error al eliminar el producto seleccionado'})
            }
        }
    }

    static async removeAllProductoCart (req, res){
        try {
            const cid = req.params.cid;
            await CartService.deleteAllProducts(cid)
            res.status(200).json({status: 'Succes', message: 'Se eliminaron todos los productos con exito'})
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: 'Error al eliminar los productos del carrito'})
            }
        }
    }

    static async updateProductQuantityInCart (req, res){
        try {
            const cid = req.params.cid
            const pid = req.params.pid
            const quantity = parseInt(req.body.quantity);  
            const updateProductCart = await CartService.updateProductQuantityInCart(cid, pid, quantity)
            res.status(200).json({message: `Producto ${pid} actualizado correctamente`, updateProductCart})
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).json({error: error.message})
    
            } else {
                res.status(500).json({error: 'Error al actualizar la cantidad del producto'})
            }
        }
    
    }

    static async updateCart (req, res){
        try {
            const cid = req.params.cid;
            const updateProducts = req.body;
    
            const updateCart = await CartService.updateCart(cid, updateProducts);
            res.status(200).json({message: `Carrito ${cid} se actualizo correctament`, updateCart});
    
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json({error: 'Error al actualizar el carrito'});
            }
        }
    }


    static async purchaseCart (req, res){
        try {
            
        } catch (error) {
            if(error instanceof Error){
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: 'Error al hacer la compra'})
            }
        }
    }


}