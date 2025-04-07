export const errorHandlerMiddleware = (err, req, res, next) => {
	if (err.isException) {
		return res.status(err.status).send({ message: err.message })
	}
	console.log(err)
	res.status(500).send({ message: 'Internal Server Error' })
}
