import {app} from '../src/app.js'
import supertest from 'supertest'
import chai from 'chai'
import Product from '../src/dao/models/productsModel.js';



const expect = chai.expect;
const requester = supertest(app); /* Elemento para hacer peticiones al servidor */

describe("Pruebas app proyecto backend", async function(){

    this.timeout(10000)

    const mockUser = {
        email: "julian@gmail.com",
        password: "333"
    }

    before(async function(){
        Product.deleteMany({})
        this.cookie;
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
            // Inicio de sesión
            const loginResponse = await requester.post('/api/sessions/login').send({
                email: mockUser.email,
                password: mockUser.password,
            }).redirects(1);
            const cookieResponse = loginResponse.headers['set-cookie'][0];
            const cookieData = {
                name: cookieResponse.split("=")[0],
                value: cookieResponse.split("=")[1],
            }
            this.cookie = cookieData;
            expect(loginResponse.status).to.equal(200);

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
                .send(mockProduct)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
            expect(createProductResponse.status).to.equal(200);


        })

        it("/DELETE /:pid", async function(){
            // Inicio de sesión
            const loginResponse = await requester.post('/api/sessions/login').send({
                email: mockUser.email,
                password: mockUser.password,
            }).redirects(1);
            const cookieResponse = loginResponse.headers['set-cookie'][0];
            const cookieData = {
                name: cookieResponse.split("=")[0],
                value: cookieResponse.split("=")[1],
            }
            this.cookie = cookieData;
            expect(loginResponse.status).to.equal(200);

            const mockProduct = {
                title: "Producto de Ejemplo",
                description: "producto para probar probar delete.",
                price: 19.99, // Precio ficticio
                thumbnails: "https://ejemplo.com/imagen.jpg", // URL de una imagen ficticia
                code: "ABC1213", // Código ficticio
                stock: 50, // Stock ficticio
                status: true, // Estado ficticio
                category: "gamer", // Categoría ficticia
            };

            const productCreated = await requester
            .post('/api/products/createProducts')
            .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`])
            .send(mockProduct);  
            
            const deleteResponse =await requester
            .delete(`/api/products/${productCreated._id}`)
            expect(deleteResponse.status).to.equal(200)

        
        })
        
    })
    
})