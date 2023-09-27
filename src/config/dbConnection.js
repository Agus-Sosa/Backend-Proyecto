import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async() => {
    try {
        const DB_URL = config.mongo.url
        await mongoose.connect(DB_URL)
        console.log('*** MONGO DB CONECTADO ***')
    } catch (error) {
        throw new Error(`Error al conectar con la base de datos; ${error.message}`)
    }
}