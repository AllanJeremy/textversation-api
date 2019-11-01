module.exports.getResponse = (isOk, message, data, statusCode) => {
    let response = {};
    response.ok = isOk;
    response.statusCode = statusCode || 200;
    response.message = message;
    response.data = data || null;
    return response;
};

module.exports.getError = (message, error, statusCode) => {
    statusCode = statusCode || 500;
    let response = this.getResponse(false, message, null, statusCode);
    response.error = error;
    return response;
};

// Attaches an error handler to a function ~ returns an appropriate response
module.exports.attachErrorHandler = (res,fn)=>{ //? Intended to be called in middleware
    fn.catch(err=>{
        let apiResponse = this.getError(err.message,err);
        console.log(err);
        console.error(err.message);

        res.status(500).json(apiResponse);
    });
};
