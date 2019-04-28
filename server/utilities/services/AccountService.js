import queryProvider from '../../utilities/queries';


/**export default UserService;
 * @exports
 * @class accountService
 */
class AccountService {

    /**
     * save new account
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
    static saveAccount(body, userid, useremail, userfname, userlname) {
        return new Promise((resolve, reject) => {
            queryProvider
                .saveAccountQuery(body, userid, useremail)
                .then((res) => {

                    const data = {
                        accountNumber: res.rows[0].accountnumber,
                        firstName: userfname,
                        lastName: userlname,
                        email: useremail,
                        type: res.rows[0].type,
                        createdOn: res.rows[0].createdon,
                        openingBalance: res.rows[0].balance
                    };

                    console.log(data)
                    console.log("hello there", res)

                    resolve(data);
                })
                .catch(err => reject(err => (console.log(err))));
        });
    }


    /**
     * update account status
     * @staticmethod
     * @param  {string} accountId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static updateStatus(accountNumber, body) {
        return new Promise((resolve, reject) => {
            queryProvider
                .updateAccountStatusQuery(accountNumber, body)
                .then((res) => {
                    console.log(res.rows)
                    const data = {
                        accountNumber: res.rows[0].accountnumber,
                        status: res.rows[0].status
                    };
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }


    /**
     * update account status
     * @staticmethod
     * @param  {string} accountId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */

    static DeleteAccount(accountNumber) {
        return new Promise((resolve, reject) => {
            queryProvider
                .deleteAccountQuery(accountNumber)
                .then((res) => {
                    console.log(res.rows)

                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }


    /**
     * update account status
     * @staticmethod
     * @param  {string} accountId - Request object
     * @param  {string} body - Request object
     * @param  {string} host - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static TransactionByAccount(accountNumber) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findTransactionByAccount(accountNumber)
                .then((res) => {

                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * update account status
     * @staticmethod
     * @param  {string} transactionId - Request object
     * @param  {string} body - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static TransactionById(transactionid) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findTransactionById(transactionid)
                .then((res) => {

                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * update account status
     * @staticmethod
     * @param  {string} transactionId - Request object
     * @param  {string} body - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static AccounByNumber(accountNumber) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findAccountByNumber(accountNumber)
                .then((res) => {

                    resolve(res);
                })
                .catch(err => reject(err));
        });
    }


    /**
     * view all users created
     * @staticmethod
     * @return {string} res
     */
    static viewAllAccount() {
        return new Promise((resolve, reject) => {
            queryProvider
                .findAllAccountsQuery()
                .then(response => resolve(response.rows))
                .catch(err => reject(err));
        });
    }

    /**
     * update account status
     * @staticmethod
     * @param  {string} transactionId - Request object
     * @param  {string} body - Request object
     * @param  {string} user_id - Request object
     * @return {string} res
     */
    static AccounByStatus(currentstatus) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findAccountByStatus(currentstatus)
                .then((res) => {

                    resolve(res);
                })
                .catch(err => reject(err));

        });
    }

}

export default AccountService;