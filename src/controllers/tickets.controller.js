import { TicketsService } from "../Services/tickets.service.js"; 
import { CartService } from "../Services/carts.service.js";
import { ProductService } from "../Services/product.service.js";
import { UserService } from "../Services/users.service.js";


export class ticketController {
    static async createTicket(req, res){
        try {
            const cartId = req.params.cid;
            const cart= await CartService.getCartById(cartId);
            const productsInCart = cart.products;

            const productsProcessed = [];
            const productsOutOfStock = [];


            for(const productInCart of productsInCart) {
                const productId = productInCart.product;
                const quantity = productInCart.quantity;
                console.log('prodID',productId)
                console.log('quantity', quantity)
                const product = await ProductService.getProductId(productId);

                if(!product){
                    return res.status(404).json({error: `El producto con ID ${productId} no existe`})
                }
                console.log('product',product)
                if(product.stock > 0 && product.stock >= quantity){
                    productsProcessed.push(productId);
                    product.stock -= quantity;
                    await product.save();
                } else {
                    productsOutOfStock.push(productId);
                }
            }

            console.log('processed',productsProcessed)
            console.log('outofstock', productsOutOfStock)

            const amount = productsProcessed.reduce((total, products) => total + (productsProcessed.quantity * products.price), 0);



            for(const productId of productsProcessed){
                console.log(productId)
                await CartService.deleteProductFromCart(cartId, productId._id || productId);
            }

            for(const productId of productsOutOfStock){
                await CartService.addProductToCart(cartId, productId._id);
            }

            

            const purchaser = req.user ? req.user.email : 'Usuario no autenticado';
            console.log(amount)


            const newTicket = {
                amount:amount,
                purchaser: 'agus',
            };

            const ticket =  await TicketsService.createTicket(newTicket);

            return res.status(200).json({message:'Compra finalizada correctamente.',ticket: ticket._id});
        } catch (error) {
            console.log(error)
            res.status(404).json({error: `Error al finalizar la compra: ${error.message}`});
        }

    }
    
    
}


