import { cartDao } from "../dao/index.js";


export class CartService {

    static async createCart(){
        return await cartDao.createCart()
    }

    static async addProductToCart(idCart, idProduct){
        return await cartDao.addProductToCart(idCart, idProduct)
    }

    static async getCartById(idCart){
        return await cartDao.getCartById(idCart)
    }

    static async deleteCart (idCart) {
        return await cartDao.deleteCart(idCart)
    }

    static async deleteProductFromCart(idCart, idProduct){
        return await cartDao.deleteProductFromCart(idCart, idProduct)
    }

    static async deleteAllProducts(idCart){
        return await cartDao.deleteAllProducts(idCart)
    }

    static async updateProductQuantityInCart(idCart, idProduct, newquantity){
        return await cartDao.updateProductQuantityInCart(idCart, idProduct, newquantity)
    }

    static async updateCart(idCart, updateProductsCart){
        return await cartDao.updateCart(idCart, updateProductsCart)
    }

    static async clearCart (idcart){
        return await cartDao.clearCart(idcart);
    }
}