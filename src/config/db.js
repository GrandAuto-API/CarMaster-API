import { config } from 'dotenv'
import mongoose from 'mongoose'

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

export { APP_PORT, connectDB }
