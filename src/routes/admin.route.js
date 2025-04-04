import { Router } from 'express'
import {
	createAdmin,
	deleteAdmin,
	getAdminById,
	getAllAdmin,
	updateAdmin,
} from '../controllers/admin.controller.js'

const adminRoute = Router()

adminRoute.get('/', getAllAdmin)
adminRoute.post('/', createAdmin)
adminRoute.get('/:id', getAdminById)
adminRoute.patch('/:id', updateAdmin)
adminRoute.delete('/:id', deleteAdmin)

export default adminRoute
