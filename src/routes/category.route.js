import { Router } from 'express'
import categoryController from '../controllers/category.controller.js'
const categoryRoute = Router()

categoryRoute.get('/', categoryController.getAllCategories)
categoryRoute.post('/', categoryController.createCategory)
categoryRoute.get('/:id', categoryController.getCategoryById)
categoryRoute.patch('/:id', categoryController.updateCategory)
categoryRoute.delete('/:id', categoryController.deleteCategory)

export default categoryRoute
