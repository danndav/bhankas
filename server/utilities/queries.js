import bcrypt from 'bcrypt';
import db from '../utilities/database/connect';

const saltRounds = 10;
const obj = {};
const err = {};


/**
 * @exports
 * @class queryProvider
 */
class queryProvider {

    /**
     * Find user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
    static findUserByEmailQuery(email) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email = '${email}'`;
            db.query(query)
                .then((result) => {
                    if (!(result.rowCount)) {
                        err.responseMessage = 'user does not exist';
                        err.responseCode = '01';
                        reject(err);
                    } else if (result.rowCount) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(() => {
                    err.responseMessage = 'Error Finding User';
                    err.responseCode = '02';
                    reject(err);
                });
        });
    }

    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static saveUserQuery(body) {
        const {
            email,
            firstName,
            lastName,
            password,
            phoneNumber,
            type,
            isAdmin
        } = body;

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const createdAt = date + ' ' + time;



        return new Promise((resolve, reject) => {
            this.findUserByEmailQuery(email)
                .then((error) => {
                    reject(error);
                })
                .catch(() => {
                    bcrypt.hash(password, saltRounds).then((hash) => {
                        const queryBody = `
                              INSERT INTO users(email,firstname, lastname, password, phonenumber, createdon, type, isadmin)
                              VALUES ( '${email}','${firstName}', '${lastName}', '${hash}', '${phoneNumber}','${createdAt}', '${type}', '${isAdmin}') returning * `;
                        db.query(queryBody)
                            .then((result) => {
                                if (result.rowCount) {
                                    resolve(result.rows);
                                } else if (!(result.rowCount)) {
                                    const response = 'Could Not Save User';
                                    reject(response);
                                }
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    });
                });
        });
    }


    /**
     * Find all user 
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
    static findAllUsersQuery() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            db.query(query)
                .then((result) => {
                    if (!(result.rowCount)) {
                        err.responseMessage = 'Userss Array Empty';
                        err.responseCode = '01';
                        reject(err);
                    } else if (result.rowCount) {
                        obj.rowCount = result.rowCount;
                        obj.rows = result.rows;
                        resolve(obj);
                    }
                })
                .catch(() => {
                    err.responseMessage = 'Error Finding All Users';
                    err.responseCode = '02';
                    reject(err);
                });
        });
    }


}

export default queryProvider;