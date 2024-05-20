import { IBase } from './base.interface'
import { IFiles } from './files.interface'

export interface IUser extends IBase {
	email: string
	fullName: string
	files: IFiles[]
}
