import { NextRequest, NextResponse } from "next/server";

// NOTE: jsonwebtoken/bcryptjs use Node APIs not supported in the Edge
// middleware runtime, so we only check that a token cookie is present here.
// The token's signature is fully verified server-side in every API route
// (see src/lib/auth.ts -> getTokenFromRequest), which is what actually
// gates access to data. This middleware only improves UX by redirecting
// signed-out visitors away from /dashboard before the page even loads.
const AUTH_COOKIE_NAME = "campus_token";
const PROTECTED_PREFIXES = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
