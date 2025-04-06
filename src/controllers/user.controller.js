import { compare, hash } from 'bcrypt'
import { BaseException } from '../exception/BaseException.js'
import User from '../models/user.model.js'
import checkValidObjectId from '../utils/checkId.js'

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find()
		res.json({ message: 'success', data: users })
	} catch (error) {
		next(error)
	}
}

const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params
		checkValidObjectId(id)
		const { name, email, password, role } = req.body

		const user = await User.findById(id)
		if (!user) {
			throw new BaseException('Foydalanuvchi topilmadi', 404)
		}

		const checkPassword = await compare(password, user.password)
		if (!checkPassword) {
			throw new BaseException('Noto‘g‘ri parol', 400)
		}

		if (email && email !== user.email) {
			const foundedUser = await User.findOne({ email })
			if (foundedUser) {
				throw new BaseException('Bunday email allaqachon mavjud', 400)
			}
		}

		user.name = name || user.name
		user.email = email || user.email
		user.role = role || user.role

		await user.save()

		res
			.status(200)
			.json({ message: 'Foydalanuvchi muvaffaqiyatli yangilandi', data: user })
	} catch (error) {
		next(error)
	}
}

const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body

		const foundedUser = await User.findOne({ email })

		if (foundedUser) {
			throw new BaseException('Bunday emailga ega user allaqachon mavjud', 409)
		}

		const passwordHash = await hash(password, 10)

		const user = await User.create({
			email,
			name,
			password: passwordHash,
		})

		res.status(201).send({
			message: 'success',
			data: user,
		})
	} catch (error) {
		next(error)
	}
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
			throw new BaseException('Bunday password mavjud emas', 404)
		}

		res.json({ message: 'Muvaffaqiyatli kirildi', data: user })
	} catch (error) {
		next(error)
	}
}

export default { getAllUsers, login, register, updateUser }
