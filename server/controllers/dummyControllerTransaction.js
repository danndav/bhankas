import accountStore from '../utilities/dummyData/account';
import transactionStore from '../utilities/dummyData/transaction';


/**
 * @exports
 * @class DummyControllerTransaction
 */
class DummyControllerTransaction {
    /**
     * @description get all transactions
     * @staticmethod getAllTransactions
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static getAllTransactions(req, res) {
        if (!transactionStore) {
            res.status(404).json({
                status: 404,
                error: 'Accounts Empty',
            });
        }
        res.status(200).json({
            message: "Successfully fetched all Transactions",
            status: 200,
            data: transactionStore,
        });
    }


    /**
     * @description credit an account
     * @staticmethod\ CreditAccount
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static CreditAccount(req, res) {
        const {
            accountNumber,
        } = req.params;
        const existingAccount = accountStore.find(account => account.accountNumber === parseInt(accountNumber, 10));

        if (existingAccount) {
            const {
                amount,
                cachier,
            } = req.body;
            const transactionAdded = {
                id: transactionStore.length + 1,
                createdOn: Date.now(),
                type: 'credit',
                accountNumber,
                cachier,
                amount,
                oldBalance: existingAccount.balance,
                newBalance: existingAccount.balance + amount,
            };

            transactionStore.push(transactionAdded);
            return res.status(201).json({
                status: 201,
                data: {
                    ...transactionAdded,
                },
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'This account  does not exist',
        });
    }


    /**
     * @description debit an account
     * @staticmethod DebitAccount
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static DebitAccount(req, res) {
        const {
            accountNumber,
        } = req.params;
        const existingAccount = accountStore.find(account => account.accountNumber === parseInt(accountNumber, 10));

        if (existingAccount) {
            const {
                amount,
                cachier,
            } = req.body;

            const oldBalance = existingAccount.balance;
            if (amount > oldBalance) {
                return res.status(404).json({
                    status: 404,
                    error: 'insufficent account balance',
                });
            }
            const transactionAdded = {
                id: transactionStore.length + 1,
                createdOn: Date.now(),
                type: 'debit',
                accountNumber,
                cachier,
                amount,
                oldBalance: existingAccount.balance,
                newBalance: existingAccount.balance - amount,
            };

            transactionStore.push(transactionAdded);
            return res.status(201).json({
                status: 201,
                data: {
                    ...transactionAdded,
                },
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'This account  does not exist',
        });
    }
}


export default DummyControllerTransaction;