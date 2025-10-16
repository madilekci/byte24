import type { authClient } from '@dashboard/common/auth-client';
import { getSessionCookie } from 'better-auth/cookies';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Session = typeof authClient.$Infer.Session;

const auth = {
  validatePath: (path: string) =>
    !(
      path.startsWith('/login') ||
      path.startsWith('/api/auth/signin') ||
      path.startsWith('/forgot-password') ||
      path.startsWith('/verify-email')
    ),
  getRolePath: '/auth/my-role',
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const sessionCookie = await getSessionCookie(request, {
    cookiePrefix: 'byte24',
  });

  if (!sessionCookie && !auth.validatePath(path)) return NextResponse.next();
  else if (!sessionCookie && auth.validatePath(path))
    return NextResponse.redirect(new URL('/login', request.nextUrl));

  try {
    // Setup headers
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/get-session`, {
      method: 'GET',
      headers: {
        cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
      },
      // credentials: 'include' is not needed in middleware
    });

    if (!response.ok) {
      throw new Error('Failed to fetch session');
    }

    const session: Session = await response.json();

    if (session && path === '/login') {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!auth.validatePath(path)) return NextResponse.redirect(new URL('/', request.nextUrl));
  } catch (e) {
    if (auth.validatePath(path)) return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - backend (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|~offline|manifest.webmanifest|images|backend|auth|site.webmanifest|_next/static|_next/image|android-chrome-256x256.png|android-chrome-192x192.png|favicon.ico|favicon|splash_screens).*)',
  ],
};
