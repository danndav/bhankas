import {
  Router,
} from 'express';


import UserMiddleware from '../middlewares/userMiddleware';
import Authorization from '../middlewares/Authentication';

//database challenge
import UserController from '../controllers/userController'

const {
  verifyUser,
  verifyStaff,
  verifyAdmin,
} = Authorization;


const {
  userLoginValidate,
  userSignupValidate
} = UserMiddleware;


const {
  createUser,
  loginUser,
  viewAllUsers
} = UserController;


const router = Router();

// // Dummy Routes
// router.get('/users/', getAllUsers);
// router.get('/accounts', getAllAccounts);
// router.get('/transactions/', getAllTransactions);
// router.post('/auth/signup', userDummyData, userSignup);
// router.post('/auth/signin/', userLogin);
// router.post('/accounts/', verifyUser, CreateBankAccounts);
// router.patch('/accounts/:accountNumber', verifyAdmin, PatchBankAccounts);
// router.delete('/accounts/:accountNumber', verifyAdmin, DeleteAccount);
// router.post('/transactions/:accountNumber/credit', verifyStaff, CreditAccount);
// router.post('/transactions/:accountNumber/debit', verifyStaff, DebitAccount);


// Database Routes
router.post('/auth/signup', userSignupValidate, createUser);
router.post('/auth/signin/', userLoginValidate, loginUser);
router.get('/users/', verifyStaff, verifyAdmin, viewAllUsers);

export default router;