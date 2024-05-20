import { Header } from '@/components/header/Header'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default DashboardLayout
