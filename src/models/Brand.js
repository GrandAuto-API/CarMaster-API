import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
	{
		id: { 
			type: mongoose.Schema.Types.ObjectId, 
			default: () => new mongoose.Types.ObjectId(), 
			unique: true 
		},
		name: { 
			type: String, 
			required: true, 
			unique: true 
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Brand', brandSchema);
