import { Router } from 'express'
import { carRoute } from './car.route.js'
import { userRoute } from './user.route.js'

const router = Router()

router.use('/auth', userRoute)
router.use('/cars', carRoute)

export { router }
