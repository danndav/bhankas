import bcrypt from 'bcrypt';
import db from './database/connect';

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
     * Find account fromdatabase
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
  static findaccountQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE accountnumber = '${accountnumber}'`;

      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            err.responseMessage = 'Account does not exist';

            reject(err);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding All User accounts';
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
      isAdmin,
    } = body;

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;


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
            err.responseMessage = 'Users Array Empty';
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


  /**
     * Find all user
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
  static findUserTransaction(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM transactions WHERE accountnumber = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.responseMessage = 'Users Array Empty';
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

  /**
     * Save Account Query
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
  static saveAccountQuery(body, userid, useremail) {
    const {
      type,
      balance,
    } = body;

    if (type && !(['savings', 'current'].includes(type))) {
      return res.status(400).json({
        status: 400,
        message: ` ${type} type not valid  `,
      });
    }

    const openingbalance = parseFloat(balance, 10).toFixed(2);


    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;

    const accountnumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    return new Promise((resolve, reject) => {
      const queryBody = `
            INSERT INTO accounts(accountnumber, owner,owneremail, createdon,  type,  balance)
  VALUES (${accountnumber},(SELECT id FROM users WHERE id= ${userid}),(SELECT email FROM users WHERE email = '${useremail}'), '${createdAt}', '${type}',${openingbalance}) returning * `;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            resolve(result);
          } else if (result.rowCount === 0) {
            const response = 'Could Not Save User';
            reject(response);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  /**
     * Findby by AccountID
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findByAccountIdQuery(id) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE id = '${id}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'Account does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          const error = 'Error Finding User';
          reject(error);
        });
    });
  }


  /**
     * Update Account Status Query
     * @staticmethod
     * @param  {string} Accountid - Request object
     * @param  {string} body - Request object
     * @return {string} res
     */
  static updateAccountStatusQuery(accountnumber, body) {
    const {
      status,
    } = body;
    return new Promise((resolve, reject) => {
      const queryBody = `UPDATE accounts SET status = '${status}' WHERE accountnumber = '${accountnumber}' returning * `;
      db.query(queryBody)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'Account does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          const error = 'Error Finding User';
          reject(error);
        });
    });
  }

  /**
     * Delete user by email
     * @staticmethod
     * @param  {string} email - Request object
     * @return {string} res
     */
  static deleteUserByEmailQuery(email) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM users WHERE email = '${email}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'user does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'User Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding User';
          reject(error);
        });
    });
  }


  /**
     * Delete user by account
     * @staticmethod
     * @param  {string} account - Request object
     * @return {string} res
     */
  static deleteAccountQuery(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM accounts WHERE accountnumber = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const message = 'accounts does not exist';
            reject(message);
          } else if (result.rowCount >= 1) {
            const response = 'Accounts Deleted';
            resolve(response);
          }
        })
        .catch((error) => {
          const messager = 'Error Finding Accounts';
          reject(error);
        });
    });
  }


  /**
     * Save Account Query
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
  static creditTransactionQuery(newbalance, oldbalance, userid, accountnumber, amounts, type) {
    const amount = parseFloat(amounts, 10).toFixed(2);
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const createdAt = `${date} ${time}`;

    return new Promise((resolve, reject) => {
      const queryBody = `
                        INSERT INTO transactions(cashier, type,accountnumber, amount,  oldbalance,newbalance,createdon  )
              VALUES ('${userid}','${type}',(SELECT accountnumber FROM accounts WHERE accountnumber= '${accountnumber}'),'${amount}', '${oldbalance}', '${newbalance}','${createdAt}') returning * `;

      const queryUpdate = `UPDATE accounts SET balance = '${newbalance}' WHERE accountnumber = '${accountnumber}'`;

      db.query(queryBody)
        .then((result) => {
          if (result.rowCount >= 1) {
            resolve(result.rows[0]);
          } else if (result.rowCount === 0) {
            const response = 'Could Not log Transaction';
            reject(response);
          }
          db.query(queryUpdate)
            .then((res) => {
              if (res.rowCount >= 1) {
                resolve(res.rows[0]);
              } else if (res.rowCount === 0) {
                const response = 'Could Not Update account Balance';
                reject(response);
              }
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }


  /**
     * Findby by account transaction
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findTransactionByAccount(accountname) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM transactions WHERE accountnumber = '${accountname}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'Account does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((err) => {
          const error = 'Error Finding transactions';
          reject(error);
        });
    });
  }


  /**
     * Findby by account transaction
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findTransactionById(transactionid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM transactions WHERE id = '${transactionid}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'id does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((err) => {
          const error = 'Error Finding id';
          reject(error);
        });
    });
  }


  /**
     * Findby by e=account by email
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findAccountByEmail(useremail) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE owneremail = '${useremail}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'email does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((err) => {
          const error = 'Error Finding id';
          reject(error);
        });
    });
  }

  /**
     * Findby by account transaction
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findAccountByNumber(accountnumber) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE accountnumber = '${accountnumber}'`;
      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'account does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((err) => {
          const error = 'Error Finding accounts';
          reject(error);
        });
    });
  }


  /**
     * Find all user
     * @staticmethod
     * @param  {string} id - Request object
     * @return {string} res
     */
  static findAllAccountsQuery() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM accounts';
      db.query(query)
        .then((result) => {
          if (!(result.rowCount)) {
            err.responseMessage = 'Accounts Array Empty';
            err.responseCode = '01';
            reject(err);
          } else if (result.rowCount) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch(() => {
          err.responseMessage = 'Error Finding All Accounts';
          err.responseCode = '02';
          reject(err);
        });
    });
  }


  /**
     * Findby by account transaction
     * @staticmethod
     * @param  {string} id
     * @return {string} res
     */
  static findAccountByStatus(currentstatus) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts WHERE status = '${currentstatus}'`;

      db.query(query)
        .then((result) => {
          if (result.rowCount === 0) {
            const response = 'account does not exist';
            reject(response);
          } else if (result.rowCount >= 1) {
            obj.rowCount = result.rowCount;
            obj.rows = result.rows;
            resolve(obj);
          }
        })
        .catch((err) => {
          const error = 'Error Finding accounts';
          reject(error);
        });
    });
  }
}

export default queryProvider;
