import express from 'express'
import reviewController from '../controllers/reviewController.js'
const reviewRoute = express.Router()

reviewRoute.get('/', reviewController.getAllReviews)
reviewRoute.post('/', reviewController.createReview)
reviewRoute.get('/:id', reviewController.getReviewById)
reviewRoute.patch('/:id', reviewController.updateReview)
reviewRoute.delete('/:id', reviewController.deleteReview)

export default reviewRoute
