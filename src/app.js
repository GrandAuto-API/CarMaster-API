import { config } from 'dotenv'
import express from 'express'
import { BaseException } from './exception/BaseException.js'
import { router } from './routes/index.js'
const app = express()
config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.all('/*', (req, res, next) => {
	try {
		throw new BaseException(
			`Given ${req.url} with method ${req.method} not found`,
			404
		)
	} catch (error) {
		next(error)
	}
})

export { app }
