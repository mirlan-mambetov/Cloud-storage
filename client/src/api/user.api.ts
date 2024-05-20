import { IUser } from 'interfaces/user.interface'
import { baseApi } from './base.api'

const PATH = '/users'

/**
 *
 * @returns USER PROFILE
 */
export const getUserProfile = async (): Promise<IUser> => {
	return (await baseApi.post<IUser>(`${PATH}/profile`)).data
}
