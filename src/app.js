import express from 'express'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { ErrorHandlerMiddleware } from './middleware/errorHandler.middleware.js'
import { router } from './routes/index.js'
import pageRoute from './routes/page.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(methodOverride('_method'))

if (process.env.NODE_ENV?.trim() == 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/image', express.static(path.join(__dirname, 'src', 'images')))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use('/', pageRoute)
app.use('/', router)

app.all('/*', (req, res, next) => {
	res.render('404')
})

app.use(ErrorHandlerMiddleware)

export { app }
