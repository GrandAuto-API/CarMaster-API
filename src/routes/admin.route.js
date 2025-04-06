import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'
const adminRoute = Router()

adminRoute.get('/', adminController.getAllAdmin)
adminRoute.post('/', adminController.createAdmin)
adminRoute.get('/:id', adminController.getAdminById)
adminRoute.patch('/:id', adminController.updateAdmin)
adminRoute.delete('/:id', adminController.deleteAdmin)

export default adminRoute
