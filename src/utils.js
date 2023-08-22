import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const isValidPassword = (userDb, password) => {
    return bcrypt.compareSync(password, userDb.password);
}


export default __dirname;
