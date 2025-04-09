import express from 'express'
import brandController from '../controllers/brandController.js'
import { validateBrand } from '../validators/brandValidator.js'
const router = express.Router()

router.get('/', brandController.getAllBrands)
router.post('/', validateBrand,brandController.createBrand)
router.get('/:id', brandController.getBrandById)
router.patch('/:id', validateBrand,brandController.updateBrand)
router.delete('/:id', brandController.deleteBrand)

export default router
