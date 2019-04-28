import AccountService from '../utilities/services/AccountService';

/**
 * @exports
 * @class AccountController
 */
class AccountController {
    /**
     * Creates a new Account
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static createAccount(req, res) {
        const userId = req.userData.id;
        const userEmail = req.userData.email;
        const userName = req.userData.firstname;
        const userLName = req.userData.lastname;


        AccountService
            .saveAccount(req.body, userId, userEmail, userName, userLName)


            .then(data => res.status(201).json({
                status: 201,
                data,
                message: 'New Account created successfully',
            }))
            .catch(() => res.status(400).json({
                status: 400,
                message: 'Could not create Account',
            }));

    }


    /**
     * Update account Destination
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static updateaccountStatus(req, res) {
        const {
            accountNumber
        } = req.params;
        const status = req.body;

        AccountService
            .updateStatus(accountNumber, status)
            .then(response => res.status(200).json({
                status: 200,
                message: 'account Status Updated Successfully',
                data: response,
            }))
            .catch(err => res.status(404).json({
                status: 404,
                error: 'This account does not exist',
            }));
    }


    /**
     * Delete account Destination
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static DeleteAccountNumber(req, res) {
        const {
            accountNumber
        } = req.params;

        AccountService
            .DeleteAccount(accountNumber)
            .then(response => res.status(200).json({
                status: 200,
                message: 'Account Number deleted Successfully',
                data: response,
            }))
            .catch(err => res.status(404).json({
                status: 404,
                error: 'This account  does not exist',
            }));
    }

    /**
     * fetch transaction
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static fetchTransactionsByAccount(req, res) {
        const {
            accountNumber
        } = req.params;

        AccountService
            .TransactionByAccount(accountNumber)
            .then(response => res.status(200).json({
                status: 200,
                message: 'Transactions fetched  Successfully',
                data: response.rows,
            }))
            .catch(err => res.status(400).json({
                status: 400,
                error: 'Transactions could not be fetched',

            }));
    }

    /**
     * fetch transaction details
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static fetchTransactionsByID(req, res) {
        const {
            id
        } = req.params;


        AccountService
            .TransactionById(id)
            .then(response => res.status(200).json({

                status: 200,
                message: 'Transaction Detail fetched Successfully',
                data: response.rows,
            }))
            .catch(err => res.status(400).json({
                status: 400,
                error: 'Transactions details could not be fetched',

            }));
    }

    /**
     * fetch specific Account
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static viewAccountdatails(req, res) {
        const {
            accountNumber
        } = req.params;


        AccountService
            .AccounByNumber(accountNumber)
            .then(response => res.status(200).json({

                status: 200,
                message: 'Account Details fetched Successfully',
                data: response.rows,
            }))
            .catch(err => res.status(400).json({
                status: 400,
                error: 'Account details could not be fetched',

            }));
    }


    /**
     * fetch specific Account
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static viewAllAccounts(req, res) {
        const currentStatus = req.query.status;
        console.log(currentStatus);
        if (currentStatus) {
            if (currentStatus && !(['dormant', 'active'].includes(currentStatus))) {
                return res.status(400).json({
                    status: 400,
                    message: ` ${currentStatus} status not valid`,
                });
            }
            AccountService
                .AccounByStatus(currentStatus)
                .then(response => res.status(200).json({
                    status: 200,
                    message: `All ${currentStatus} status Successfully fetched`,
                    data: response.rows,
                }));
            // .catch(err => res.status(400).json({
            //     status: 400,
            //     error: 'status could not be fetched',

            // }));
        } else {
            AccountService
                .viewAllAccount()
                .then(response => res.status(200).json({
                    status: 200,
                    message: 'Successfully fetched all Accounts',
                    data: response,
                }))
                .catch((err) => {
                    // if (err.responseMessage === 'users Array Empty') {
                    //     return res.status(404).json({
                    //         status: 404,
                    //         message: 'Empty users Array',
                    //         data: [],
                    //     });
                    // }
                    // return res.status(400).json({
                    //     status: 400,
                    //     message: 'Could not fetch  accounts',
                    // });
                });
        }
    }
}

export default AccountController;