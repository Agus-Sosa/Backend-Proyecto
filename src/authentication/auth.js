import { isAdmin, isUser } from "./authUtils.js";

    // No permite acceder al apartado de products si no se inicio sesion
export const requireLogin = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        res.redirect('/login')
    }
}


// No permite iniciar sesion ni tampoco registrarse si esta inciado sesion
export const checkLogin = (req, res, next) =>  {
    if(req.user) {
        res.redirect('/products');
    } else {
        next();
    }
}


export const isAdminAuth = (req, res, next) => {
    if(isAdmin(req)){ 
        next();
    } else {
        return res.status(401).send('Usuario no autorizado');

    }

}


export const isUserAuth = (req, res, next) => {
    if(isUser(req)){
        next();
    }else {
        res.status(403).send('Acceso denegado1');
    };
};
