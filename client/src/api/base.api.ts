import axios from 'axios'
import { parseCookies } from 'nookies'
import { getContentType } from './config'

export const API_BASE_URI = 'http://localhost:5000'
export const baseApi = axios.create({
	baseURL: API_BASE_URI,
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
