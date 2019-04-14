import helperClass from '../utilities/dummyHelper';
import dataStore from '../utilities/dummyData/user';

/**
 * @exports
 * @class DummyControllerUser
 */
class DummyControllerUser {
  /**
   * @description get all users
   * @staticmethod getAllUsers
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */

  static getAllUsers(req, res) {
    const existingUsers = dataStore;
    res.status(200).json({
      message: 'Successfully fetched all users',
      status: 200,
      data: existingUsers,
    });
  }


  /**
   * @description Signup a new user
   * @staticmethod userSignup
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */

  static userSignup(req, res) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      type,
      isAdmin,
    } = req.body;

    const user = dataStore.find(email => email.email === email);

    if (user) {
      return res.status(400).json({
        status: 400,
        message: 'email already exits',
      });
    }


    const passwordhashed =  helperClass.hashPassword(password);

    // const passwordhashed = helperClass.hashPassword(password);

    const users = {
      id: dataStore.length + 1,
      email,
      firstName,
      lastName,
      phoneNumber,
      password: passwordhashed,
      type,
      isAdmin,
    };

    dataStore.push(users);


    const token = helperClass.generateToken({
      email,
      type,
    });

    return res.header('x-access-token', token).status(201).json({
      status: 201,
      data: {
        token,
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        password: users.password,

      },
      message: 'New user created successfully',


    });
  }

  /**
   * @description Login a new user
   * @staticmethod userLogin
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static userLogin(req, res) {
    const {
      email: userEmail,
      password: userPassword,
    } = req.body;
    const userChecked = dataStore.find(user => user.email === userEmail);
    if (userChecked) {
      console.log(userChecked);
      const {
        email,
        type,
        firstName,
        lastName,
        id,
        password,
      } = userChecked;


      const foundUserPassword = helperClass.compare(userPassword, password);

      if (foundUserPassword) {
        const token = helperClass.generateToken({
          id,
          email,
          type,
        });
        return res.header('x-access-token', token).status(200).json({
          status: 200,
          data: {
            token,
            id,
            firstName,
            lastName,
            email,
            type,
          },
          message: 'Authentication Successful',
        });
      }
      return res.status(400).json({
        status: 404,
        error: 'please type in the correct Password ',
      });
    }
    return res.status(400).json({
      status: 404,
      error: 'please input the correct email',
    });
  }
}


export default DummyControllerUser;