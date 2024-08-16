import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
  console.log('Middleware Executed:', request.nextUrl.pathname)

  const response = intlMiddleware(request)

  const token = request.cookies.get('auth-token')

  if (
    !token &&
    request.nextUrl.pathname.startsWith(
      `/${request.nextUrl.locale}/authenticated`,
    )
  ) {
    return NextResponse.redirect(
      new URL(`/${request.nextUrl.locale}/signin`, request.url),
    )
  }

  return response
}

export const config = {
  matcher: ['/', '/(en|pt-BR)/:path*', '/authenticated/:path*'],
}
