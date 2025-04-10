import Joi from 'joi'
import { model } from 'mongoose';

export const validateCar = (req, res, next) => {
	const schema = Joi.object({
		model: Joi.string().required(),
		brand: Joi.string().hex().length(24).required(),
		year: Joi.number().required(),
		price: Joi.number().required(),
		available: Joi.boolean().default(true),
		imageUrl: Joi.string().uri().optional(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};

