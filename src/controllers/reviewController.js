import Review from '../models/Review.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

const getAllReviews = async (req, res) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Review.find().populate('user car')
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const reviews = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json(reviews)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const createReview = async (req, res) => {
	try {
		const review = await Review.create(req.body)
		res.status(201).json(review)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateReview = async (req, res) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		res.json(review)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteReview = async (req, res) => {
	try {
		await Review.findByIdAndDelete(req.params.id)
		res.json({ message: 'Review deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export { createReview, deleteReview, getAllReviews, updateReview }
