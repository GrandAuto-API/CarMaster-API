import Joi from 'joi';
import mongoose from 'mongoose';

export const validateReview = (req, res, next) => {
	const schema = Joi.object({
		user: Joi.string().custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('any.invalid');
			}
			return value;
		}).required(),
		car: Joi.string().custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('any.invalid');
			}
			return value;
		}).required(),
		rating: Joi.number().min(1).max(5).required(),
		comment: Joi.string().optional(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
