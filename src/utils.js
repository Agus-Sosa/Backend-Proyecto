import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './config/config.js';

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




export default __dirname;
