import axios from 'axios'
import { parseCookies } from 'nookies'
import { getContentType } from './config'

export const baseApi = axios.create({
	baseURL: 'http://localhost:5000',
	headers: getContentType(),
})

baseApi.interceptors.request.use((config) => {
	const { _token } = parseCookies()

	config.headers.Authorization = `Bearer ${_token}`

	return config
})
baseApi.interceptors.response.use(
	(config) => {
		return config
	},
	(reject) => Promise.reject(reject.response.data)
)
