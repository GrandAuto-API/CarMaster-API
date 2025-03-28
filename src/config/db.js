const { config } = require('dotenv')
const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		return "MongoDB'ga muvaffaqiyatli ulandi ✅"
	} catch (error) {
		console.error("MongoDB'ga ulanishda hatolik ❌")
		process.exit(1)
	}
}

config()
const APP_PORT = parseInt(process.env.PORT, 10) || 5000

module.exports = { connectDB, APP_PORT }
