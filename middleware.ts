import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get role from cookie or header (mock implementation)
  const role = request.cookies.get("ephrya-user-role")?.value || "admin"
  const normalizedRole = role.toLowerCase()

  console.log(`🔍 Middleware: ${pathname} accessed by role: ${normalizedRole}`)

  // ALWAYS allow these paths - no restrictions
  const alwaysAllowedPaths = ["/unauthorized", "/select-role", "/", "/login"]

  if (alwaysAllowedPaths.some((path) => pathname === path)) {
    console.log(`✅ Middleware: Always allowing access to ${pathname}`)
    return NextResponse.next()
  }

  // ALWAYS allow ALL Tilo routes for ANY role - completely unrestricted
  if (pathname.includes("ask-tilo") || pathname.includes("tilo")) {
    console.log(`✅ Middleware: Allowing ALL users access to Tilo route: ${pathname}`)
    return NextResponse.next()
  }

  // Mobile CEO gets CEO privileges - treat as CEO for ALL purposes
  const effectiveRole = normalizedRole === "mobile ceo" ? "ceo" : normalizedRole
  console.log(`🎭 Middleware: Effective role for ${normalizedRole} is ${effectiveRole}`)

  // CEO and Mobile CEO get access to EVERYTHING in admin
  if (pathname.startsWith("/admin")) {
    if (effectiveRole === "ceo" || effectiveRole === "admin") {
      console.log(
        `✅ Middleware: Allowing ${normalizedRole} (effective: ${effectiveRole}) access to admin route: ${pathname}`,
      )
      return NextResponse.next()
    } else {
      console.log(`❌ Middleware: Blocking ${normalizedRole} from admin route: ${pathname}`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Client routes
  if (pathname.startsWith("/client")) {
    if (["client", "new client", "admin", "ceo"].includes(effectiveRole)) {
      console.log(`✅ Middleware: Allowing ${normalizedRole} access to client route: ${pathname}`)
      return NextResponse.next()
    } else {
      console.log(`❌ Middleware: Blocking ${normalizedRole} from client route: ${pathname}`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Default: allow everything else
  console.log(`✅ Middleware: Default allowing access to ${pathname}`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
