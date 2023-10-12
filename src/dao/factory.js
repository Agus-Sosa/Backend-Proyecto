import { config } from "../config/config.js";
import { connectDb } from "../config/dbConnection.js";
import { CartMongo } from "./managers/mongo/CartMongo.js";
import { MessageMongo } from "./managers/mongo/MessageMongo.js";
import { ProductMongo } from "./managers/mongo/ProductMongo.js";
import { UsersMongo } from "./managers/mongo/UserMongo.js";
import { TicketsMongo } from "./managers/mongo/ticketsMongo.js";

import { CartFiles } from "./managers/fileSystem/CartFiles.js";

import { addLogger } from "../helpers/logger.js";

const logger =addLogger();

// Guardamos en una variable el valor de la persistencia
const PERSISTENCE = config.server.persistence;


// Defino constantes para las persistencias para no tener ningun error
const PERSISTENCE_TYPES = {
    MONGO: 'MONGO',
    FILESYSTEM: 'FILESYSTEM',
    MEMORY: 'MEMORY'
};


// Declaramos variables sin valor para que luego tomen el valor de alguna base de dato
let productDao;
let userDao;
let cartDao;
let messageDao;
let ticketDao



// Switch para verificar y cambiar entre bases de datos de forma mas efectiva
switch (PERSISTENCE) {

    case PERSISTENCE_TYPES.MONGO:    
        // Importamos la conexion a la base de datos para que se conecte cuando usamos mongo como persistencia
        connectDb();

        productDao = new ProductMongo();
        userDao = new UsersMongo();
        cartDao = new CartMongo();
        messageDao = new MessageMongo();
        ticketDao = new TicketsMongo();

        break;  

    case PERSISTENCE_TYPES.FILESYSTEM:
    logger.info('*** BASE DE DATOS FILESYSTEM CONECTADO ***');
    cartDao = new CartFiles();
    break;

    case PERSISTENCE_TYPES.MEMORY:
    logger.info('***BASE DE DATOS MEMORY CONECTADO ***');

    break;

    default:
        throw new Error('Tipo de persistencia no valido')
}

export {
    userDao, 
    productDao, 
    messageDao, 
    cartDao, 
    ticketDao
};