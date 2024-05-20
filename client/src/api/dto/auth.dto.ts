import { AuthType } from 'types/auth.types'

export interface IAuthLoginDTO extends AuthType {}

export interface IAuthLoginResponse {
	token: string
}
