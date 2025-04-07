import { ROLES } from '../constans/role.constsns.js'
import { BaseException } from '../exception/BaseException.js'

export const Roles = (...roles) => {
	return (req, res, next) => {
		const userRole = req.role

		if (roles.includes(ROLES.ALL)) {
			return next()
		}

		if (!roles.includes(userRole)) {
			return next(
				new BaseException('Sizga bu amalni bajarishga ruhsat yoq', 403)
			)
		}

		next()
	}
}
