import { Router } from 'express'
import adminController from '../controllers/admin.controller.js'
import { validateAdmin } from '../validators/admin.schema.js'
const adminRoute = Router()

adminRoute.get('/',adminController.getAllAdmin)
adminRoute.post('/', validateAdmin ,adminController.createAdmin)
adminRoute.get('/:id', adminController.getAdminById)
adminRoute.patch('/:id',validateAdmin ,adminController.updateAdmin)
adminRoute.delete('/:id', adminController.deleteAdmin)

export default adminRoute
