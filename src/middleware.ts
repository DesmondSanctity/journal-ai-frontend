import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const { pathname } = request.nextUrl;
 const isAuthRoute = pathname.startsWith('/auth');

 // Get and parse the auth storage cookie
 const authCookie = request.cookies.get('auth-storage')?.value;
 const authData = authCookie ? JSON.parse(authCookie) : null;
 const token = authData?.state?.token;

 // Protect dashboard routes
 if (pathname.startsWith('/dashboard') && !token) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
 }

 // Redirect authenticated users away from auth pages
 if (isAuthRoute && token) {
  return NextResponse.redirect(new URL('/dashboard/journal', request.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: ['/dashboard/:path*', '/auth/:path*'],
};
