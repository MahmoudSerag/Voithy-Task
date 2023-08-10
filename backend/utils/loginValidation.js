const Joi = require('joi');

exports.validateLoginInputs = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};
