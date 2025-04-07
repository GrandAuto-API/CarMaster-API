import Joi from 'joi'

export const createAdminSchema = Joi.object({
	name: Joi.string().required(),
	admin: Joi.string().hex().length(24).required(),
	action: Joi.string().required(),
})
