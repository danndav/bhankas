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
    const hash = bcrypt.hashSync(password, 10);

    return hash;
  }


  /**
   * Userhelper Class
   * @staticmethod compare
   * @param  {array} dataStore
   * @param {string} passwordcompare
   * @return {string} comparedpassword
   */
  static compare(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword); // true
  }

  /**
   * Userhelper Class
   * @staticmethod generateToken
   * @param  {array} dataStore
   * @param {string} email
   * @param {string} type
   * @return {string}
   */

  static generateToken(payload) {
    return jwt.sign({
      payload,
    }, 'tokenverification', {
      expiresIn: '2h',
    });
  }

  /**
   * Userhelper Class
   * @staticmethod VerifyToken
   * @param  {array} dataStore
   * @param {string} email
   * @param {string} type
   * @return {string}
   */

  static verifyToken(token) {
    const decoded = jwt.verify(token, 'tokenverification');
    return decoded;
  }
}

export default helperClass;