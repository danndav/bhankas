import jwt from 'jsonwebtoken';
import config from '../config/index';

/**
 * @exports
 * @class helperClass
 */

class helperClass {
  /**
   * Userhelper Class
   * @staticmethod VerifyToken
   * @param  {array} dataStore
   * @param {string} email
   * @param {string} type
   * @return {string}
   */

  static verifyToken(token) {
    const decoded = jwt.verify(token, config.jwtSecretKey);
    return decoded;
  }
}

export default helperClass;
