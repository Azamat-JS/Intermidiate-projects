const Joi = require("joi");

exports.carValidator = (data) => {
  const schema = Joi.object({
    model: Joi.string().min(6).max(40).required(),
    price: Joi.number().required(),
    engine: Joi.number().required(),

    year: Joi.number()
      .max(new Date().getFullYear())
      .min(new Date().getFullYear() - 50),

    distance: Joi.number().min(0),
    gearBook: Joi.string().required(),
    color: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};
