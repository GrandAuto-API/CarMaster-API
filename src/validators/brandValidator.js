import Joi from 'joi';

export const validateBrand = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });
	next();
};
