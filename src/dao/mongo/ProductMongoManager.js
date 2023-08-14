import Product from "./models/productsModel.js";

class ProductMongoManager {
    constructor() {
    
    }

    async getAllProducts () {
        try {
            const product = await Product.find().lean();
            return product;
        } catch(error) {
            throw new Error(`Error al obtener todos los productos ${error}`)
        }
    }


    async addNewProducts (newProduct) {
        try {
            const productAdd = new Product(newProduct)
            return await productAdd.save();
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }

    async deleteProduct(productId) {
        try {   
            return await Product.findByIdAndDelete(productId)
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${productId} ${error.message}`)
        }
    }


    async getProductById (productId){
        try {
            const products = await Product.findById(productId)
            return products;
        } catch (error) {
            throw new Error("Error al obtener los productos por ID", error.message)
        }
    }


    async getProductPerPage (query, options) {
        try {
            const product = await Product.paginate(query, options);
            return product;
        } catch (error) {
            throw error
        }
    }



}

export {ProductMongoManager as ProductMongoManager}