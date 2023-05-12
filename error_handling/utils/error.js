class MyError extends Error {
    constructor(code, message, extra=[]) {
        super(message); // error message

        this.statusCode = code; //statuscode

        this.extraDetails = extra;  //extra details(if needed)
    }
}

module.exports = MyError;