const { app } = require('./app')
const { APP_PORT, connectDB } = require('./config/db')

connectDB()
	.then(data => console.log(data))
	.catch(err => {
		console.log(err)
	})

app.listen(APP_PORT, () => {
	console.log(`Server ${APP_PORT} da ishlamoqda`)
})
