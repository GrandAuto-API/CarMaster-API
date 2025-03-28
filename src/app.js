const express = require('express')
const { router } = require('./routes')
require('dotenv').config()

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extends: true }))

app.use('/api', router)

app.all('/*', (req, res) => {
	req
		.status(404)
		.json({ message: `Given ${req.url} with method ${req.method} not found` })
})

module.exports = { app }
