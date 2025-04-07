import express from 'express'
import paymentController from '../controllers/paymentController.js'
import { validatePayment } from '../validators/paymentValidator.js'
const paymentRoute = express.Router()

paymentRoute.get('/', paymentController.getAllPayments)
paymentRoute.post('/', validatePayment,paymentController.createPayment)
paymentRoute.get('/:id', paymentController.getPaymentById)
paymentRoute.patch('/:id',validatePayment, paymentController.updatePayment)
paymentRoute.delete('/:id', paymentController.deletePayment)

export default paymentRoute
