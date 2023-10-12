import { Router } from "express";
import { addLogger } from "../helpers/logger.js";

const logger = addLogger();


const router = Router();

router.get('/loggerTest', (req, res)=> {
    logger.debug('Mensaje debug');
    logger.http('mensaje Http');
    logger.info('Mensaje de info');
    logger.warning('Mensaje de warning');
    logger.error('Mensaje de error');
    logger.fatal('Mensaje de fatal');
    
    res.json('Ruta de prueba del logger');
});

export {router as loggerRouter}