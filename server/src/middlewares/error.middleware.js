const { STATUS } = require('../utils/api.utils');
const { errorResponse } = require('../utils/api.utils');

const errorMiddleware = (error, req, res, next) => {
    console.log(error);
    const status = error.status || STATUS.SERVER_ERROR;
    const errorItem = {
        message: error.description || error.message,
        details: error.details || null
    };
    const errorPayload = errorResponse(errorItem, status);
    return res.status(status).json(errorPayload);   
};

module.exports= errorMiddleware