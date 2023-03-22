const { STATUS } = require('../utils/api.utils');
const { errorResponse } = require('../utils/api.utils');
const logger = require('../utils/logger.utils')

const errorMiddleware = (error, req, res, next) => {
    logger.log('error', error)
    const status = error.status || STATUS.SERVER_ERROR;
    const errorItem = {
        message: error.description || error.message,
        details: error.details || null
    };
    const errorPayload = errorResponse(errorItem, status);
    logger.log('error', errorPayload)
    return res.status(status).json(errorPayload);   
};

module.exports= errorMiddleware

