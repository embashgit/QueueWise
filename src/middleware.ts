// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecode} from 'jwt-decode';

// Define protected routes
const protectedRoutes = ['/', '/dashboard', '/profile', '/settings'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Check if the request is for a protected route
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      // If there's no token, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Decode the token to check if it's valid
      const decodedToken = jwtDecode(token) as { exp: number };

      // Check if the token is expired
      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    } catch (error) {
      // If token is invalid or decoding fails, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // If everything is fine, allow the request to proceed
  return NextResponse.next();
}

// Specify the paths that should use this middleware
export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
