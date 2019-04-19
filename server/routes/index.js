import {
  Router,
} from 'express';
import DummyControllerUser from '../controllers/dummyContollerUser';
import DummyControllerAccount from '../controllers/dummyControllerAccount';
import DummyControllerTransaction from '../controllers/dummyControllerTransaction';
import DummyMiddleware from '../middlewares/DummyMiddlewares';
import DummyAuthorization from '../middlewares/DummyAuthentication';

const {
  verifyUser,
  verifyStaff,
  verifyAdmin,
} = DummyAuthorization;


const {
  getAllUsers,
  userSignup,
  userLogin,
} = DummyControllerUser;


const {
  getAllAccounts,
  CreateBankAccounts,
  PatchBankAccounts,
  DeleteAccount,
} = DummyControllerAccount;

const {
  getAllTransactions,
  CreditAccount,
  DebitAccount,
} = DummyControllerTransaction;

const {
  userDummyData,
} = DummyMiddleware;

const router = Router();

// Dummy Routes
router.get('/users/', getAllUsers);
router.get('/accounts', getAllAccounts);
router.get('/transactions/', getAllTransactions);

router.post('/auth/signup', userDummyData, userSignup);
router.post('/auth/signin/', userLogin);
router.post('/accounts/', verifyUser, CreateBankAccounts);
router.patch('/accounts/:accountNumber', verifyAdmin, PatchBankAccounts);
router.delete('/accounts/:accountNumber', verifyAdmin, DeleteAccount);
router.post('/transactions/:accountNumber/credit', verifyStaff, CreditAccount);
router.post('/transactions/:accountNumber/debit', verifyStaff, DebitAccount);


export default router;
