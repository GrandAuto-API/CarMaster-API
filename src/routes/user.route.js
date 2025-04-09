import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import { validateUser } from '../validators/user.schema.js'
const userRoute = Router()

userRoute.get('/', userController.getAllUsers)
userRoute.post('/register', validateUser,userController.register)
userRoute.post('/login', validateUser,userController.login)
userRoute.patch('/:id', validateUser, userController.updateUser)

export default userRoute
