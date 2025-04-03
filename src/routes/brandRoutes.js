import express from 'express';
import { getAllBrands, createBrand, updateBrand, deleteBrand } from '../controllers/brandController.js';
import { validateBrand } from '../validators/brandValidator.js'; 

const router = express.Router();

router.get('/', getAllBrands);
router.post('/', validateBrand, createBrand);
router.put('/:id', validateBrand, updateBrand); 
router.delete('/:id', deleteBrand);

export default router;
