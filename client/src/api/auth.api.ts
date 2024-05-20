import { baseApi } from './base.api'
import { IAuthLoginDTO, IAuthLoginResponse } from './dto/auth.dto'

const PATH = '/auth'

/**
 *
 * @param values
 * @returns
 */
export const login = async (
	values: IAuthLoginDTO
): Promise<IAuthLoginResponse> => {
	return (await baseApi.post<IAuthLoginResponse>(`${PATH}/login`, values)).data
}
