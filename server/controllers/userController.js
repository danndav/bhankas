import UserService from '../utilities/services/UserService';

/**
 * @exports
 * @class UserController
 */
class UserController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createUser(req, res) {
        UserService
            .saveUser(req.body)
            .then(data => res.status(201).json({
                status: 201,
                data,
                message: 'New user created successfully',
            }))
            .catch((err) => {
                console.log(err)
                if (err.rowCount >= 1) {
                    return res.status(400).json({
                        status: 400,
                        message: `User with this email ${
              err.rows[0].email
            } exists already`,
                    });
                }
                return res.status(400).json({
                    message: 'Could not save user',
                });
            });
    }



    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static loginUser(req, res) {
        const {
            email,
            password
        } = req.body;
        UserService
            .validateUserLogin(email, password)
            .then(data => res.status(200).json({
                status: 200,
                data,
                message: 'Authentication Successful',
            }))
            .catch(err => res.status(401).json({
                status: 401,
                responseMessage: err,
            }));
    }





    /**
     * View all users
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static viewAllUsers(req, res) {
        UserService
            .viewAllCreated()
            .then(response => res.status(200).json({
                status: 200,
                message: 'Successfully fetched all users',
                data: response,
            }))
            .catch((err) => {
                if (err.responseMessage === 'users Array Empty') {
                    return res.status(404).json({
                        status: 404,
                        message: 'Empty users Array',
                        data: [],
                    });
                }
                return res.status(400).json({
                    status: 400,
                    message: 'Could not fetch all users',
                });
            });
    }
}

export default UserController