import { BaseException } from '../exception/BaseException.js'
import Order from '../models/Order.js'
import checkValidObjectId from '../utils/checkId.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

// Get all orders with pagination and sorting
const getAllOrders = async (req, res, next) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Order.find().populate('user car')
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const orders = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json({ message: 'success', data: orders })
	} catch (error) {
		next(error)
	}
}

// Create order
const createOrder = async (req, res, next) => {
	try {
		const { user, car, status } = req.body
		const order = await Order.create({ user, car, status })
		res.status(201).json(order)
	} catch (error) {
		next(error)
	}
}

// Update order
const updateOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		const { user, car, status } = req.body
		checkValidObjectId(id)

		const order = await Order.findByIdAndUpdate(
			id,
			{ user, car, status },
			{ new: true }
		)
		res.json(order)
	} catch (error) {
		next(error)
	}
}

// Delete order
const deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)

		const order = await Order.findByIdAndDelete(id)
		if (!order) {
			throw new BaseException('Bunday id lik order mavjud emas', 404)
		}

		res.json({ message: 'Order deleted successfully' })
	} catch (error) {
		next(error)
	}
}

export { createOrder, deleteOrder, getAllOrders, updateOrder }
