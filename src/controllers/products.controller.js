import { faker } from "@faker-js/faker";
import { ProductService } from "../Services/product.service.js";



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
            res.status(200).json({status:'Succes', products: mockProducts})


        } catch (error) {
            res.status(501).send('Error al crear los productos')
        }
    } 



    
}