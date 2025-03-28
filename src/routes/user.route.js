const { Router } = require('express')
const { getAllUsers, register } = require('../controllers/user.controller')

const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/', register)

module.exports = { userRoute }
