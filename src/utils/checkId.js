import { isValidObjectId } from 'mongoose'

const checkValidObjectId = async (res, id) => {
	if (!isValidObjectId(id)) {
		return res
			.status(400)
			.json({ message: 'Bunday ID yaroqsiz boshqa kiriting' })
	}

	return true
}

export default checkValidObjectId
