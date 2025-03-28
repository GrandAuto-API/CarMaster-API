const { isValidObjectId } = require('mongoose')
const User = require('../models/user.model')
const { json } = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')

const handlerServerError = async (error, res) => {
	console.error(error)
	res.status(500).json({ message: 'Server bilan muammo' })
}

// Bu funksiya id'ni olib to'g'ri ekanligin tekshirib qaytarib beradi

// const checkValidObjectId = async (res, id) => {
// 	if (!isValidObjectId(id)) {
// 		return res
// 			.status(400)
// 			.json({ message: 'Bunday ID yaroqsiz boshqa kiriting' })
// 	}

// 	return true
// }

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json({ message: 'success', data: users })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body

		const existsUser = await User.findOne({ $or: [{ email }, { password }] })

		if (existsUser) {
			return res
				.status(404)
				.json({ message: 'Bunday emailda foydalanuvchi allaqachon mavjud' })
		}
		res.status(201).json({ message: 'success' })

		const user = new User({ name, email, password, role })

		await user.save()
	} catch (error) {
		handlerServerError(error, res)
	}
}

module.exports = { getAllUsers, register }
