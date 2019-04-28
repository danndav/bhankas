import {
  Router,
} from 'express';


import Middleware from '../middlewares/userMiddleware';
import Authorization from '../middlewares/Authentication';

// database challenge
import UserController from '../controllers/userController';
import AccountController from '../controllers/accountsControllers';
import TransactionController from '../controllers/transactionsControllers';

const {
  verifyUser,
  verifyStaff,
  verifyAdmin,
} = Authorization;

const {
  CreditAccount,
  DebitAccount,
} = TransactionController;


const {
  userLoginValidate,
  userSignupValidate,
  createAccountValid,
  createTransactValid
} = Middleware;


const {
  createUser,
  loginUser,
  viewAllUsers,
  fetchAllAccountByEmail,
} = UserController;

const {
  createAccount,
  updateaccountStatus,
  DeleteAccountNumber,
  fetchTransactionsByAccount,
  fetchTransactionsByID,
  viewAccountdatails,
  viewAllAccounts,
} = AccountController;


const router = Router();


// User Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);
router.get('/users/', verifyStaff, verifyAdmin, viewAllUsers);
router.get('/users/:email', verifyAdmin, verifyStaff, fetchAllAccountByEmail);

// Accounts Routes
router.get('/accounts/:accountNumber/', verifyStaff, verifyAdmin, viewAccountdatails);
router.get('/accounts/', verifyAdmin, verifyStaff, viewAllAccounts);
router.post('/accounts/', verifyUser, verifyStaff, verifyAdmin, createAccountValid, createAccount);
router.patch('/accounts/:accountNumber', verifyAdmin, updateaccountStatus);
router.delete('/accounts/:accountNumber', verifyAdmin, DeleteAccountNumber);

// Transactions Routes
router.post('/transactions/:accountNumber([0-9]+)/credit', verifyStaff, createTransactValid, CreditAccount);
router.post('/transactions/:accountNumber([0-9]+)/debit', verifyStaff, createTransactValid, DebitAccount);
router.get('/accounts/:accountNumber([0-9]+)/transactions', verifyUser, fetchTransactionsByAccount);
router.get('/transactions/:id([0-9]+)', verifyAdmin, verifyStaff, fetchTransactionsByID);

// router.get('/accounts/', verifyUser, viewActiveStatus);
export default router;