import { Router } from 'express'
import categoryController from '../controllers/category.controller.js'
import { validateCategory } from '../validators/categoriy.validators.js'
const categoryRoute = Router()

categoryRoute.get('/', categoryController.getAllCategories)
categoryRoute.post('/', validateCategory,categoryController.createCategory)
categoryRoute.get('/:id', categoryController.getCategoryById)
categoryRoute.patch('/:id', validateCategory,categoryController.updateCategory)
categoryRoute.delete('/:id', categoryController.deleteCategory)

export default categoryRoute
