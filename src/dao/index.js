import { UsersMongo } from "./managers/mongo/UserMongo.js";
import { ProductMongo } from "./managers/mongo/ProductMongo.js";
import { CartMongo } from "./managers/mongo/CartMongo.js";
import { MessageMongo } from "./managers/mongo/MessageMongo.js";



// Creamos la instancia y la pasamos a una variable
export const userDao = new UsersMongo();
export const productDao = new ProductMongo();
export const cartDao = new CartMongo();
export const messageDao = new MessageMongo()