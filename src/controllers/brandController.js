import { BaseException } from '../exception/BaseException.js'
import Brand from '../models/Brand.js'
import checkValidObjectId from '../utils/checkId.js'
import { applyFiltersAndSorting } from '../utils/filterAndSort.js'

const getAllBrands = async (req, res) => {
	try {
		const { filters, sort, page = 1, limit = 10 } = req.query

		let query = Brand.find()
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort)

		const brands = await query.skip((page - 1) * limit).limit(Number(limit))
		res.json(brands)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const createBrand = async (req, res) => {
	try {
		const brand = await Brand.create(req.body)
		res.status(201).json(brand)
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
		res.status(500).json({ error: error.message })
	}
}

export { createBrand, deleteBrand, getAllBrands, updateBrand }
