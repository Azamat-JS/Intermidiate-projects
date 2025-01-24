const {authorValidator} = require('../validator/authorValidator')
const CustomAPIError = require('./custom-api')

module.exports.authorValidate = (req, res, next) => {
try{
    const {error} = authorValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw CustomAPIError(error.message)
}
}