import { Router } from "express";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/loggerTest", (req, res) => {
    logger.debug("Este es un mensaje de debug.");
    logger.http("Este es un mensaje HTTP.");
    logger.info("Este es un mensaje de info.");
    logger.warning("Este es un mensaje de warning.");
    logger.error("Este es un mensaje de error.");
    logger.fatal("Este es un mensaje fatal.");
    res.send("Test para logger");
});
export {router as loggerRouter}