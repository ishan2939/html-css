//custom error objects

const ERROR_OK = {
    code: 200,
    message: "OK"
};

const SUCCESS_CREATED = {
    code: 201,
    message: "Created"
};

const SUCCESS_ACCEPTED = {
    code: 202,
    message: "Accepted"
};

const ERROR_BAD_REQUEST = {
    code: 400,
    message: "Bad Request"
};

const ERROR_UNAUTHORIZED = {
    code: 401,
    message: "Unauthorized"
};

const ERROR_PAYMENT_REQUIRED = {
    code: 402,
    message: "Payment Required"
};

const ERROR_FORBIDDEN = {
    code: 403,
    message: "Forbidden"
};

const ERROR_NOT_FOUND = {
    code: 404,
    message: "Not Found"
};

const ERROR_INTERNAL_SERVER_ERROR = {
    code: 500,
    message: "Internal Server Error"
};

module.exports = {
    ERROR_OK, 
    SUCCESS_ACCEPTED, 
    SUCCESS_CREATED, 
    ERROR_BAD_REQUEST, 
    ERROR_UNAUTHORIZED, 
    ERROR_PAYMENT_REQUIRED, 
    ERROR_FORBIDDEN, 
    ERROR_NOT_FOUND, 
    ERROR_INTERNAL_SERVER_ERROR
};