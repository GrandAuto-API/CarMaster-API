const { Router } = require('express')
const { userRoute } = require('./user.route')

const router = Router()

router.use('/users', userRoute)

module.exports = { router }
