// middleware.js (à la racine)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const protectedPaths = ['/dashboard', '/profile', '/courses'];

  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );
  
  if (isProtectedPath) {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/courses/:path*']
};
