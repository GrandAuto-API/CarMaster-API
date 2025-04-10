import Joi from 'joi';

export const validateAdmin = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		admin: Joi.string().required(),
		action: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
