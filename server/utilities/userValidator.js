import Joi from 'joi';

const firstName = Joi.string().trim(true).min(3).regex(/^[A-Za-z]*$/)
  .error(() => 'enter a valid firstName and name must not be less than 3 character')
  .min(1)
  .required();
const lastName = Joi.string().trim().min(3).regex(/^[A-Za-z]*$/)
  .error(() => 'enter a valid Lastname and name must not be less than 3 character')
  .min(1)
  .required();
const email = Joi.string().email().trim().min(8)
  .min(1)
  .required();
const password = Joi.string().trim()
  .min(1)
  .required();
const phoneNumber = Joi.number().integer().min(11)
  .required();
const type = Joi.string().trim()
  .min(1)
  .valid('client', 'staff')
  .required();

const isAdmin = Joi.boolean();


const userSignupSchema = {
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  type,
  isAdmin,
};

const userSigninSchema = {
  email,
  password,
};


export default {
  userSignupSchema,
  userSigninSchema,
};