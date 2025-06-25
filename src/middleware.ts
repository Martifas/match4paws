import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

const protectedRoutes = [
  "/onboarding",
  "/favorites",
  "/messages",
  "/account",
  "/api/favorites",
  "/api/messages",
];

const isProtected = (pathname: string) =>
  protectedRoutes.some((p) => pathname.startsWith(p));

export async function middleware(req: NextRequest) {
  const res = await auth0.middleware(req);

  if (!isProtected(req.nextUrl.pathname)) return res;

  const session = await auth0.getSession(req);

  if (session) {
    return res;
  }

  const login = new URL("/auth/login", req.url);
  login.searchParams.set("returnTo", req.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth).*)",
  ],
};
