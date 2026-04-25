import { NextResponse, NextRequest } from "next/server";


// Paths that should be protected (users must be logged in)
const PROTECTED_PATHS = [
  "/checkout",
  "/profile",
];

export default async function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value || null

  if (PROTECTED_PATHS.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


}

// Limit middleware to certain paths (optional)
export const config = {
  matcher: [
    /*
     * Match all paths except static assets and API routes.
     */
    '/checkout',
    '/profile'
  ],
};