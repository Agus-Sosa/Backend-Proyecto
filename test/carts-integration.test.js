import {app} from '../src/app.js'
import supertest from 'supertest'
import chai from 'chai'
import { CartMongo } from '../src/dao/managers/mongo/CartMongo.js';
import { UsersMongo } from '../src/dao/managers/mongo/UserMongo.js';
import e from 'express';

const expect = chai.expect;
const requester = supertest(app); /* Elemento para hacer peticiones al servidor */


describe("Pruebas app backend",async function(){
    this.timeout(10000)
    // const mockUser = {
    //     email: "julian@gmail.com",
    //     password: "333"
    // }

    const mockUser = {
        email: "julian@gmail.com",
        password: "333"
    }

    before(async function(){
    this.cartManager = new CartMongo();
    this.userManager = new UsersMongo();
})

    describe("Pruebas modulo de carts", async function(){
        it('/GET /:cid', async function(){

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

            const userData =await this.userManager.getByEmail(mockUser.email);
            const userCart = userData.cart;
            
            // const savedCart =await this.cartManager.createCart();
            // const cartId = savedCart._id;

            const cartResponse = await requester
            .get(`/api/carts/${userCart}`)
            .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
            expect(cartResponse.status).to.equal(200);

        })

        it("/POST /:cid/products/:pid/", async function(){
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
                stock: 100,
                status: true,
                category: 'gamer',
        
            };

            const createProductResponse = await requester
            .post('/api/products/createProduct')
            .send(mockProduct)
            .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
        expect(createProductResponse.status).to.equal(200);
            const productId = createProductResponse.body.product._id
            const user = await this.userManager.getUserById(createProductResponse.body.product.owner)
            const userCart = user.cart

            const cartResponse = await requester
            .post(`/api/carts/${userCart}/products/${productId}`)
            .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);

            expect(cartResponse.status).to.equal(200);
        })



        it("/DELETE /:cid", async function(){
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

            const userData =await this.userManager.getByEmail(mockUser.email);
            const userCart = userData.cart;

            const response = await requester.delete(`/api/carts/${userCart}`);
            expect(response.status).to.equal(200);
        })

        it("/PUT /:cid/products/:pid", async function(){

        
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
            stock: 1000,
            status: true,
            category: 'gamer',
    
        };

        const createProductResponse = await requester
        .post('/api/products/createProduct')
        .send(mockProduct)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
    expect(createProductResponse.status).to.equal(200);
        const productId = createProductResponse.body.product._id
        const user = await this.userManager.getUserById(createProductResponse.body.product.owner)
        const userCart = user.cart


        const addToCartResponse = await requester
            .post(`/api/carts/${userCart}/products/${productId}`)
            .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
            expect(addToCartResponse.status).to.equal(200);

        const updateQuantity = 10;
        const updateCartResponse = await requester
            .put(`/api/carts/${userCart}/products/${productId}`)
            .send({quantity: updateQuantity});
        expect(updateCartResponse.status).to.equal(200);


        })

        it('/PUT /:cid', async function(){
            
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
            stock: 100,
            status: true,
            category: 'gamer',
    
        };

    


        const createProductResponse = await requester
        .post('/api/products/createProduct')
        .send(mockProduct)
        .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);
    expect(createProductResponse.status).to.equal(200);

        const productId = createProductResponse.body.product._id

        const user = await this.userManager.getUserById(createProductResponse.body.product.owner)
        const userCart = user.cart

        const updateNewProductInCart = [
            {
                "product": productId,
                "quantity": 60
            }
        ]

        const updateCartReponse =await requester
            .put(`/api/carts/${userCart}`)
            .send(updateNewProductInCart)
        
        expect(updateCartReponse.status).to.equal(200);
        })


        it('/POST /:cid/purchase', async function(){
           

            const loginResponse = await requester.post('/api/sessions/login').send({
                email: mockUser.email,
                password: mockUser.password,
            }).redirects(1);
            const user = await this.userManager.getByEmail(mockUser.email);
            const userCart = user.cart;

            const cookieResponse = loginResponse.headers['set-cookie'][0];
            const cookieData = {
                name: cookieResponse.split("=")[0],
                value: cookieResponse.split("=")[1],
            }
            this.cookie = cookieData;
            expect(loginResponse.status).to.equal(200);

            

            const purchaseResponse = await requester
                .post(`/api/carts/${userCart}/purchase`)
                .set("Cookie", [`${this.cookie.name}=${this.cookie.value}`]);



            expect(purchaseResponse.status).to.equal(200);

        })

        })

        


})
    