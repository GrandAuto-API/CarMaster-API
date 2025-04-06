import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema(
	{
		model: { type: String, required: true },
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Brand',
			required: true,
		},
		year: { type: Number, required: true },
		price: { type: Number, required: true },
		available: { type: Boolean, default: true },
	},
	{ timestamps: true, versionKey: false }
)

export default mongoose.model('Car', CarSchema)
