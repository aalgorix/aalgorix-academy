/**
 * middleware.ts — Edge middleware for route protection and role-based routing.
 *
 * Protected routes:
 *   /student/*  → requires auth  (students + admins only; teachers → /teacher)
 *   /teacher/*  → requires auth  (teachers + admins only; students → /student)
 *
 * Cookies set by /api/login:
 *   aalgorix_auth  = "1"                 (presence = authenticated)
 *   aalgorix_role  = "student" | "teacher" | "admin"
 *
 * Note: The real security lives at the API layer (token validation).
 * Middleware provides UX-level redirection before the page renders.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const auth = request.cookies.get('aalgorix_auth')?.value;
  const role = request.cookies.get('aalgorix_role')?.value;

  // ── Not authenticated → /login ────────────────────────────────────────────
  if (!auth) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // ── Teacher / admin accessing /student → bounce to /teacher ───────────────
  if (
    pathname.startsWith('/student') &&
    (role === 'teacher' || role === 'admin')
  ) {
    return NextResponse.redirect(new URL('/teacher', request.url));
  }

  // ── Student accessing /teacher → bounce to /student ───────────────────────
  if (pathname.startsWith('/teacher') && role === 'student') {
    return NextResponse.redirect(new URL('/student', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*'],
};
