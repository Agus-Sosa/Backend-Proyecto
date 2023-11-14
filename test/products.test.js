import mongoose from 'mongoose';
import chai from 'chai';
import { ProductMongo } from '../src/dao/managers/mongo/ProductMongo.js';
import { config } from './config.test.js';
import Product from '../src/dao/models/productsModel.js';


const expect = chai.expect;
const ObjectId = mongoose.Types.ObjectId;
const newIdMongo = new ObjectId()
const URL_DB_TEST = config.mongo.url

describe("Pruebas para manager de productos ",function(){
    
    before(async function(){
        this.timeout(5000); // Aumentar el tiempo de espera a 5000ms
        await mongoose.connect(URL_DB_TEST)
        console.log("base de datos de prueba conectado")
        this.productManager = new ProductMongo()
    });

    beforeEach(async function(){
        await Product.deleteMany({})
    })
    
    
    it("Este metodo addNewProduct debe guardar un producto en el base de datos", async function(){
        const mockProduct = {
            title: "Producto de Ejemplo",
            description: "Este es un producto de muestra.",
            price: 19.99, // Precio ficticio
            thumbnails: "https://ejemplo.com/imagen.jpg", // URL de una imagen ficticia
            code: "ABC123", // Código ficticio
            stock: 50, // Stock ficticio
            status: true, // Estado ficticio
            category: "gamer", // Categoría ficticia
            owner: newIdMongo,
        };
        const response = await this.productManager.addNewProducts(mockProduct);
        expect(response._id).to.exist
        console.log('New Product ', mockProduct)


    })

    it("Este metodo get debe retornar todos los productos", async function(){
        const response = await this.productManager.getProducts();
        expect(response).to.be.an('array')
        console.log("get Products ", response);
    });

    it("Este metodo debe bucar un producto a traves de su id", async function(){

            const mockProduct = {
                title: "Nuevo Producto de Ejemplo",
                description: "Este es otro producto de muestra.",
                price: 29.99, // Precio ficticio
                thumbnails: "https://nueva-imagen.com/imagen.jpg", // URL de una imagen ficticia
                code: "7712", // Código ficticio
                stock: 75, // Stock ficticio
                status: true, // Estado ficticio
                category: "oficina", // Categoría ficticia
                owner: newIdMongo, // Mantenido el mismo owner
            };

            
            const response = await this.productManager.addNewProducts(mockProduct);
            const productId = response._id;
            const reponseById = await this.productManager.getProductById(productId);
            expect(reponseById).to.be.exist
        })


    it("Este metodo debe eliminar el producto", async function(){
        const mockProduct = {
            title: "Nuevo Producto de Ejemplo",
            description: "Este es otro producto de muestra.",
            price: 29.99, // Precio ficticio
            thumbnails: "https://nueva-imagen.com/imagen.jpg", // URL de una imagen ficticia
            code: "XYZ789", // Código ficticio
            stock: 75, // Stock ficticio
            status: true, // Estado ficticio
            category: "oficina", // Categoría ficticia
            owner: newIdMongo, // Mantenido el mismo owner
        };

        const response = await this.productManager.addNewProducts(mockProduct);
        const productId = response._id;
        await this.productManager.deleteProduct(productId);
        
        const deletedProduct = await this.productManager.getProductById(productId);
        
        expect(deletedProduct).to.be.null
        
        console.log('Deleted Producto ',deletedProduct)

        
    })
    
})

