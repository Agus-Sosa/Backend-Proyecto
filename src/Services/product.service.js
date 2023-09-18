// import { productDao } from "../dao/index.js";
import { productDao } from "../dao/index.js";


export class ProductService {

    
    static async getProducts(){
        return await productDao.getAllProducts();
    }

    
    static async createProduct(productInfo) {
        return await productDao.addNewProducts(productInfo);
    }


    static async deletingProduct(productId) {
        return await productDao.deleteProduct(productId)
    }

    static async getProductId (productId){
        return await productDao.getProductById(productId)
    }


    static async getProductPage (query, options){
        return await productDao.getProductPerPage(query, options)
    }
    
}