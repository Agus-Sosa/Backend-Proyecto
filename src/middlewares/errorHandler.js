import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.error('Error', error);
    switch (error.code) {
        case EError.AUTH_ERROR:
            res.status(401).json({ status: 'error', error: error.cause });
            break;

        case EError.DATABASE_ERROR:
            res.status(500).json({ status: 'error', error: error.message });
            break;

        case EError.INVALID_JSON:
            res.status(404).json({ status: 'error', error: error.cause });
            break;

        case EError.ROUTING_ERROR:
            res.status(402).json({ status: 'error', error: error.cause });
            break;

        case EError.CART_ERROR:
            res.status(404).json({ status: 'error', error: error.cause });
            break;

        case EError.UNAUTHORIZED:
            res.status(404).json({ status: 'Error', error: error.message });
            break;

        case EError.INVALID_PARAM:
            res.status(400).json({ status: 'Error', error: error.message });
            break;

        case EError.USERS_ERROR:
            res.status(400).json({ status: 'error', error: error.message });
            break;

        case EError.PRODUCT_ERROR:
            res.status(401).json({ status: "error", error: error.cause });
            break;

        default:
            res.status(500).json({ status: 'error', error: 'error desconocido' });
            break;
    }
};
