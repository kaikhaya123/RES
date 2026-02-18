import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    const adminToken = req.cookies.get('admin-token')?.value;
    
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Admin authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(adminToken);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid admin token' },
        { status: 401 }
      );
    }
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Not authenticated
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Not an admin
    if (token.userType !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect student-only routes
  if (pathname.startsWith("/apply")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (token.userType !== "STUDENT") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/apply/:path*", "/api/admin/:path*"],
};
