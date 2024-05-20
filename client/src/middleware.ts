import { NextResponse, type NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
	const token = request.cookies.get('_token')

	if (!token)
		return NextResponse.redirect(new URL('/dashboard/auth', request.url))
}
export const config = {
	matcher: ['/dashboard'],
}
