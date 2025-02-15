const errorHandle = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal Server Error" : message,
    });
  };

  module.exports = errorHandle