import { isValidObjectId } from 'mongoose'
import { BaseException } from '../exception/BaseException'

const checkValidObjectId = async id => {
	if (!isValidObjectId(id)) {
		throw new BaseException('Invalid ID', 404)
	}

	return true
}

export default checkValidObjectId
