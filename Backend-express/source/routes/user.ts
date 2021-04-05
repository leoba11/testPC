import express from 'express';
import controller from '../controllers/user';
import extractJWT from "../middleware/extractJWT";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/validate', verifyAdmin, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);

export = router;
