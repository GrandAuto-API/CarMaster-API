import { compare, hash } from 'bcrypt'
import userModel from '../models/user.model.js'
import handlerServerError from '../utils/handlerError.js'

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json({ message: 'success', data: users })
	} catch (error) {
		handlerServerError(error, res)
	}
}

const register = async (req, res) => {
	const { name, email, phoneNumber, password } = req.body

	const foundedUser = await userModel.findOne({
		$or: [{ email }, { phoneNumber }],
	})

	if (foundedUser) {
		return res.status(409).send({
			message: 'User already exists, try another email or phone number',
		})
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

const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await userModel.findOne({ email })

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const isMatch = await compare(password, user.password)

		if (!isMatch) {
			return res.status(404).json({ message: 'Invalid password' })
		}

		res.json({ message: 'Muvaffaqiyatli kirildi', data: user })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export { getAllUsers, login, register }
