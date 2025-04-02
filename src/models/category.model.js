import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
	{
		name: { type: mongoose.SchemaTypes.String, required: true },
	},
	{ timestamp: true }
)
const Category = mongoose.model('Category', CategorySchema)
export default Category
