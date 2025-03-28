import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		user: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'User', 
			required: true 
		},
		car: { 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Car', 
			required: true 
		},
		rating: { 
			type: Number, 
			min: 1, 
			max: 5, 
			required: true 
		},
		comment: { 
			type: String 
		},
	},
	{ timestamps: true }
);

reviewSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

reviewSchema.set('toJSON', {
	virtuals: true,
});

export default mongoose.model('Review', reviewSchema);
