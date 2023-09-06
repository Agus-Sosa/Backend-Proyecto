import { Router } from "express";
import passport from "passport";

const router = Router()



// Metodo register con passport
router.post('/register', passport.authenticate("registerStrategy", {
    failureRedirect: "/api/sessions/fail-register"
}), (req, res)=>{
    res.redirect('/login')
})


// Si hay alguna fall al refistrarse lo envia a esta ruta 
router.get('/fail-register', (req, res)=> {
    res.render('register', {error: 'No se pudo registrar el usuario', style: 'register.css'})
})




// Metodo login con passport
router.post('/login', passport.authenticate('loginStrategy', {
    failureRedirect: '/api/sessions/fail-login'
}), (req, res)=> {
    const user =req.user
    console.log('user', user)
    res.render('current', {user, stye: 'current.css'})
    // res.redirect('/products')
})
// Si hay un problema lo manda aqui
router.get('/fail-login', (req, res)=> {
    res.render('login', {error: 'Error al iniciar sesion', style: 'login.css'})
})



router.get('/loginGithub', passport.authenticate('githubLoginStrategy'));


router.get('/github-callback', passport.authenticate('githubLoginStrategy',{
    failureRedirect: '/api/sessions/fail-register'
}), (req, res)=> {
    res.redirect('/products')
})






// Desloguearse
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