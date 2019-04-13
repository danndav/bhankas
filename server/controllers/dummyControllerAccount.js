import accountStore from '../utilities/dummyData/account';


/**
 * @exports
 * @class DummyControllerAccount￼1
 */
class DummyControllerAcccount {
  /**
   * @description get all accounts
   * @staticmethod getAllAccounts
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAllAccounts(req, res) {
    res.status(200).json({
      status: 200,
      data: accountStore,
      message: "Successfully fetched all accounts",
    });
  }


  /**
   * @description Create Bank Account
   * @staticmethod CreateBankAccount
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static CreateBankAccounts(req, res) {
    const {
      firstName,
      lastName,
      email,
      type,
      balance,
    } = req.body;

    const usersAccount = {
      id: accountStore.length + 1,
      accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
      firstName,
      lastName,
      email,
      type,
      status: 'active',
      balance: parseFloat(balance, 10).toFixed(2),
    };

    accountStore.push(usersAccount);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: usersAccount.accountNumber,
        firstName: usersAccount.firstName,
        lastName: usersAccount.lastName,
        email: usersAccount.email,
        type: usersAccount.type,
        openingBalance: usersAccount.balance,
      },
      message: "Account created successfully"
    });
  }


  /**
   * @description update an account using patch verb method
   * @staticmethod PatchBankAccount update an account
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static PatchBankAccounts(req, res) {
    const {
      accountNumber,
    } = req.params;
    console.log(accountNumber);
    const existingAccount = accountStore.find(account => account.accountNumber === parseInt(accountNumber, 10));

    if (existingAccount) {
      const {
        status,
      } = req.body;
      existingAccount.status = status;
      return res.status(201).json({
        status: 201,
        data: {
          accountNumber,
          status,
        },
        message: "account status changed  successfull"
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'This account  does not exist',
    });
  }


  /**
   * @description delete an existing account
   * @staticmethod DeleteAccount
   * @param  {object} req - req object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static DeleteAccount(req, res) {
    const {
      accountNumber,
    } = req.params;
    console.log(accountNumber);
    const existingAccount = accountStore.find(account => account.accountNumber === parseInt(accountNumber, 10));

    if (existingAccount) {
      const accountdelete = accountStore.indexOf(existingAccount);
      accountStore.splice(accountdelete, 1);
      return res.status(201).json({
        status: 201,
        message: 'Account Succesfully deleted',

      });
    }
    return res.status(400).json({
      status: 400,
      message: 'This account  does not exist',
    });
  }
}


export default DummyControllerAcccount;