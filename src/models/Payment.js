import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
	{
		order: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Order', 
			required: true 
		},
		amount: { 
			type: Number, 
			required: true 
		},
		status: { 
			type: String, 
			enum: ['pending', 'paid', 'failed'], 
			default: 'pending' 
		},
		method: { 
			type: String, 
			enum: ['card', 'paypal', 'bank_transfer'], 
			required: true 
		},
	},
	{ timestamps: true }
);

paymentSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

paymentSchema.set('toJSON', {
	virtuals: true,
});

export default mongoose.model('Payment', paymentSchema);
