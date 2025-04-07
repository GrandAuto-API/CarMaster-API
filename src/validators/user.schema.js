import Joi from 'joi';

export const validateUser = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		role: Joi.string().valid('user', 'admin').default('user'),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
