import express from 'express'
import orderController from '../controllers/orderController.js'
const orderRoute = express.Router()

orderRoute.get('/', orderController.getAllOrders)
orderRoute.post('/', orderController.createOrder)
orderRoute.get('/:id', orderController.getOrderById)
orderRoute.patch('/:id', orderController.updateOrder)
orderRoute.delete('/:id', orderController.deleteOrder)

export default orderRoute
