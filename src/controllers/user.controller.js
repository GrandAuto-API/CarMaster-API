import { compare, hash } from 'bcrypt'
import { BaseException } from '../exception/BaseException.js'
import User from '../models/user.model.js'

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json({ message: 'success', data: users })
	} catch (error) {
		next(error)
	}
}

const register = async (req, res) => {
	const { name, email, phoneNumber, password } = req.body

	const foundedUser = await userModel.findOne({ email })

	if (foundedUser) {
		throw new BaseException('Bunday emailga ega user allaqachon mavjud', 409)
	}

	const passwordHash = await hash(password, 10)

	const user = await userModel.create({
		email,
		phoneNumber,
		name,
		password: passwordHash,
	})

	res.status(201).send({
		message: 'success',
		data: user,
	})
}

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user) {
			throw new BaseException('User not found', 400)
		}

		const isMatch = await compare(password, user.password)

		if (!isMatch) {
			throw new BaseException('Invalid password', 404)
		}

		res.json({ message: 'Muvaffaqiyatli kirildi', data: user })
	} catch (error) {
		next(error)
	}
}

export { getAllUsers, login, register }
