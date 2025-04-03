import Order from '../models/Order.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

const getAllOrders = async (req, res) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Order.find().populate('user car')
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const orders = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json(orders)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const createOrder = async (req, res) => {
	try {
		const order = await Order.create(req.body)
		res.status(201).json(order)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateOrder = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		res.json(order)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id)
		res.json({ message: 'Order deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export { createOrder, deleteOrder, getAllOrders, updateOrder }
