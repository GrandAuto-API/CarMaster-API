import Joi from 'joi';
import mongoose from 'mongoose';

export const validatePayment = (req, res, next) => {
	const schema = Joi.object({
		order: Joi.string().custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('any.invalid');
			}
			return value;
		}).required(),
		amount: Joi.number().positive().required(),
		status: Joi.string().valid('pending', 'paid', 'failed').default('pending'),
		method: Joi.string().valid('card', 'paypal', 'bank_transfer').required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
