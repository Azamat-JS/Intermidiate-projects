const {authorValidator} = require('../validator/authorValidator')
const BaseError = require('../errors/base_error')

module.exports.authorValidate = (req, res, next) => {
try{
    const {error} = authorValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw BaseError(500, error.message)
}
}