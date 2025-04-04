import { isValidObjectId } from 'mongoose'
import { BaseException } from '../exception/BaseException.js'

const checkValidObjectId = async id => {
	if (!isValidObjectId(id)) {
		throw new BaseException('Invalid ID', 404)
	}

	return true
}

export default checkValidObjectId
