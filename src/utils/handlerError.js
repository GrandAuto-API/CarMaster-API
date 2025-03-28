const handlerServerError = async (error, res) => {
	console.error(error)
	res.status(500).json({ message: 'Server bilan muammo' })
}

export default handlerServerError
