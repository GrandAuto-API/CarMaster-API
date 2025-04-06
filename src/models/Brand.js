import mongoose, { Types } from 'mongoose'

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: Types.ObjectId,
			ref: 'Files',
		},
	},

	{ timestamps: true, versionKey: false }
)

export default mongoose.model('Brand', brandSchema)
