import { faker } from "@faker-js/faker";
import { ProductService } from "../Services/product.service.js";
import { CustomError } from "../Services/error/CustomError.service.js";
import { EError } from "../enums/EError.js";



export class ProductsController {


    static async getProductsPage(req,res){
        try {
            const {limit = 2, page = 1, stock, sort="asc"} =req.query;
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
                nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null
            }

            res.status(200).json(resultProductsViews)
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).send(error.message)
            } else {
                res.status(500).send('Error del servidor al mostrar los productos')
            }
        }
    }
    

    static async generateMockingProducts(req,res){
        try {

            const mockProducts = [];

            for(let i = 0; i < 100; i++){
                const product ={
                        _id: faker.database.mongodbObjectId(),
                        title: faker.commerce.productName(),
                        description: faker.lorem.sentence(),
                        price: parseFloat(faker.commerce.price()),
                        thumbnails: faker.image.dataUri,
                        code: faker.string.alphanumeric(4),
                        stock:Math.floor(Math.random() *100) + 1,
                        status: faker.datatype.boolean,
                        category: faker.commerce.department,
                }
                
                mockProducts.push(product);
            }
            res.status(200).json({status:'Success', products: mockProducts})


        } catch (error) {
            res.status(501).send('Error al crear los productos')
        }
    } 


    static async createNewProduct (req, res){
        try {
            const data = req.body;
            data.owner = req.user._id;
            if(req.file){
                data.thumbnails = req.file.filename;
            }
            // data.thumbnails = req.file.filename;
            const product = await ProductService.createProduct(data);
            res.status(200).json({status: 'Success', product: product})
        } catch (error) {
            res.status(501).json({status: 'error', message: "Error al crear el producto"})
        }
    }


    static async deleteProduct (req, res) {
        try {
            const idProduct = req.params.pid;
            const product = await ProductService.getProductId(idProduct)
            const user = req.user;
            if(user.role === "premium" && product.owner.toString()=== user._id.toString() || user.role === "admin"){
                await ProductService.deletingProduct(idProduct)
                res.status(200).json({status:'Success', message:`Producto ${idProduct} eliminado correctamente` })
            } else {
                const customError = CustomError.createError({
                    name: 'UnauthorizedError',
                    cause: 'Usuario no autorizado',
                    message: 'Usuario no autorizado para eliminar el producto',
                    errorCode:EError.UNAUTHORIZED
                })
                throw customError
            }
        } catch (error) {
            res.json({status:'error', message: error.message})
        }
    }

    
}