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

const createBrand = async (req, res) => {
	try {
		const { name } = req.body
		if (!name) {
			throw new BaseException('Name uchun malumot kirigin majburiy', 400)
		}
		const brand = new Brand({ name })
		await brand.save()

		res.status(201).json({ message: 'success', data: brand })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const updateBrand = async (req, res) => {
	try {
		const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
		res.json(brand)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteBrand = async (req, res) => {
	try {
		const { id } = req.params
		if (!checkValidObjectId(res, id)) return
		const deleteBrand = await Brand.findByIdAndDelete(id)
		if (!deleteBrand) {
			throw new BaseException('User not found', 400)
		}
		res.json({ message: 'Brand deleted successfully', data: deleteBrand })
	} catch (error) {
		next(error)
	}
}

export { createBrand, deleteBrand, getAllBrands, updateBrand }
