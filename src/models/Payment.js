import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ['image', 'video', 'file'],
			required: true,
			default: 'image',
		},
	},
	{ timestamps: true, versionKey: false }
)

paymentSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

paymentSchema.set('toJSON', {
	virtuals: true,
})

export default mongoose.model('Payment', paymentSchema)
