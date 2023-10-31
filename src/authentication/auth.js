
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

export const authorizeRoles = (allowedRoles) => {
        return (req, res, next) => {
        const { user } = req;
        if (user && allowedRoles.includes(user.role)) {
            next(); // El usuario tiene uno de los roles permitidos
        } else {
            res.status(403).send('Acceso denegado');
        }
        };
    };
    
    
