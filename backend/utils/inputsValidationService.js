const Joi = require('joi');

exports.validateDoctorInputs = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    licenseId: Joi.string().required(),
    role: Joi.string().valid('doctor').required(),
    phoneNumber: Joi.string()
      .pattern(/^01[0125][0-9]{8}$/)
      .message(
        'Invalid phone number format. Please provide a valid phone number starting with 01 followed by 9 digits.'
      )
      .required(),
  });
  return schema.validate(body);
};

exports.validatePatientInputs = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('patient').required(),
    phoneNumber: Joi.string()
      .pattern(/^01[0125][0-9]{8}$/)
      .message(
        'Invalid phone number format. Please provide a valid phone number starting with 01 followed by 9 digits.'
      )
      .required(),
  });
  return schema.validate(body);
};

exports.validateLoginInputs = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

exports.validateNotificationInputs = (body) => {
  const schema = Joi.object({
    message: Joi.string().required(),
  });
  return schema.validate(body);
};
