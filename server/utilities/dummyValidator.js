import Joi from 'joi';

const firstName = Joi.string().trim().min(2)
  .min(1)
  .required();
const lastName = Joi.string().trim().min(2)
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
  .required();
const balance = Joi.number().integer()
  .min(1)
  .required();
const isAdmin = Joi.boolean();


const userdummySchema = {
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  type,
  isAdmin,
};

const accountdummySchema = {
  firstName,
  lastName,
  email,
  type,
  balance,
};

export default {
  userdummySchema,
  accountdummySchema,
};
