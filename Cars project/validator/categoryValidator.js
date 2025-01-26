const Joi = require('joi')

exports.categoryValidator = (data) => {
       const schema = Joi.object({
        brand: Joi.string().max(40).required(),
    })
    return schema.validate(data) 
    }

