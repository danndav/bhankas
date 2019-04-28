import Joi from 'joi';

const balance = Joi.number().integer().min(11)
  .required();
const amount = Joi.number().integer().positive()
  .required();
const type = Joi.string().trim()
  .min(1)
  .valid('current', 'savings')
  .required();

const createAccountSchema = {
  balance,
  type,
};

const createTransactionSchema = {
  amount
};



export default {
  createAccountSchema,
  createTransactionSchema
};