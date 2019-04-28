import TransactionService from '../utilities/services/TransactionService';

/**
 * @exports
 * @class AccountController
 */
class TransactionController {
  /**
   * Creates a new Account
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static CreditAccount(req, res) {
    const userId = req.userData.id;

    const {
      accountNumber
    } = req.params;
    const {
      amount,
    } = req.body;


    TransactionService
      .CreditTransaction(userId, accountNumber, amount)


      .then(data => res.status(200).json({
        status: 200,
        data,
        message: 'New Transaction successful',
      }))
      .catch(() => res.status(404).json({
        error: 'This account does not exist',
      }));
  }

  /**
   * Creates a new Account
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static DebitAccount(req, res) {
    const userId = req.userData.id;
    const {
      accountNumber
    } = req.params;
    const {
      amount,
    } = req.body;


    TransactionService
      .DebitTransaction(userId, accountNumber, amount)


      .then(data => res.status(200).json({
        status: 200,
        data,
        message: 'Debit Transaction successful',
      }))
      .catch(() => res.status(404).json({
        error: 'This account does not exist',
      }));
  }
}

export default TransactionController;