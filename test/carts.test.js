import mongoose from "mongoose";
import chai from "chai";
import { CartMongo } from "../src/dao/managers/mongo/CartMongo.js";
import { ProductMongo } from "../src/dao/managers/mongo/ProductMongo.js";
import {configTest} from '../test/config.test.js'
import Cart from "../src/dao/models/cartModel.js";
import Product from "../src/dao/models/productsModel.js";

const URL_DB_TEST = configTest.mongo.url
const expect = chai.expect;
const ObjectId = mongoose.Types.ObjectId;
const newIdMongo = new ObjectId();
describe("Pruebas para manager de cart", function(){
    
    before(async function(){
        this.timeout(5000); // Aumentar el tiempo de espera a 5000ms
        await mongoose.connect(URL_DB_TEST)
        console.log("base de datos de prueba conectado")
        this.cartManager = new CartMongo();
        this.productManager = new ProductMongo()
        // this.userMongo = new UsersMongo();
        
    })


    beforeEach(async function(){
        await Cart.deleteMany({});
        await Product.deleteMany({});
    })

    it("Este metodo debe agregar un producto al carrito", async function(){
        const mockCart = await Cart.create({ products: [] })
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

        
        const productCreated = await this.productManager.addNewProducts(mockProduct);
        const addproduct = await this.cartManager.addProductToCart(mockCart._id, productCreated._id);
        const addedProduct = addproduct.products.find((item) => item.product.toString() === productCreated._id.toString());

        expect(addedProduct).to.exist;
        console.log(addproduct)
    })
    
})