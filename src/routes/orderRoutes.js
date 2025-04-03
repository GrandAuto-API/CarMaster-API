import express from 'express';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { validateOrder } from '../validators/orderValidator.js';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', validateOrder, createOrder); 
router.put('/:id', validateOrder, updateOrder);
router.delete('/:id', deleteOrder);

export default router;
