import { UsersMongoManager } from "../UserMongoManager.js";
import { ProductMongoManager } from "../ProductMongoManager.js";
import { CartMongoManager } from "../CartMongoManager.js";

export const userService = new UsersMongoManager();
export const productService = new ProductMongoManager();
export const cartService = new CartMongoManager();