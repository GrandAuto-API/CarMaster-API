import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config/jwt.config.js'
import { BaseException } from '../exception/BaseException.js'

export const Protected = isProtected => {
	return (req, res, next) => {
		if (!isProtected) {
			req.role = 'USER'
			return next()
		}

		const token = req.headers['authorization']

		if (!token || !token.includes('Bearer ') || !token.split(' ')[1]) {
			return next(new BaseException('Iltimow tokenni berib yuboring ', 400))
		}

		const accessToken = token.split(' ')[1]

		try {
			const decodedData = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)

			req.role = decodedData.role
			req.user = decodedData.user

			next()
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError) {
				return next(new BaseException('Token muddati tugagan', 406))
			} else if (error instanceof jwt.JsonWebTokenError) {
				return next(new BaseException('Token notogri formatda yuborildi', 400))
			} else if (error instanceof jwt.NotBeforeError) {
				return next(new BaseException('Not Before Error', 409))
			} else {
				next(error)
			}
		}
	}
}
