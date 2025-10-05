import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check all admin routes
  if (request.nextUrl.pathname === "/admin" || request.nextUrl.pathname.startsWith("/admin/")) {
    // Check for admin session cookie
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession || adminSession.value !== "authenticated") {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
