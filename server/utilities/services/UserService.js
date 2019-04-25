import jwt from 'jsonwebtoken';
import config from '../../config/index';
import passwordValidator from '../../utilities/ComparePassword';
import queryProvider from '../../utilities/queries';



/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
   * Find user by email
   * @staticmethod
   * @param  {string} email - Request object
   * @return {string} res
   */
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      queryProvider
        .findUserByEmailQuery(email)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }


  /**
   * save new user
   * @staticmethod
   * @param  {string} body - Request object
   * @return {string} res
   */
  static saveUser(body) {
    return new Promise((resolve, reject) => {
      queryProvider
        .saveUserQuery(body)
        .then((res) => {
          const token = jwt.sign({
            ...res[0]
          }, config.jwtSecretKey, {
            expiresIn: 86400,
          });

          const data = {
            token,
            id: res[0].id,
            firstName: res[0].firstname,
            lastName: res[0].lastname,
            email: res[0].email,
            password: res[0].password,
            type: res[0].type,
            isAdmin: res[0].isadmin
          };

          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * updatePasswordByToken
   * @staticmethod
   * @param  {string} email - newpassword
   *  @param  {string} userpassword - token
   * @return {string} res
   */
  static validateUserLogin(email, userpassword) {
    return new Promise((resolve, reject) => {
      this.findUserByEmail(email)
        .then((res) => {
          passwordValidator
            .compare(userpassword, res.rows[0].password)
            .then(() => {
              const token = jwt.sign({
                ...res.rows[0]
              }, config.jwtSecretKey, {
                expiresIn: 86400,
              });

              const data = {
                token,
                id: res.rows[0].id,
                firstname: res.rows[0].firstname,
                lastname: res.rows[0].lastname,
                email: res.rows[0].email,
                type: res.rows[0].type,
                isAdmin: res.rows[0].isadmin
              };
              resolve(data);
            })
            .catch((err) => {
              const response = 'Wrong Password and Email Combination';
              reject(response);
            });
        })
        .catch((err) => {
          const response = 'Wrong Email and Password Combination. Please Check your credentials';
          reject(response);
        });
    });
  }



  /**
   * view all users created
   * @staticmethod
   * @return {string} res
   */
  static viewAllCreated() {
    return new Promise((resolve, reject) => {
      queryProvider
        .findAllUsersQuery()
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

}

export default UserService;