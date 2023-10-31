import { config } from "../config/config.js";
import { connectDb } from "../config/dbConnection.js";
import { CartMongo } from "./managers/mongo/CartMongo.js";
import { MessageMongo } from "./managers/mongo/MessageMongo.js";
import { ProductMongo } from "./managers/mongo/ProductMongo.js";
import { UsersMongo } from "./managers/mongo/UserMongo.js";
import { TicketsMongo } from "./managers/mongo/ticketsMongo.js";
import { CartFiles } from "./managers/fileSystem/CartFiles.js";
import { PERSISTENCE_TYPES } from "./databaseConfig.js";
import { logger } from "../helpers/logger.js";
import { CustomError } from "../Services/error/CustomError.service.js";
import { EError } from "../enums/EError.js";

// Guardamos en una variable el valor de la persistencia
const PERSISTENCE = config.server.persistence;

// Clase factory para cambiar entre base de datos
class DataBaseFactory {
  static createDataBase(persistence) {
    switch (persistence) {
      case PERSISTENCE_TYPES.MONGO:
        connectDb();
        return {
          productDao: new ProductMongo(),
          userDao: new UsersMongo(),
          cartDao: new CartMongo(),
          messageDao: new MessageMongo(),
          ticketDao: new TicketsMongo(),
        };

      case PERSISTENCE_TYPES.FILESYSTEM:
        logger.info("*** BASE DE DATOS FILESYSTEM CONECTADO ***");

        return {
          cartDao: new CartFiles(),
        };

      case PERSISTENCE_TYPES.MEMORY:
        logger.info("*** BASE DE DATOS MEMORY CONECTADO ***");
        return {};
      default:
        throw CustomError.createError({
          name: "DataBaseConnect",
          cause: "Base de datos no valida",
          message: "No se pudo conectar a la base de datos",
          errorCode: EError.DATABASE_ERROR,
        });
    }
  }
}

const Db = DataBaseFactory.createDataBase(PERSISTENCE);
export const { userDao, productDao, messageDao, cartDao, ticketDao } = Db;
