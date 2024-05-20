import { API_BASE_URI } from '@/api/base.api'
import { NextPage } from 'next'
import { cookies } from 'next/headers'

export async function fetchData() {
	const token = cookies().get('_token')?.value
	const response = await fetch(`${API_BASE_URI}/users/profile`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
	/**
	 * IS THIS CUSTOM///
	 */
	// if (!response.ok)
	// 	return redirect(
	// 		new URL('/dashboard/auth', 'http://localhost:3000').toString()
	// 	)
	return await response.json()
}
const Dashboard: NextPage = async () => {
	const user = await fetchData()
	return <section>Dashboard</section>
}

export default Dashboard
