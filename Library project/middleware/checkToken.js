const BaseError = require("../errors/base_error");
const jwt = require("jsonwebtoken");

const tokenChecker = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(BaseError.UnauthorizedError("Authentication invalid"));
  }
  const token = authHeader.split(" ")[1];
  try {
    let payload = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = { userId: payload.id };
    next();
  } catch (error) {
   return next(BaseError.UnauthorizedError("Authentication invalid"));
  }
};

const checkAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization
  
    if (!authHeader || !authHeader.startsWith("Bearer")) {
     return next(BaseError.UnauthorizedError("Authentication invalid"));
    }
    const token = authHeader.split(" ")[1];
    try {
      let payload = jwt.verify(token, process.env.ACCESS_SECRET);
      req.user = {userId:payload.id};
      if(payload.role !== "admin"){
        return next(BaseError.UnauthorizedError('You are not admin'))
      }
      next()
}catch(error){
  return res.status(500).json({message: error.message})   
}
}
module.exports = {tokenChecker, checkAdminToken};
