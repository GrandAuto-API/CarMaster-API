import Brand from '../models/Brand.js';
import { applyFiltersAndSorting } from '../utils/filterAndSort.js';

 const getAllBrands = async (req, res) => {
	try {
const { filters, sort, page = 1, limit = 10 } = req.query;

		let query = Brand.find();
		query = applyFiltersAndSorting(query, JSON.parse(filters || '{}'), sort);

		const brands = await query.skip((page - 1) * limit).limit(Number(limit));
		res.json(brands);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

 const createBrand = async (req, res) => {
	try {
		const brand = await Brand.create(req.body);
		res.status(201).json(brand);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

 const updateBrand = async (req, res) => {
	try {
		const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(brand);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

 const deleteBrand = async (req, res) => {
	try {
		await Brand.findByIdAndDelete(req.params.id);
		res.json({ message: 'Brand deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export  { getAllBrands, createBrand, updateBrand, deleteBrand };
