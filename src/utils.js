import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './config/config.js';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const isValidPassword = (userDb, password) => {
    return bcrypt.compareSync(password, userDb.password);
}
// Funcion para validar token 
export const validateToken =(token)=> {
    try {
        const SECRET_TOKEN = config.gmail.secretToken
        const infoToken =  jwt.verify(token, SECRET_TOKEN);
        return infoToken.email;
    } catch (error) {
        return null
    }
    
}

// validar campos del usuario 
const checkValidFileds = (body) => {
    const {first_name, email, password}= body
    if(!first_name  || !email || !password){
        return false;
    } 
    return true;
}

// Creamos un filtro para nuestra carga de imagenes avatar 
const multerProfileFilter = (req, file, cb)=> {
    const valid = checkValidFileds(req.body);
    if(valid){
        cb(null, true);
    } else {
        cb(null, false);
    }
}


// configuracion para guardar imagenes de usuarios
const profileStorage = multer.diskStorage({
    // lugar de donde voy a guardar los archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '/multer/users/imgs'))
    },
    // Con que nombre guardamos el archivo.  
    filename: function(req,file, cb){           /* imagen.jpg */
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    },
});
// Creamos uploader de profiles images
export const updloaderProfile = multer({storage: profileStorage, fileFilter: multerProfileFilter});



// configuracion para guardar imagenes de los productos
const productsStorage = multer.diskStorage({
    // lugar de donde voy a guardar los archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '/multer/products/imgs'))
    },
    // Con que nombre guardamos el archivo.  
    filename: function(req,file, cb){           /* imagen.jpg */
        cb(null, `${req.body.code}-producto-${file.originalname}`)
    },
});
// Creamos uploader de profiles images
export const updloaderProducts = multer({storage: productsStorage});


// Configuracion para guardar los documentos de los usuarios
const documentsStorage = multer.diskStorage({
    // lugar de donde voy a guardar los archivos
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '/multer/users/documents'))
    },
    // Con que nombre guardamos el archivo.  
    filename: function(req,file, cb){           /* imagen.jpg */
        cb(null, `${req.user.email}-documento-${file.originalname}`)
    },
});
// Creamos uploader de profiles images
export const updloaderDocuments = multer({storage: documentsStorage});



export default __dirname;
