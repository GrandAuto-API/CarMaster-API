import mongoose from 'mongoose'

const AdminSchema = mongoose.Schema(
	{
		name: { type: mongoose.SchemaTypes.String, required: true },
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		action: { type: mongoose.SchemaTypes.String, required: true },
	},
	{ timestamps: true }
)

export default mongoose.model('Admin', AdminSchema)
