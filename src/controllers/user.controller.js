import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
	ACCESS_TOKEN_EXPIRE_TIME,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRE_TIME,
	REFRESH_TOKEN_SECRET,
} from '../config/jwt.config.js'
import { BaseException } from '../exception/BaseException.js'
import User from '../models/user.model.js'
import checkValidObjectId from '../utils/checkId.js'
import sendMail from '../utils/mail.utils.js'

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

		await sendMail({
			to: email,
			subject: 'Welcome',
			text: `Salom ${name}! Bizning salonimizga muvaffaqiyatli royxatdan otdingiz `,
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

		const accessToken = jwt.sign(
			{ id: user.id, role: user.role },
			ACCESS_TOKEN_SECRET,
			{ expiresIn: ACCESS_TOKEN_EXPIRE_TIME }
		)

		const refreshToken = jwt.sign(
			{ id: user.id, role: user.role },
			REFRESH_TOKEN_SECRET,
			{ expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
		)

		res.cookie('accessToken', accessToken, {
			maxAge: 60 * 1000,
			httpOnly: true,
		})

		res.cookie('refreshToken', refreshToken, {
			maxAge: 2 * 60 * 1000,
			httpOnly: true,
		})

		res.json({
			message: 'Muvaffaqiyatli kirildi',
			tokens: {
				accessToken,
				refreshToken,
			},
			data: user,
		})
	} catch (error) {
		next(error)
	}
}

const refresh = async (req, res, next) => {
	try {
		const { refreshToken } = req.body
		const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

		const accessToken = jwt.sign(data, ACCESS_TOKEN_SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
		})

		const newRefreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET, {
			expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
		})

		res.send({
			message: 'success',
			tokens: {
				accessToken,
				refreshToken: newRefreshToken,
			},
		})
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			next(new BaseException('Refresh token expired', 401))
		} else if (error instanceof jwt.JsonWebTokenError) {
			next(new BaseException('Invalid refresh token', 400))
		} else {
			next(error)
		}
	}
}

export default { refresh, getAllUsers, login, register, updateUser }
