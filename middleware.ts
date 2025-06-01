import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get role from cookie or header (mock implementation)
  const role = request.cookies.get("ephrya-user-role")?.value || "admin"
  const normalizedRole = role.toLowerCase()

  console.log(`Middleware: ${pathname} accessed by role: ${normalizedRole}`)

  // Treat mobile CEO as regular CEO for access control
  const effectiveRole = normalizedRole === "mobile ceo" ? "ceo" : normalizedRole
  console.log(`Middleware: Effective role for access control: ${effectiveRole}`)

  // CEO Dashboard access - Allow both CEO and Admin
  if (pathname.startsWith("/admin/ceo")) {
    if (effectiveRole !== "ceo" && effectiveRole !== "admin") {
      console.log(`Middleware: Blocking ${normalizedRole} from CEO dashboard`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    console.log(`Middleware: Allowing ${normalizedRole} access to CEO dashboard`)
    return NextResponse.next()
  }

  // Special case: Allow clients and mobile CEO to access Ask Tilo Desktop
  if (pathname === "/admin/ask-tilo/desktop" || pathname === "/admin/ask-tilo/mobile") {
    console.log(`Middleware: Allowing ${normalizedRole} access to Ask Tilo`)
    return NextResponse.next()
  }

  // Mobile Tilo route - Allow CEO and mobile CEO specifically
  if (pathname.startsWith("/ask-tilo/mobile")) {
    if (effectiveRole !== "ceo" && effectiveRole !== "admin") {
      console.log(`Middleware: Blocking ${normalizedRole} from mobile Tilo routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    console.log(`Middleware: Allowing ${normalizedRole} access to mobile Tilo`)
    return NextResponse.next()
  }

  // Admin routes - Allow admin and CEO
  if (pathname.startsWith("/admin")) {
    if (!["admin", "ceo", "developer", "analyst"].includes(effectiveRole)) {
      console.log(`Middleware: Blocking ${normalizedRole} from admin routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    return NextResponse.next()
  }

  // Client routes
  if (pathname.startsWith("/client")) {
    if (!["client", "new client", "admin", "ceo"].includes(effectiveRole)) {
      console.log(`Middleware: Blocking ${normalizedRole} from client routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    return NextResponse.next()
  }

  // Tilo routes - Allow clients to access Tilo with restrictions
  if (pathname.startsWith("/ask-tilo")) {
    if (!["client", "new client", "admin", "ceo"].includes(effectiveRole)) {
      console.log(`Middleware: Blocking ${normalizedRole} from Tilo routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    console.log(`Middleware: Allowing ${normalizedRole} access to Tilo`)
    return NextResponse.next()
  }

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
