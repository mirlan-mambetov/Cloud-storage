import { AuthType } from 'types/auth.types'

export interface IAuthLoginDTO extends AuthType {}
export interface IAuthRegisterDTO extends AuthType {
	fullName: string
}

export interface IAuthLoginResponse {
	token: string
}
