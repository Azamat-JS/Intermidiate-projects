const Joi = require("joi");

exports.bookValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(40).required(),

    genre: Joi.string().min(2),

    price: Joi.number().min(1000),

    rating: Joi.number().max(5),

    author_info: Joi.string(),
  });
  return schema.validate(data);
};
