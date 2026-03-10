// src/proxy.ts
// =============================================================================
// MIDDLEWARE PRINCIPAL (Next.js 16 — convention "proxy")
// Description : Gère deux responsabilités :
//               1. Redirection i18n (/ → /fr)
//               2. Protection des routes /dashboard (auth requise)
// =============================================================================

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // -------------------------------------------------------------------------
  // 1. Ignorer les routes système, studio, api et fichiers statiques
  // -------------------------------------------------------------------------
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // -------------------------------------------------------------------------
  // 2. Protection des routes /dashboard
  // -------------------------------------------------------------------------
  if (pathname.startsWith('/dashboard')) {
    const session = await auth()
    const isLoginPage = pathname === '/dashboard/login'

    // Non connecté → redirige vers login
    if (!session && !isLoginPage) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }

    // Déjà connecté et sur /login → redirige vers dashboard
    if (session && isLoginPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // -------------------------------------------------------------------------
  // 3. Redirection racine "/" → "/fr"
  // -------------------------------------------------------------------------
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio|robots.txt).*)'],
}