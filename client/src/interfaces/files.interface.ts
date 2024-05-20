import { IBase } from './base.interface'
import { IUser } from './user.interface'

export interface IFiles extends IBase {
	fileName: string
	originalName: string
	size: number
	mimeType: string
	deletedAt?: Date
	user: IUser
}
