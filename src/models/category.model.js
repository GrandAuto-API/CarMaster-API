import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
	{
		name: { type: mongoose.SchemaTypes.String, required: true },
	},
	{ timestamp: true }
)

export default mongoose.model('Category', CategorySchema)
