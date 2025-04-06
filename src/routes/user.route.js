import { Router } from 'express'
import userController from '../controllers/user.controller.js'
const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.post('/register', userController.register)
userRoute.post('/login', userController.login)
userRoute.patch('/:id', userController.updateUser)

export default userRoute
