import { BaseException } from '../exception/BaseException.js'
import Brand from '../models/Brand.js'
import checkValidObjectId from '../utils/checkId.js'

const getAllBrands = async (req, res, next) => {
	try {
		const brand = await Brand.find()
		res.status(200).json({ message: 'success', data: brand })
	} catch (error) {
		next(error)
	}
}
const getBrandById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const brand = await Brand.findById(id)

		if (!brand) {
			throw new BaseException('Bunday brand mavjud emas')
		}
		res.status(200).json({ message: 'success', data: brand })
	} catch (error) {
		next(error)
	}
}

const createBrand = async (req, res, next) => {
	try {
		const { name } = req.body
		if (!name) {
			throw new BaseException('Name uchun malumot kirigin majburiy', 400)
		}
		const brand = new Brand({ name })
		await brand.save()

		res.status(201).json({ message: 'success', data: brand })
	} catch (error) {
		next(error)
	}
}

const updateBrand = async (req, res, next) => {
	try {
		const { id } = req.params
		const { name } = req.body
		checkValidObjectId(id)
		const brand = await Brand.findByIdAndUpdate(
			id,
			{ name },
			{
				new: true,
			}
		)
		res.json({ message: 'success', data: brand })
	} catch (error) {
		next(error)
	}
}

const deleteBrand = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const deleteBrand = await Brand.findByIdAndDelete(id)
		if (!deleteBrand) {
			throw new BaseException('User not found', 400)
		}
		res.json({ message: 'Brand deleted successfully', data: deleteBrand })
	} catch (error) {
		next(error)
	}
}

export default {
	createBrand,
	deleteBrand,
	getAllBrands,
	updateBrand,
	getBrandById,
}
