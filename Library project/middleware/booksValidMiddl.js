const {bookValidator} = require('../validator/bookValidator')
const BaseError = require('../errors/base_error')

module.exports.bookValidate = (req, res, next) => {
try{
    const {error} = bookValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw BaseError(500, error.message)
}
}