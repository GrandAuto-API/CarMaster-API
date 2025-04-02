import { BaseException } from '../exception/BaseException.js'
import Category from '../models/category.model.js'
import { checkValidObjectId } from '../utils/checkId.js'

export const getAllCategories = async (req, res, next) => {
	try {
		const category = await Category.find()
		res.status(200).json({ message: 'success', data: category })
	} catch (error) {
		next(error)
	}
}

export const getCategoryById = async (req, res, next) => {
	try {
		const { id } = req.params
		if (!checkValidObjectId) return
		const category = Category.findById(id)

		if (!category) {
			throw new BaseException('Category not found')
		}

		res.status(200).json({
			message: 'success',
			data: category,
		})
	} catch (error) {
		next(error)
	}
}

export const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body

		const foundCategory = await Category.findOne({ name })

		if (foundCategory) {
			throw new BaseException('This category is already exists')
		}
		const category = new Category({ name })
		await category.save()
		res.status(200).json({ message: 'success', data: category })
	} catch (error) {
		next(error)
	}
}
