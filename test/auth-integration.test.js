import {app} from '../src/app.js'
import supertest from 'supertest'
import chai from 'chai'
import Users from '../src/dao/models/userModel.js';

const expect = chai.expect;
const requester = supertest(app); /* Elemento para hacer peticiones al servidor */



describe("Prueba app backend", function(){

    this.timeout(100000);                    

    before(async function(){        
        // await Users.deleteMany({})
        this.cookie;
    })

    const mockUser = {
        first_name:"Julian",
        last_name: "Alvarez",
        email: "julian@gmail.com",
        age: "21",
        password: "333",
        role: 'admin',
        avatar: "avatar.jpg"
    }
    describe("test modulo sessions", function(){

        it("Se debe resgistrar el ususario correctamente", async function(){
            const response = await requester.post('/api/sessions/register').send(mockUser).redirects(1);

            expect(response.status).to.equal(200);
            expect(response.redirects.length).to.equal(1);

        })

        it("Se debe loguear el usuario correctamente", async function(){

            const mockUserLoged ={
                email: mockUser.email,
                password: mockUser.password,
            };
            
            const response =await requester.post('/api/sessions/login').send(mockUserLoged).redirects(1)
            const cookieResponse = response.headers['set-cookie'][0];
            const cookieData = {
                name: cookieResponse.split("=")[0],
                value: cookieResponse.split("=")[1],
            }
            this.cookie = cookieData;
            expect(this.cookie.name).to.be.equal("connect.sid")
            expect(response.status).to.equal(200);
        })

        
    })
})