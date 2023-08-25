import { Router } from "express";
import { UsersMongoManager } from "../dao/mongo/UserMongoManager.js";
import Users from "../dao/mongo/models/userModel.js";
import session from "express-session";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
const UserMongo = new UsersMongoManager()

const router = Router()

// Metodo para registrarse sin passport 
router.post('/register', async(req, res)=> {
    try {
        const registerForm = req.body;
        const user = await UserMongo.getByEmail(registerForm.email);
        if(user){
            return res.render('register', {error: 'El usuario ya esta registrado',style: 'register.css'});
        }
        const newUser = {
            first_name: registerForm.first_name,
            email: registerForm.email,
            password: createHash(registerForm.password)
        }
        await UserMongo.saveUsers(newUser);
        res.render('login', {message: 'usuario registrado', style: 'login.css'})


    } catch (error) {
        console.log(error)
        res.render('register', {error: error.message})
    }
})

// Metodo con passport (Solucionando errores)

// router.post('/register', passport.authenticate("registerStrategy", {
//     failureRedirect: "/api/sessions/fail-register"
// }), (req, res)=>{
//     res.render('register', {message: 'Usuario registrado' ,style: 'register.css'})

// })

// router.get('/fail-register', (req, res)=> {
//     res.render('register', {error: 'No se pudo registrar el usuario', style: 'register.css'})
// })



// Metodo login sin passport
// router.post('/login', async(req, res) => {
//     try {
//     const user = req.body
//     const userLogin = await UserMongo.getByEmail(user.email)
//         if(!user) {
//             return res.render('login', {error: 'El usuario no esta registrado', style: 'login.css'})
//         }
//         if(isValidPassword(userLogin, user.password)) {
//             req.session.user = {
//                 first_name: userLogin.first_name,
//                 email: userLogin.email
//             }
//             res.redirect('/products')

//         } else {
//             return res.render('login', {error: 'Contraseña incorrecta', style: 'login.css'})
//         }
   
// }   catch(error){
//     res.render('login',{error: error.message, style: 'login.css'})
// }

// });

// Metodo login con passport (Solucionando errores)

router.post('/login', passport.authenticate('loginStrategy', {
    failureRedirect: '/api/sessions/fail-login'
}), (req, res)=> {
    res.redirect('/products')
})

router.get('/fail-login', (req, res)=> {
    res.render('login', {error: 'Error al iniciar sesion', style: 'login.css'})
})


// router.post('/logout', async(req,res)=> {
//     try {
//         req.session.destroy();
//         res.redirect('/login')
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

router.post('/logout', (req, res)=> {
    req.logOut(error=> {
        if(error){
            return res.render('products', {error: 'No fue posible cerrar sesion'})
        } else {
            req.session.destroy(error=> {
                if(error) return res.render('products', {error: 'No fue posible cerrar sesion'});

                res.redirect('/login')

            });
        }
    })
})



export {router as sessionsRouter}