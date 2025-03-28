import express from 'express'
import { router } from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.json())


app.use('/api', router)

app.all('/*', (req, res) => {
	req
		.status(404)
		.json({ message: `Given ${req.url} with method ${req.method} not found` })
})

export { app }
