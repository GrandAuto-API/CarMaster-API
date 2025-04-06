import express from 'express'
import paymentController from '../controllers/paymentController.js'
const paymentRoute = express.Router()

paymentRoute.get('/', paymentController.getAllPayments)
paymentRoute.post('/', paymentController.createPayment)
paymentRoute.get('/:id', paymentController.getPaymentById)
paymentRoute.patch('/:id', paymentController.updatePayment)
paymentRoute.delete('/:id', paymentController.deletePayment)

export default paymentRoute
