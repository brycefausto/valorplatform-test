import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = [
  /dashbaord\/.*/,
  /users\/.*/,
  /profile\/.*/,
  /settings\/.*/
];
const publicRoutes = ["/login", "/signup", "/forgotPassword", /resetPassword\/.*/];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.filter(path => pathname.match(path)).length > 0;
  const isPublicRoute = publicRoutes.filter(path => pathname.match(path)).length > 0;

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
