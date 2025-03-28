import express from 'express';
import { getAllPayments, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';
import { validatePayment } from '../validators/paymentValidator.js'; 
const router = express.Router();

router.get('/', getAllPayments);
router.post('/', validatePayment, createPayment); 
router.put('/:id', validatePayment, updatePayment); 
router.delete('/:id', deletePayment);

export default router;
