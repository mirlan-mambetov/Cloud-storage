import { Header } from '@/components/header/Header'
import { ReactNode } from 'react'

const PagesLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{/* HEADER */}
			<Header />
			{/* CONTENT */}
			{children}
		</>
	)
}

export default PagesLayout
