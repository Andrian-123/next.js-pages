import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('x-API-KEY', 'API_KEY_TESTS')
  return res
}

export const config = {
  matcher: '/:path*',
}
