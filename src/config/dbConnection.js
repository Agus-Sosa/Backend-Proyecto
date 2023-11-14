import mongoose from "mongoose";
import { config } from "./config.js";
import { logger } from "../helpers/logger.js";
import {configTest} from "../../test/config.test.js";


const URL_DB_TEST = configTest.mongo.url
const DB_URL = config.mongo.url


export const connectDb = async() => {
    try {
        await mongoose.connect(URL_DB_TEST)
        logger.info('*** MONGO DB CONECTADO ***')
    } catch (error) {
        logger.error(`Error al conectar con la base de datos: ${error.message}`)
        throw new Error(`Error al conectar con la base de datos; ${error.message}`)
    }
}