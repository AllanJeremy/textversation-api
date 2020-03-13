/** Get an API response
 * @param {String} message Message to return as part of the response
 * @param {Object} data An object representing data returned as part of the API response. Default: `null`
 * @param {Number} statusCode HTTP status code to be returned with this response. Default: `200`
 * @return {Object} An API response object
 */
const getResponse = (ok, message, data = null, statusCode = 200) => {
    let response = {
        ok,
        message,
        data,
        statusCode
    };

    return response;
};

/** Get an error response
 * @param {String} message The error message to return as part of the response
 * @param {Object<Error>} error The error object containing the error's data
 * @param {Number} statusCode HTTP status code to be returned with this response
 * @return {Object} An API response object
 */
const getError = (message, error, statusCode = 500) => {
    statusCode = statusCode;
    let response = this.getResponse(false, message, null, statusCode);
    response.error = error;
    return response;
};

/** Attaches an error handler to an `async` function 
 * @param {Object} res A HTTP resource object. Usually the first parameter of an Express middleware function
 * @param {Function} fn The `async` function to attach the error message to
 * @return A promise with an error handler attached to it
 */
const attachErrorHandler = (res, fn) => { //? Intended to be called in middleware
    return fn.catch(err => {
        let apiResponse = this.getError(err.message, err);
        console.log(err);
        console.error(err.message);

        res.status(500).json(apiResponse);
    });
};

module.exports = {
    getResponse,
    getError,
    attachErrorHandler
}