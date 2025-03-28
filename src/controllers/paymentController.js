import Payment from '../models/Payment.js';
import { applyFiltersAndSorting } from '../utils/filterAndSort.js';

const getAllPayments = async (req, res) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query;

		let query = Payment.find().populate('order');
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort);

		const payments = await query.skip((page - 1) * limit).limit(Number(limit));
		res.json(payments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createPayment = async (req, res) => {
	try {
		const payment = await Payment.create(req.body);
		res.status(201).json(payment);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updatePayment = async (req, res) => {
	try {
		const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(payment);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deletePayment = async (req, res) => {
	try {
		await Payment.findByIdAndDelete(req.params.id);
		res.json({ message: 'Payment deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { getAllPayments, createPayment, updatePayment, deletePayment };