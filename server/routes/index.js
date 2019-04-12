import {
  Router,
} from 'express';
import DummyControllerUser from '../controllers/dummyContollerUser';
import DummyControllerAccount from '../controllers/dummyControllerAccount';
import DummyControllerTransaction from '../controllers/dummyControllerTransaction';
import DummyMiddleware from '../middlewares/DummyMiddlewares';


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
  accountDummyData,
} = DummyMiddleware;

const router = Router();

// Dummy Routes
router.get('/getUsers/', getAllUsers);
router.get('/getAccounts/', getAllAccounts);
router.get('/getTransactions/', getAllTransactions);

router.post('/auth/signup', userDummyData, userSignup);
router.post('/auth/signin/', userLogin);
router.post('/createAccounts/', accountDummyData, CreateBankAccounts);
router.patch('/getAccounts/:accountNumber', PatchBankAccounts);
router.delete('/deleteAccount/:accountNumber', DeleteAccount);
router.delete('/deleteAccount/:accountNumber', DeleteAccount);
router.post('/transactions/:accountNumber/credit', CreditAccount);
router.post('/transactions/:accountNumber/debit', DebitAccount);


export default router;
