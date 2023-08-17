import { Router } from "express";
import { UsersMongoManager } from "../dao/mongo/UserMongoManager.js";
import Users from "../dao/mongo/models/userModel.js";
import session from "express-session";
const UserMongo = new UsersMongoManager()

const router = Router()

router.post('/register', async(req, res)=> {
    try {
        const registerForm = req.body;
        const user = await UserMongo.getByEmail(registerForm.email);
        if(user){
            return res.render('register', {error: 'El usuario ya esta registrado',style: 'register.css'});
        }
        const resultUser = await UserMongo.saveUsers(registerForm);
        res.render('login', {message: 'usuario registrado'})


    } catch (error) {
        res.render('register', {error: error.message})
    }
})
router.post('/login', async(req, res) => {
    try {
    const user = req.body
    const userLogin = await UserMongo.getByEmail(user.email)
        if(!user) {
            return res.render('login', {error: 'El usuario no esta registrado', style: 'login.css'})
        }
        if(userLogin.password === userLogin.password) {
            req.session.user = {
                first_name: userLogin.first_name,
                email: userLogin.email
            }
            res.redirect('/products')

        } else {
            return res.render('login', {error: 'Contraseña incorrecta', style: 'login.css'})
        }
   
}   catch(error){
    res.render('login',{error: error.message, style: 'login.css'})
}

});




router.post('/logout', async(req,res)=> {
    try {
        req.session.destroy();
        res.redirect('/login')
    } catch (error) {
        res.status(404).send(error)
    }
})





export {router as sessionsRouter}