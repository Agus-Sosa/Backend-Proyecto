import { config } from "../config/config.js";
import { connectDb } from "../config/dbConnection.js";


// Guardamos en una variable el valor de la persistencia
const PERSISTENCE = config.server.persistence;


// Declaramos variables sin valor para que luego tomen el valor de alguna base de dato
let productDao;
let userDao;
let cartDao;
let messageDao;
let ticketDao

// Defino constantes para las persistencias para no tener ningun error
const PERSISTENCE_TYPES = {
    MONGO: 'MONGO',
    FILESYSTEM: 'FILESYSTEM',
    MEMORY: 'MEMORY'
};


// Switch para verificar y cambiar entre bases de datos de forma mas efectiva
switch (PERSISTENCE) {

    case PERSISTENCE_TYPES.MONGO:    

        // Importamos la conexion a la base de datos para que se conecte cuando usamos mongo como persistencia
        connectDb();

        const {ProductMongo} = await import('./managers/mongo/ProductMongo.js');
        productDao = new ProductMongo();

        const {UsersMongo} = await import('./managers/mongo/UserMongo.js');
        userDao = new UsersMongo();

        const {CartMongo} = await import('./managers/mongo/CartMongo.js');
        cartDao = new CartMongo();

        const{MessageMongo} = await import('./managers/mongo/MessageMongo.js');
        messageDao = new MessageMongo();


        const {TicketsMongo} = await import('./managers/mongo/ticketsMongo.js');
        ticketDao = new TicketsMongo();

        break;  

    case PERSISTENCE_TYPES.FILESYSTEM:

    console.log('*** BASE DE DATOS FILESYSTEM CONECTADO ***');
    
    const {CartFiles} = await import('./managers/fileSystem/CartFiles.js');
    cartDao = new CartFiles();

    
    break;

    case PERSISTENCE_TYPES.MEMORY:

    console.log('***BASE DE DATOS MEMORY CONECTADO ***');

    break;

    default:
        break;
}

export {userDao, productDao, messageDao, cartDao, ticketDao};