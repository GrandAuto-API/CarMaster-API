import { BaseException } from '../exception/BaseException.js'
import Payment from '../models/Payment.js'
import checkValidObjectId from '../utils/checkId.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

// Get all payments
const getAllPayments = async (req, res, next) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Payment.find().populate('order')
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const payments = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json(payments)
	} catch (error) {
		next(error)
	}
}

// Create payment
const createPayment = async (req, res, next) => {
	try {
		const { order, amount, status, method } = req.body
		const payment = await Payment.create({ order, amount, status, method })

		if (!payment) {
			throw new BaseException('Payment yaratishda hatolik', 400)
		}
		res.status(201).json(payment)
	} catch (error) {
		next(error)
	}
}

// Update payment
const updatePayment = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)

		const { order, amount, status, method } = req.body
		const payment = await Payment.findByIdAndUpdate(
			id,
			{ order, amount, status, method },
			{ new: true }
		)

		res.json(payment)
	} catch (error) {
		next(error)
	}
}

// Delete payment
const deletePayment = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)

		const deletePayment = await Payment.findByIdAndDelete(id)

		if (!deletePayment) {
			throw new BaseException("Pul otkazish o'chirildi", 404)
		}

		res.json({ message: 'Payment deleted successfully' })
	} catch (error) {
		next(error)
	}
}

export { createPayment, deletePayment, getAllPayments, updatePayment }
