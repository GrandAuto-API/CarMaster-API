import Joi from 'joi'

export const createCarSchema = Joi.object({
	name: Joi.string().min(5).max(20).alphanum().required(),
}).required()

export const updateCarSchema = Joi.object({
	name: Joi.string().min(5).max(20).alphanum().required(),
}).required()
