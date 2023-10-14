import winston from "winston";
import { config } from "../config/config.js";
import { logLevels } from "./levels.js";
const CURRENT_ENV = config.server.currentEnv;

// Modo logger para desarrollo
const devLogger =winston.createLogger({
    levels: logLevels,
    transports:[
        new winston.transports.Console({level:'debug'})
    ]
})

// Modo logger para produccion
const prodLogger = winston.createLogger({
    levels: logLevels,
    transports:[
        new winston.transports.File({filename: './logs/logfile.log', level:'info'}),
        new winston.transports.File({filename: './logs/errors.log', level:'error'})
    ]
})

// creamos una funcion para manejar el logger dependiendo el ambiente
export const addLogger =()=> {
    return (CURRENT_ENV === 'development' ? devLogger : prodLogger)
}



