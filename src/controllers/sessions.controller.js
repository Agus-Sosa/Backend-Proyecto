import { logger } from "../config/logger.js"


export class SessionsController {
    static redirectLogin=(req, res)=>{
        res.redirect('/login')
    }

    static fallRegister =(req, res)=> {
        res.render('register', {error: 'No se pudo registrar el usuario', style: 'register.css'})
    }

    static renderCurrent=(req, res)=>{
        const user =req.user
        logger.info(`Renderizando la vista de perfil para el usuario ${user}`)
        res.render('current', {user, stye: 'current.css'})
    }

    static fallLogin = (req, res)=> {
        res.render('login', {error: 'Error al iniciar sesion', style: 'login.css'})
    }

    static redirectProducts = (req, res)=> {
        res.redirect('/products')
    }

    static logOut = (req, res)=> {
        req.logOut(error=> {
            if(error){
                logger.error(`Error al cerrar la sesion ${error}`)
                return res.render('products', {error: 'No fue posible cerrar sesion'})
            } else {
                req.session.destroy(error=> {
                    logger.info('Se cerro la sesion')
                    if(error) return res.render('products', {error: 'No fue posible cerrar sesion'});
                    res.redirect('/login')
                });
            }
        })
    }
    
}