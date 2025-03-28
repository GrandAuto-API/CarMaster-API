import { Router } from 'express'
import { userRoute } from './user.route.js'
import brandRoute from './brandRoutes.js';
import paymentRoute from './paymentRoutes.js'
import reviewRoute from './reviewRoutes.js'
import orderRoutes from './orderRoutes.js'

const router = Router()
router.use('/payment', paymentRoute)
router.use('/review', reviewRoute)
router.use('/users', userRoute)
router.use('/orders', orderRoutes)
router.use('/brand', brandRoute)

export { router }
