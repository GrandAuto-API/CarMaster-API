import { Router } from 'express'
import brandRoute from './brandRoutes.js'
import { carRoute } from './car.route.js'
import orderRoutes from './orderRoutes.js'
import paymentRoute from './paymentRoutes.js'
import reviewRoute from './reviewRoutes.js'
import userRoute from './user.route.js'
import adminRoute from './admin.route.js'

const router = Router()

router.use('/auth', userRoute)
router.use('/cars', carRoute)
router.use('/payment', paymentRoute)
router.use('/review', reviewRoute)
router.use('/users', userRoute)
router.use('/orders', orderRoutes)
router.use('/brand', brandRoute)
router.use('/admin', adminRoute)

export { router }
