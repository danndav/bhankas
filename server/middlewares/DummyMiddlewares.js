import Joi from 'joi';
import dummySchema from '../utilities/dummyValidator';

const {
  userdummySchema,
} = dummySchema;
/**
 *
 * @exports
 * @class DummyMiddleware
 */
class DummyMiddleware {
  /**
   * DummyMiddleware
   * @staticmethod  userDummyData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static userDummyData(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Please fill all fields',
      });
    }
    Joi.validate(req.body, userdummySchema)
      .then(() => next())
      .catch(err => res.status(400).json({
        status: 400,
        message: err.details[0].message,
      }));
  }

  /**
   * DummyMiddleware
   * @staticmethod  accountDummyData
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
}

export default DummyMiddleware;
