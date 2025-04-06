import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		car: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Car',
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'completed', 'cancelled'],
			default: 'pending',
		},
	},
	{ timestamps: true, versionKey: false }
)

orderSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

orderSchema.set('toJSON', {
	virtuals: true,
})

export default mongoose.model('Order', orderSchema)
