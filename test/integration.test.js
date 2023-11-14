import {app} from '../src/app.js'
import supertest from 'supertest'
import chai from 'chai'
import mongoose from 'mongoose';
import { configTest } from './config.test.js';
import { response } from 'express';



const URL_DB_TEST = configTest.mongo.url
const ObjectId = mongoose.Types.ObjectId;
const newIdMongo = new ObjectId();
const expect = chai.expect;
const requester = supertest(app); /* Elemento para hacer peticiones al servidor */

describe("Pruebas app proyecto backend", async function(){

    this.timeout(10000)

    const mockUser = {
        email: "julian@gmail.com",
        password: "333"
    }

    before(async function(){
        // await mongoose.connect(URL_DB_TEST)
        // console.log("base de datos de prueba conectado")
        
        
    })

    describe("test de rutas de productos", async function(){
        it("/GET /", async function () {
            const response = await requester.get('/api/products/');
            expect(response.status).to.equal(200);
        });

        it("/GET /mockingproducts", async function(){
            const response = await requester.get('/api/products/mockingproducts')
            expect(response.body.status.toLowerCase()).to.equal('success');
            expect(response.status).to.equal(200);
        })

        it("/POST /createProduct", async function(){
            // Registro de usuario
            const registerResponse = await requester.post('/api/sessions/register').send(mockUser);
            expect(registerResponse.status).to.equal(200);
            expect(registerResponse.body.status).to.equal('success');

            // Inicio de sesión
            const loginResponse = await requester.post('/api/sessions/login').send({
                email: mockUser.email,
                password: mockUser.password,
            });
            expect(loginResponse.status).to.equal(200);
            expect(loginResponse.body.status).to.equal('success');

            // Obtener el ID del usuario desde la sesión
            const userId = loginResponse.body.user._id;

            // Crear un nuevo producto con el ID del usuario
            const mockProduct = {
                title: 'Producto de Ejemplo',
                description: 'Este es un producto de muestra.',
                price: 19.99,
                thumbnails: 'https://ejemplo.com/imagen.jpg',
                code: 'ABC123',
                stock: 50,
                status: true,
                category: 'gamer',
            };

            const createProductResponse = await requester
                .post('/api/products/createProduct')
                .set('Cookie', loginResponse.headers['set-cookie'])
                .send(mockProduct);
            expect(createProductResponse.status).to.equal(200);
            expect(createProductResponse.body.payload).to.exist; // Ajusta esto según la estructura de tu respuesta

            // Verificar que el campo 'owner' se ha agregado al producto después de ser creado
            const createdProduct = createProductResponse.body.payload.product;
            expect(createdProduct).to.have.property('owner').equal(userId);
            console.log(createProductResponse)

        })

        it("/DELETE /:pid", async function(){
            const mockProduct = {
                title: "Producto de Ejemplo",
                description: "Este es un producto de muestra.",
                price: 19.99, // Precio ficticio
                thumbnails: "https://ejemplo.com/imagen.jpg", // URL de una imagen ficticia
                code: "ABC1213", // Código ficticio
                stock: 50, // Stock ficticio
                status: true, // Estado ficticio
                category: "gamer", // Categoría ficticia
            };

            const productCreated = await requester
            .post('/api/products/createProducts')
            .send(mockProduct);  
            
            const response =await requester
            .delete(`/api/products/${productCreated._id}`)


        
        })


        describe('test para el modulo de carts', async function(){
            it('/GET /:cid', async function(){
                
            })
        })
        
    })

   

    // describe("Pruebas del modulo Products", async function(){
    //     it("El endpoint POST /api/product/createProduct debe crear un producto correctamente en el db", async function(done){
    //         const mockProduct = {
    //             title: "Producto de Ejemplo",
    //             description: "Este es un producto de muestra.",
    //             price: 19.99, // Precio ficticio
    //             thumbnails: "https://ejemplo.com/imagen.jpg", // URL de una imagen ficticia
    //             code: "ABC123", // Código ficticio
    //             stock: 50, // Stock ficticio
    //             status: true, // Estado ficticio
    //             category: "gamer", // Categoría ficticia
    //             owner: newIdMongo,
    //         };
    //         const response = await requester.post("/api/products/createProduct").send(mockProduct);
    //         expect(response.body.status).to.be.equal("success");
    //         expect(response.body.payload).to.exist
    //     })
    // })


    
})