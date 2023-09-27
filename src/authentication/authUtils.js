// authUtils.js

// Función para verificar si un usuario es administrador
export const isAdmin = (req) => {
    return req.user && req.user.role === 'admin';
};

// Función para verificar si un usuario es un usuario normal
export const isUser = (req) => {
    return req.user && req.user.role === 'user';
};

