import Joi from "joi";

export const userValidationRegister = Joi.object({
    username: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    full_name: Joi.string().required(), 
    date_of_birth: Joi.string(),
    profile_image: Joi.string(),
    phone_number: Joi.string().required(),
    education: Joi.string(), 
}).messages({
  'string.base': '{{#label}} must be a type of text',
  'string.empty': '{{#label}} cannot be empty',
  'any.required': '{{#label}} is required',
  'string.email': 'Please provide a valid email address',
  'string.min': 'username must be at least {{#limit}} characters long',
});

export const userValidationLogin = Joi.object({
    username: Joi.string().min(8).max(30).required(),
    password: Joi.string().min(8).max(30).required()
});