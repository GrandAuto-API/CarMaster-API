import { app } from './app.js'
import { APP_PORT, connectDB } from './config/db.js'

connectDB()
	.then(data => console.log(data))
	.catch(err => {
		console.log(err)
	})

app.listen(APP_PORT, () => {
	console.log(`Server ${APP_PORT} da ishlamoqda`)
})

process.on('unhandledRejection', (reason, promise) => {
	server.closeAllConnections()
	server.close(() => {
		process.exit(1)
	})
})

process.on('uncaughtException', err => {
	process.exit(1)
})
