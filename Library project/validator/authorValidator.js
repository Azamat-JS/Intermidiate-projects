const Joi = require('joi')

exports.authorValidator = (data) => {
       const schema = Joi.object({
        name: Joi.string().min(6).max(40).required(),
        
        birth_year: Joi.number().max(new Date().getFullYear() - 10),
    
        death_year: Joi.number().max(new Date().getFullYear()),
    
        nation: Joi.string().min(2).max(30),

        category: Joi.string(),

        picture: Joi.string()
    })
    return schema.validate(data) 
    }

