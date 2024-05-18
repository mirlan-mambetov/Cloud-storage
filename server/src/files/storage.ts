import { diskStorage } from 'multer'

const generatedID = () => {
	return Array(18)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('')
		.trim()
}
const normalizeFileName = (req, file, callback) => {
	const fileExtName = file.originalname.split('.').pop()

	callback(null, `${generatedID()}.${fileExtName}`)
}
export const fileStorage = diskStorage({
	destination: './uploads',
	filename: normalizeFileName,
})
