import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Cloud storage',
	description: 'Cloud storage',
	authors: [{ name: 'Prefect', url: 'https://github.com/mirlan-mambetov' }],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="main">{children}</main>
			</body>
		</html>
	)
}
