// middleware.js (à la racine du projet)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Liste des chemins qui nécessitent une authentification
  const protectedPaths = ['/dashboard', '/profile', '/courses'];
  
  // Vérifiez si le chemin actuel nécessite une authentification
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  if (isProtectedPath) {
    // Vérifiez si le cookie d'authentification existe
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      // Redirigez vers la page de connexion avec le chemin de retour
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// Configuration du middleware pour qu'il s'exécute uniquement sur certaines routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/courses/:path*']
};