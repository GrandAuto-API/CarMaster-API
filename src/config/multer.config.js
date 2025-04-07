import multer from 'multer'
import { join } from 'node:path'

const storge = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, join(process.cwd(), 'uploads'))
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.filename + '-' + Date.now() + `.${file.mimetype.split('/')[1]}`
		)
	},
})

export const upload = multer({ storge })
