"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../utilities/dummyData/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class DummyControllerAccount￼1
 */
var DummyControllerAcccount =
/*#__PURE__*/
function () {
  function DummyControllerAcccount() {
    _classCallCheck(this, DummyControllerAcccount);
  }

  _createClass(DummyControllerAcccount, null, [{
    key: "getAllAccounts",

    /**
     * @description get all accounts
     * @staticmethod getAllAccounts
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    value: function getAllAccounts(req, res) {
      res.status(200).json({
        status: 200,
        data: _account["default"],
        message: 'Successfully fetched all accounts'
      });
    }
    /**
     * @description Create Bank Account
     * @staticmethod CreateBankAccount
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "CreateBankAccounts",
    value: function CreateBankAccounts(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          type = _req$body.type,
          balance = _req$body.balance;
      var usersAccount = {
        id: _account["default"].length + 1,
        accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
        firstName: firstName,
        lastName: lastName,
        email: email,
        type: type,
        status: 'active',
        balance: parseFloat(balance, 10).toFixed(2)
      };

      _account["default"].push(usersAccount);

      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: usersAccount.accountNumber,
          firstName: usersAccount.firstName,
          lastName: usersAccount.lastName,
          email: usersAccount.email,
          type: usersAccount.type,
          openingBalance: usersAccount.balance
        },
        message: 'Account created successfully'
      });
    }
    /**
     * @description update an account using patch verb method
     * @staticmethod PatchBankAccount update an account
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "PatchBankAccounts",
    value: function PatchBankAccounts(req, res) {
      var accountNumber = req.params.accountNumber;
      console.log(accountNumber);

      var existingAccount = _account["default"].find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if (existingAccount) {
        var status = req.body.status;
        existingAccount.status = status;
        return res.status(201).json({
          status: 201,
          data: {
            accountNumber: accountNumber,
            status: status
          },
          message: 'account status changed  successfull'
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'This account  does not exist'
      });
    }
    /**
     * @description delete an existing account
     * @staticmethod DeleteAccount
     * @param  {object} req - req object
     * @param {object} res - Response object
     * @return {json} res.json
     */

  }, {
    key: "DeleteAccount",
    value: function DeleteAccount(req, res) {
      var accountNumber = req.params.accountNumber;
      console.log(accountNumber);

      var existingAccount = _account["default"].find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if (existingAccount) {
        var accountdelete = _account["default"].indexOf(existingAccount);

        _account["default"].splice(accountdelete, 1);

        return res.status(201).json({
          status: 201,
          message: 'Account Succesfully deleted'
        });
      }

      return res.status(400).json({
        status: 400,
        message: 'This account  does not exist'
      });
    }
  }]);

  return DummyControllerAcccount;
}();

var _default = DummyControllerAcccount;
exports["default"] = _default;
//# sourceMappingURL=dummyControllerAccount.js.map