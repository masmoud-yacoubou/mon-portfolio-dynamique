import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Ignorer les routes système, le studio, l'api et les fichiers statiques (extensions)
  // On ajoute _next pour être certain que les ressources internes ne soient pas redirigées
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') || 
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Redirection de la racine "/" vers "/fr"
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  // 3. Optionnel : Redirection des locales mal formées ou manquantes
  // Si tu veux forcer une locale sur d'autres pages, tu peux ajouter une logique ici.

  return NextResponse.next()
}

export const config = {
  // Le matcher est crucial : il définit où le proxy s'exécute.
  // On exclut explicitement les dossiers sensibles.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|studio|robots.txt).*)'],
}