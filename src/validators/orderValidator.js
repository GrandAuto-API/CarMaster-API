import Joi from 'joi';

export const validateOrder = (req, res, next) => {
	const schema = Joi.object({
		user: Joi.string().required(),
		car: Joi.string().required(),
		status: Joi.string().valid('pending', 'completed', 'cancelled').default('pending'),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
