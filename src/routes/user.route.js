import { Router } from 'express'
import { getAllUsers, login, register } from '../controllers/user.controller.js'

const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/register', register)
userRoute.post('/login', login)

export default userRoute
