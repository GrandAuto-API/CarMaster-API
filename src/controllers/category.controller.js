import { BaseException } from '../exception/BaseException.js'
import Category from '../models/category.model.js'
import checkValidObjectId from '../utils/checkId.js'

const getAllCategories = async (req, res, next) => {
	try {
		const category = await Category.find()
		res.json({ message: 'success', data: category })
	} catch (error) {
		next(error)
	}
}

const getCategoryById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const category = await Category.findById(id)

		if (!category) {
			throw new BaseException('Category not found', 404)
		}

		res.json({
			message: 'success',
			data: category,
		})
	} catch (error) {
		next(error)
	}
}

const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body

		const foundCategory = await Category.findOne({ name })

		if (foundCategory) {
			throw new BaseException('This category is already exists', 400)
		}

		const category = new Category({ name })
		await category.save()

		res.json({ message: 'success', data: category })
	} catch (error) {
		next(error)
	}
}

const updateCategory = async (req, res, next) => {
	try {
		const { id } = req.params
		const { name } = req.body

		if (!name) {
			throw new BaseException('Cateogryga nom bering ', 400)
		}
		checkValidObjectId(id)

		const category = await Category.findByIdAndUpdate(id, { name })

		res.json({ message: 'success', data: category })
	} catch (error) {
		next(error)
	}
}

const deleteCategory = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)

		const deleteCategory = await Category.findByIdAndDelete(id)

		if (!deleteCategory) {
			throw new BaseException('Bunday category mavjud emas', 404)
		}

		res.status(209).json({
			message: "Category muvaffaqiyatli o'chirildi",
			data: deleteCategory,
		})
	} catch (error) {
		next(error)
	}
}

export default {
	deleteCategory,
	updateCategory,
	createCategory,
	getAllCategories,
	getCategoryById,
}
