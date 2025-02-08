const errorHandle = (err, req, res, next) => {
    console.error(err.stack); // Log the full error stack for debugging
  
    // If error has a status code, use it; otherwise, default to 500
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal Server Error" : message,
    });
  };

  module.exports = errorHandle