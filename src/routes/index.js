import { Router } from 'express'
import adminRoute from './admin.route.js'
import brandRoute from './brandRoutes.js'
import carRoute from './car.route.js'
import categoryRoute from './category.route.js'
import orderRoutes from './orderRoutes.js'
import paymentRoute from './paymentRoutes.js'
import reviewRoute from './reviewRoutes.js'
import userRoute from './user.route.js'

const router = Router()

router.use('/admin', adminRoute)
router.use('/brand', brandRoute)
router.use('/cars', carRoute)
router.use('/category', categoryRoute)
router.use('/orders', orderRoutes)
router.use('/payment', paymentRoute)
router.use('/review', reviewRoute)
router.use('/auth', userRoute)

export { router }
