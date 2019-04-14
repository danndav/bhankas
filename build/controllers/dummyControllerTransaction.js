"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _account = _interopRequireDefault(require("../utilities/dummyData/account"));

var _transaction = _interopRequireDefault(require("../utilities/dummyData/transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @exports
 * @class DummyControllerTransaction
 */
var DummyControllerTransaction =
/*#__PURE__*/
function () {
  function DummyControllerTransaction() {
    _classCallCheck(this, DummyControllerTransaction);
  }

  _createClass(DummyControllerTransaction, null, [{
    key: "getAllTransactions",

    /**
       * @description get all transactions
       * @staticmethod getAllTransactions
       * @param  {object} req - req object
       * @param {object} res - Response object
       * @return {json} res.json
       */
    value: function getAllTransactions(req, res) {
      res.status(200).json({
        message: 'Successfully fetched all Transactions',
        status: 200,
        data: _transaction["default"]
      });
    }
    /**
       * @description credit an account
       * @staticmethod\ CreditAccount
       * @param  {object} req - req object
       * @param {object} res - Response object
       * @return {json} res.json
       */

  }, {
    key: "CreditAccount",
    value: function CreditAccount(req, res) {
      var accountNumber = req.params.accountNumber;

      var existingAccount = _account["default"].find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if (existingAccount) {
        var _req$body = req.body,
            amount = _req$body.amount,
            cachier = _req$body.cachier;
        var transactionAdded = {
          id: _transaction["default"].length + 1,
          createdOn: Date.now(),
          type: 'credit',
          accountNumber: accountNumber,
          cachier: cachier,
          amount: amount,
          oldBalance: existingAccount.balance,
          newBalance: existingAccount.balance + amount
        };

        _transaction["default"].push(transactionAdded);

        return res.status(201).json({
          status: 201,
          data: _objectSpread({}, transactionAdded)
        });
      }

      return res.status(404).json({
        status: 404,
        error: 'This account  does not exist'
      });
    }
    /**
       * @description debit an account
       * @staticmethod DebitAccount
       * @param  {object} req - req object
       * @param {object} res - Response object
       * @return {json} res.json
       */

  }, {
    key: "DebitAccount",
    value: function DebitAccount(req, res) {
      var accountNumber = req.params.accountNumber;

      var existingAccount = _account["default"].find(function (account) {
        return account.accountNumber === parseInt(accountNumber, 10);
      });

      if (existingAccount) {
        var _req$body2 = req.body,
            amount = _req$body2.amount,
            cachier = _req$body2.cachier;
        var oldBalance = existingAccount.balance;

        if (amount > oldBalance) {
          return res.status(400).json({
            status: 400,
            error: 'insufficent account balance'
          });
        }

        var transactionAdded = {
          id: _transaction["default"].length + 1,
          createdOn: Date.now(),
          type: 'debit',
          accountNumber: accountNumber,
          cachier: cachier,
          amount: amount,
          oldBalance: existingAccount.balance,
          newBalance: existingAccount.balance - amount
        };

        _transaction["default"].push(transactionAdded);

        return res.status(201).json({
          status: 201,
          data: _objectSpread({}, transactionAdded)
        });
      }

      return res.status(400).json({
        status: 400,
        error: 'This account  does not exist'
      });
    }
  }]);

  return DummyControllerTransaction;
}();

var _default = DummyControllerTransaction;
exports["default"] = _default;
//# sourceMappingURL=dummyControllerTransaction.js.map