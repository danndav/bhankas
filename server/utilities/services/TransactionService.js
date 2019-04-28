import queryProvider from '../../utilities/queries';


/**export default UserService;
 * @exports
 * @class accountService
 */
class TransactionService {

    /**
     * save new account
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
    static CreditTransaction(userid, accountnumber, amount) {
        return new Promise((resolve, reject) => {
            queryProvider.findaccountQuery(accountnumber)
                .then((res) => {
                    // console.log(res.rows[0])
                    const {
                        balance
                    } = res.rows[0];
                    const type = 'credit'
                    const oldbalance = balance;
                    const newbalances = Number(oldbalance) + Number(amount);
                    const newbalance = parseFloat(newbalances, 10).toFixed(2);
                    queryProvider
                        .creditTransactionQuery(newbalance, oldbalance, userid, accountnumber, amount, type)
                        .then((res) => {

                            const data = {
                                transactionId: res.id,
                                accountnumber: res.accountnumber,
                                amount: res.amount,
                                cashier: res.cashier,
                                transactionType: res.type,
                                accountBalance: res.newbalance,
                            }
                            resolve(data)


                        })
                        .catch((err) => {
                            reject(err);

                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * save new account
     * @staticmethod
     * @param  {string} body - Request object
     * @param  {string} userid - Request object
     * @return {string} res
     */
    static DebitTransaction(userid, accountnumber, amount) {
        return new Promise((resolve, reject) => {
            queryProvider.findaccountQuery(accountnumber)
                .then((res) => {

                    const {
                        balance
                    } = res.rows[0];
                    const type = 'Debit'

                    if (Number(amount) > Number(balance)) {
                        return res.status(400).json({
                            message: 'insufficient balance ',
                        });
                    }

                    const oldbalance = balance;
                    const newbalances = Number(oldbalance) - Number(amount);

                    const newbalance = parseFloat(newbalances, 10).toFixed(2);


                    queryProvider
                        .creditTransactionQuery(newbalance, oldbalance, userid, accountnumber, amount, type)
                        .then((res) => {

                            const data = {
                                transactionId: res.id,
                                accountnumber: res.accountnumber,
                                amount: res.amount,
                                cashier: res.cashier,
                                transactionType: res.type,
                                accountBalance: res.newbalance,
                            }
                            resolve(data)
                        })
                        .catch((err) => {
                            reject(err);

                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * view all users transactions
     * @staticmethod
     * @return {string} res
     */
    static viewAllTransaction(accountnumber) {
        return new Promise((resolve, reject) => {
            queryProvider
                .findUserTransaction(accountnumber)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    }



}

export default TransactionService;