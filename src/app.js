import { config } from 'dotenv'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'url' // fileURLToPath import qilish
import { ErrorHandlerMiddleware } from './middleware/errorHandler.middleware.js'
import { router } from './routes/index.js'
import pageRoute from './routes/page.routes.js'

// __dirname ni import.meta.url bilan olish
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Statik fayllar uchun to'g'ri yo'lni ko'rsatish
app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views')) // Endi bu ishlaydi


app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views')) // views papkasini sozlash

app.use('/', pageRoute)
app.use('/', router)

app.use("/uploads", express.static(join(process.cwd(), "uploads")));

app.use('/api', router)

app.all('/*', (req, res, next) => {
	res.render('404') // 404 sahifasi
})

app.use(ErrorHandlerMiddleware)

export { app }
