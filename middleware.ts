import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get role from cookie or header (mock implementation)
  const role = request.cookies.get("ephrya-user-role")?.value || "admin"
  const normalizedRole = role.toLowerCase()

  console.log(`🔍 Middleware: ${pathname} accessed by role: ${normalizedRole}`)

  // Check for admin impersonation
  const impersonatedUser = request.cookies.get("impersonated-user")?.value
  const isImpersonating = normalizedRole === "admin" && impersonatedUser

  if (isImpersonating) {
    console.log(`👁️ Middleware: Admin impersonating user: ${impersonatedUser}`)
  }

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

  // CEO gets access to EVERYTHING in admin (no more special mobile ceo handling)
  if (pathname.startsWith("/admin")) {
    if (normalizedRole === "ceo" || normalizedRole === "admin") {
      console.log(`✅ Middleware: Allowing ${normalizedRole} access to admin route: ${pathname}`)
      return NextResponse.next()
    } else {
      console.log(`❌ Middleware: Blocking ${normalizedRole} from admin route: ${pathname}`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Client routes - Allow clients, admins, and admin impersonation
  if (pathname.startsWith("/client")) {
    const allowClientAccess = ["client", "new client", "admin", "ceo"].includes(normalizedRole) || isImpersonating

    if (allowClientAccess) {
      if (isImpersonating) {
        console.log(`✅ Middleware: Allowing admin impersonation access to client route: ${pathname}`)
      } else {
        console.log(`✅ Middleware: Allowing ${normalizedRole} access to client route: ${pathname}`)
      }
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
