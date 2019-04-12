import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


/**
 * @exports
 * @class helperClass
 */

class helperClass {
  /**
   * Userhelper Class
   * @staticmethod hashpassword
   * @param  {array} dataStore
   * @param {string} password
   * @return {string} hashedpassword
   */

  static hashPassword(password) {
    return bcrypt.hash(password, 10);
  }


  /**
   * Userhelper Class
   * @staticmethod compare
   * @param  {array} dataStore
   * @param {string} password
   * @return {string} comparedpassword
   */
  static compare(password, hashedpassword) {
    return bcrypt.compare(password, hashedpassword);
  }

  /**
   * Userhelper Class
   * @staticmethod generateToken
   * @param  {array} dataStore
   * @param {string} email
   * @param {string} type
   * @return {string}
   */

  static async generateToken({
    email,
    type,
  }) {
    return jwt.sign({
      email,
      type,
    }, 'privatekey', {
      expiresIn: '2h',
    });
  }
}

export default helperClass;
