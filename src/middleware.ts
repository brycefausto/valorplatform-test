import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  /dashboard([\/.*])?/,
  /users([\/.*])?/,
  /profile([\/.*])?/,
  /settings([\/.*])?/
];
const publicRoutes = ["/", "/login", "/signup", "/forgotPassword", /resetPassword\/.*/];

const pathMatcher = (path: string | RegExp, pathname: string) => 
  typeof path === "string" ? path == pathname : pathname.match(path)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.filter(path => pathMatcher(path, pathname)).length > 0;
  const isPublicRoute = publicRoutes.filter(path => pathMatcher(path, pathname)).length > 0  || pathname == "/";

  if (isProtectedRoute || isPublicRoute) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (isPublicRoute && session?.userId) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}
