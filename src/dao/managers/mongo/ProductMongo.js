import Product from "../../models/productsModel.js";
class ProductMongo {
    constructor() {
    this.model = Product;
    }

    async getProducts () {
        try {
            const product = await this.model.find().lean();
            return product;
        } catch(error) {
            throw new Error(`Error al obtener todos los productos ${error}`)
        }
    }


    async addNewProducts (newProduct) {
        try {
            const productAdd = new this.model(newProduct)
            return await productAdd.save();
        } catch (error) {
            throw new Error(`Error al guardar el producto ${error.message}`)
        }
    }

    async deleteProduct(productId) {
        try {   
            return await this.model.findByIdAndDelete(productId)
        } catch (error) {
            throw new Error(`Error al eliminar el producto ${productId} ${error.message}`)
        }
    }


    async getProductById (productId){
        try {
            const products = await this.model.findById(productId)
            return products;
        } catch (error) {
            throw new Error("Error al obtener los productos por ID", error.message)
        }
    }


    async getProductPerPage (query, options) {
        try {
            const product = await this.model.paginate(query, options);
            return product;
        } catch (error) {
            throw error
        }
    }


    


}

export {ProductMongo as ProductMongo}