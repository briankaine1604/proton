import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // if (req.method === "OPTIONS") {
  //   return new NextResponse(null, {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //       "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //     },
  //   });
  // }

  if (isAdminRoute && !isLoggedIn) {
    // Redirect to login if user is not logged in and trying to access /admin
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware only to the /admin route and its sub-routes
};
