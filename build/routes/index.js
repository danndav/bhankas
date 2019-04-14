"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _dummyContollerUser = _interopRequireDefault(require("../controllers/dummyContollerUser"));

var _dummyControllerAccount = _interopRequireDefault(require("../controllers/dummyControllerAccount"));

var _dummyControllerTransaction = _interopRequireDefault(require("../controllers/dummyControllerTransaction"));

var _DummyMiddlewares = _interopRequireDefault(require("../middlewares/DummyMiddlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllUsers = _dummyContollerUser["default"].getAllUsers,
    userSignup = _dummyContollerUser["default"].userSignup,
    userLogin = _dummyContollerUser["default"].userLogin;
var getAllAccounts = _dummyControllerAccount["default"].getAllAccounts,
    CreateBankAccounts = _dummyControllerAccount["default"].CreateBankAccounts,
    PatchBankAccounts = _dummyControllerAccount["default"].PatchBankAccounts,
    DeleteAccount = _dummyControllerAccount["default"].DeleteAccount;
var getAllTransactions = _dummyControllerTransaction["default"].getAllTransactions,
    CreditAccount = _dummyControllerTransaction["default"].CreditAccount,
    DebitAccount = _dummyControllerTransaction["default"].DebitAccount;
var userDummyData = _DummyMiddlewares["default"].userDummyData,
    accountDummyData = _DummyMiddlewares["default"].accountDummyData;
var router = (0, _express.Router)(); // Dummy Routes

router.get('/getUsers/', getAllUsers);
router.get('/getAccounts/', getAllAccounts);
router.get('/getTransactions/', getAllTransactions);
router.post('/auth/signup', userDummyData, userSignup);
router.post('/auth/signin/', userLogin);
router.post('/createAccounts/', accountDummyData, CreateBankAccounts);
router.patch('/getAccounts/:accountNumber', PatchBankAccounts);
router["delete"]('/deleteAccount/:accountNumber', DeleteAccount);
router["delete"]('/deleteAccount/:accountNumber', DeleteAccount);
router.post('/transactions/:accountNumber/credit', CreditAccount);
router.post('/transactions/:accountNumber/debit', DebitAccount);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.js.map