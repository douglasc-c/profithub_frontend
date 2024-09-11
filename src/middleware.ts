import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'en',
})

export function middleware(request: NextRequest) {
  console.log('Middleware Executed:', request.nextUrl.pathname)

  const [, locale] = request.nextUrl.pathname.split('/')
  const token = request.cookies.get('auth-token')

  const protectedRoutes = [
    'dashboard',
    'arbitration',
    'consulting',
    'heatmap',
    'settings',
  ]

  if (
    !token &&
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(`/${locale}/${route}`),
    )
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(en|pt-BR)/:path*'],
}
