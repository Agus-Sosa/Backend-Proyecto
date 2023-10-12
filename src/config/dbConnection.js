import mongoose from "mongoose";
import { config } from "./config.js";
import { addLogger } from "../helpers/logger.js";

const logger = addLogger()

export const connectDb = async() => {
    try {
        const DB_URL = config.mongo.url
        await mongoose.connect(DB_URL)
        logger.info('*** MONGO DB CONECTADO ***')
    } catch (error) {
        logger.error(`Error al conectar con la base de datos: ${error.message}`)
        throw new Error(`Error al conectar con la base de datos; ${error.message}`)
    }
}