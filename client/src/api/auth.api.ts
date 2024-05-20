import { IUser } from 'interfaces/user.interface'
import { destroyCookie } from 'nookies'
import { baseApi } from './base.api'
import {
	IAuthLoginDTO,
	IAuthLoginResponse,
	IAuthRegisterDTO,
} from './dto/auth.dto'

const PATH = '/auth'

/**
 *
 * @param values
 * @returns User Token
 */
export const login = async (
	values: IAuthLoginDTO
): Promise<IAuthLoginResponse> => {
	return (await baseApi.post<IAuthLoginResponse>(`${PATH}/login`, values)).data
}

/**
 *
 * @param values
 * @returns Registered user
 */
export const register = async (values: IAuthRegisterDTO): Promise<IUser> => {
	return (await baseApi.post<IUser>(`${PATH}/register`, values)).data
}

/**
 * @description Logout
 */
export const logOut = () => {
	destroyCookie(null, '_token', { path: '/' })
}
