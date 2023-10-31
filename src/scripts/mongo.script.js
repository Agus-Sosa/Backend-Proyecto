// Archivo para ejecutar consultas a la base de datos que no tienen que estar dentro de la aplicacion

import mongoose from "mongoose";
import Product from "../dao/models/productsModel.js";
import { config } from "../config/config.js";


const MONGO_URL = config.mongo.url

const updateProducts = async()=> {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("base de datos conectada")
        const adminId = "6527006f26e2b973d59c60a1";
        const result = await Product.updateMany({}, {$set: {owner: adminId}})
        console.log(result)
    } catch (error) {
        console.error(error)
    } finally {
        await mongoose.connection.close()
    }
}

updateProducts() 