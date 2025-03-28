import { Router } from 'express'
import { getAllUsers, register } from '../controllers/user.controller.js'

const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/', register)

export { userRoute }
