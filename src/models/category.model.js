import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
	{
		name: { type: mongoose.SchemaTypes.String, required: true },
	},
	{ timestamps: true } // timestamp bu yerda to'g'ri bo'lishi kerak
)

const Category = mongoose.model('Category', CategorySchema)
export default Category
