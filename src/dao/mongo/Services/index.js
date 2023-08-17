import { UsersMongoManager } from "../UserMongoManager.js";
import { connectDb } from "../../../config/dbConnection.js";
connectDb();
export const userService = new UsersMongoManager()