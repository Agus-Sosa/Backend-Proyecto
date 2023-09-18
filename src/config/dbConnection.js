import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async() => {
    try {
        const DB_URL = config.mongo.url
        await mongoose.connect(DB_URL)
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('Error al conectar el servidor',error.message)
    }
}