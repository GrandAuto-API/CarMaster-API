import express from 'express'
import reviewController from '../controllers/reviewController.js'
import { validateReview } from '../validators/reviewValidator.js'
const reviewRoute = express.Router()

reviewRoute.get('/', reviewController.getAllReviews)
reviewRoute.post('/', validateReview,reviewController.createReview)
reviewRoute.get('/:id', reviewController.getReviewById)
reviewRoute.patch('/:id', validateReview ,reviewController.updateReview)
reviewRoute.delete('/:id', reviewController.deleteReview)

export default reviewRoute
