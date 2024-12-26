const ErrorHandler = (err, req, res, next) => {

    if(res.headersSent){
        return next(err);

    }


    const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500;
    res.status(statusCode);

    console.log(err);

    res.json({
        message: err.message ,
        stack:  err.stack ,
    });    

};

export default ErrorHandler;