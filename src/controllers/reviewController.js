import { BaseException } from '../exception/BaseException.js'
import Review from '../models/Review.js'
import checkValidObejctId from '../utils/checkId.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

const getAllReviews = async (req, res, next) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Review.find().populate('user car')
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const reviews = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json(reviews)
	} catch (error) {
		next(error)
	}
}

const getReviewById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObejctId(id)
		const review = await Review.findById(id)

		if (!review) {
			throw new BaseException('Bunday review mavjud emas')
		}

		res.status(200).json({ message: 'success', data: review })
	} catch (error) {
		next(error)
	}
}

const createReview = async (req, res, next) => {
	try {
		const { user, car, rating, comment } = req.body
		const review = await Review.create({ user, car, rating, comment })
		res.status(201).json(review)
	} catch (error) {
		next(error)
	}
}

const updateReview = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObejctId(id)
		const { user, car, rating, comment } = req.body
		const review = await Review.findByIdAndUpdate(
			id,
			{ user, car, rating, comment },
			{
				new: true,
			}
		)

		res.json(review)
	} catch (error) {
		next(error)
	}
}

const deleteReview = async (req, res, next) => {
	try {
		await Review.findByIdAndDelete(req.params.id)
		res.json({ message: 'Review deleted successfully' })
	} catch (error) {
		next(error)
	}
}

export default {
	createReview,
	deleteReview,
	getAllReviews,
	getReviewById,
	updateReview,
}
