import express from 'express';
import { getAllReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { validateReview } from '../validators/reviewValidator.js'; // Import the validator

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', validateReview, createReview); 
router.put('/:id', validateReview, updateReview); 
router.delete('/:id', deleteReview);

export default router;
