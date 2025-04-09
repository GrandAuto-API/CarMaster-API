import express from 'express'
import orderController from '../controllers/orderController.js'
import { validateOrder } from '../validators/orderValidator.js'
const orderRoute = express.Router()

orderRoute.get('/', orderController.getAllOrders)
orderRoute.post('/', validateOrder,orderController.createOrder)
orderRoute.get('/:id', orderController.getOrderById)
orderRoute.patch('/:id',validateOrder ,orderController.updateOrder)
orderRoute.delete('/:id', orderController.deleteOrder)

export default orderRoute
