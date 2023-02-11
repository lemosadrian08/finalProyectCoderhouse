const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR:500
};

const successResponse = (data, statusCode = 200) => {
    return {
        success: true,
        statusCode,
        data,
    }
};
  
const errorResponse = (error, statusCode = 200) => {
    return {
        success: false,
        statusCode,
        error,
    }
};
  
module.exports = {
    successResponse,
    errorResponse,
    STATUS
};