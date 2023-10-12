import Cart from "../../models/cartModel.js";
import Product from "../../models/productsModel.js";


class CartMongo {

    constructor (){
        this.modelCart = Cart;
        this.modelProduct = Product
    }

    async createCart () {
        try {
            const newCart = new this.modelCart({products: []})
            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error.message}`)
        }
    }

    async addProductToCart (idCart, idProduct) {
        try {

            const cart = await this.modelCart.findById(idCart)
            if(!cart) throw new Error(`Carrito ${idCart} no encontrado`)

            const product = await this.modelProduct.findById(idProduct)
            if(!product) throw new Error(`Producto ${idProduct} no encontrado `)

            const existignProductIndex = cart.products.findIndex(item=> item.product.equals(idProduct))
            if(existignProductIndex !== -1){
                cart.products[existignProductIndex].quantity +=1;
            } else {
                cart.products.push({product: idProduct, quantity: 1})
            }

            await cart.save();

            const cartId = cart.toObject()
            delete cartId._id;
            
            return cart
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }

    async getCartById (idCart){

        try {
            const cart = await this.modelCart.findById(idCart)

            if(cart){
            const mongoProduct = cart.products = cart.products.map(item=> ({
                    product: {
                        _id: item.product._id,
                        title: item.product.title,
                        description: item.product.description,
                        price: item.product.price,
                        thumbnails: item.product.thumbnails,
                        code: item.product.code,
                        stock: item.product.stock,
                        status: item.product.status,
                        category: item.product.category,
                    },
                    quantity: item.quantity,
                }))
                return {
                    _id: cart._id,
                    products: mongoProduct,
                }
            }


            return null

        } catch (error) {
            throw new Error(`Errro al obtener el carrito ${idCart} ${error.message}`)
        }
    }


    

    async deleteCart (idCart) {

        try {
            const cartDelete = await this.modelCart.findByIdAndDelete(idCart)
            return cartDelete;
        } catch (error) {
            throw new Error(`No se puede eliminar el carrito ${error.message}`)
        }
    }



    async deleteProductFromCart (cid, pid) {

        try {

            const cart = await this.modelCart.findById(cid)
            if(!cart) {
                throw new Error(`Carrito ${cart} no encontrado`)
            }

            const productIndex =  cart.products.findIndex(item => item.product.equals(pid));



            if(productIndex === -1){
                throw new Error(`Producto ${pid} no encontrado en el carrito`)
            }
            
            cart.products.splice(productIndex, 1)
            await cart.save()
            return cart;

        } catch (error) {
            throw new Error(`Error al eliminar el producto ${error.message}`)
        }
    }


    async deleteAllProducts (cid) {
        try {
            const cart = await this.modelCart.findById(cid)
            if(!cart) {
                throw new Error(`El carrito ${cid} no existe`)
            }
            cart.products = [];

            await cart.save();
            return cart

        } catch (error) {
            throw new Error(`Error al eliminar los productos ${error.message}`)
        }
    }


    async updateProductQuantityInCart(cartId, productId, newQuantity) {
        try {
            const cart = await this.modelCart.findById(cartId);
            if (!cart) {
                throw new Error(`El carrito ${cartId} no existe`);
            }
            
            const productIndex = cart.products.findIndex(item => item.product.equals(productId));
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;
                await cart.save();
                return cart;
            } else {
                throw new Error(`El producto ${productId} no existe`);
            }    
        } catch (error) {         
            throw new Error(`Error al actualizar la cantidad del producto ${error.message}`);
        }
    }
    
    async updateCart(cartid, updateProductsCart){
        try {

            const cart = await this.modelCart.findById(cartid);
            if(!cart) {
                throw new Error(`El carrito ${cartid} no existe`);
            }

            cart.products = updateProductsCart;
            await cart.save();
            return cart

        } catch (error) {
            throw new Error(`Error al actualizar el carrito ${error.message}`);
        }
    }


    async clearCart (cartId) {
        try {
            const cart = await this.modelCart.findById(cartId);
            if(!cart){
                throw new Error(`El carrito con id ${cartId} no existe`);
            }

            cart.products = [];


            await cart.save();
            
            return true;
        } catch (error) {
            throw error;
        }
    }

}

export {CartMongo as CartMongo }