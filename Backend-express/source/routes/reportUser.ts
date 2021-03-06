import express from 'express';
import controller from '../controllers/reportUser';
import verifyAdmin from "../middleware/verifyAdmin";


const router = express.Router();

router.post('/reportUsers', controller.createReportUser);
router.get('/reportUsers', controller.getAllReportUsers);
router.delete('/reportUsers/:id', controller.deleteReportUser);
router.put('/reportUsers/:id', controller.updateReportUser);

export = router;
