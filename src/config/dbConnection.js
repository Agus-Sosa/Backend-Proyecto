import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDb = async() => {
    try {
        await mongoose.connect(config.mongo.url)
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('Error al conectar el servidor',error.message)
    }
}