import { BaseException } from '../exception/BaseException.js'
import Admin from '../models/admin.model.js'
import checkValidObjectId from '../utils/checkId.js'

export const getAllAdmin = async (req, res, next) => {
	try {
		const admin = await Admin.find().populate('admin')
		res.status(200).json({ message: 'success', data: admin })
	} catch (error) {
		next(error)
	}
}

export const getAdminById = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const admin = await Admin.findById(id)

		if (!admin) {
			throw new BaseException('Invalid user', 400)
		}

		res.status(200).json({ message: 'success', data: admin })
	} catch (error) {
		next(error)
	}
}

export const createAdmin = async (req, res, next) => {
	try {
		const { name, admin, action } = req.body
		checkValidObjectId(admin)
		const newAdmin = new Admin({ name, admin, action })
		await newAdmin.save()

		res.status(201).json({ message: 'success', data: newAdmin })
	} catch (error) {
		next(error)
	}
}

export const updateAdmin = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const { name, admin, action } = req.body
		checkValidObjectId(admin)
		const updateAdmin = await Admin.findByIdAndUpdate(
			id,
			{
				name,
				admin,
				action,
			},
			{ new: true }
		)

		if (!updateAdmin) {
			throw new BaseException(
				"Id malumotlarini ozgartirishda hato yoki ID noto'g'ri",
				400
			)
		}

		res.status(200).json({ message: 'success', data: updateAdmin })
	} catch (error) {
		next(error)
	}
}

export const deleteAdmin = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const deleteAdmin = await Admin.findByIdAndDelete(id)

		if (!deleteAdmin) {
			throw new BaseException('Bunday ID lik Admin mavjud emas', 404)
		}

		res
			.status(200)
			.json({ message: "Admin muvaffaqyatli o'chirildi", data: deleteAdmin })
	} catch (error) {
		next(error)
	}
}
