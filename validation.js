//VALIDATION
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
          .alphanum()
          .min(3)
          .max(50)
          .required(),
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )
        .min(3)
        .max(50)
        .required(),
        description: Joi.string()
        .min(1)
        .max(100),
    password: Joi.string()
        .min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    isVisible: Joi.boolean()
        .required()
  });
  return schema.validate(data);
}

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      password: Joi.string()
          .min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
  });
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;