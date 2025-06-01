import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get role from cookie or header (mock implementation)
  const role = request.cookies.get("ephrya-user-role")?.value || "admin"
  const normalizedRole = role.toLowerCase()

  console.log(`Middleware: ${pathname} accessed by role: ${normalizedRole}`)

  // CEO Dashboard access - Allow both CEO and Admin
  if (pathname.startsWith("/admin/ceo")) {
    if (normalizedRole !== "ceo" && normalizedRole !== "admin") {
      console.log(`Middleware: Blocking ${normalizedRole} from CEO dashboard`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    console.log(`Middleware: Allowing ${normalizedRole} access to CEO dashboard`)
    return NextResponse.next()
  }

  // Admin routes - Allow admin and CEO
  if (pathname.startsWith("/admin")) {
    if (!["admin", "ceo", "developer", "analyst"].includes(normalizedRole)) {
      console.log(`Middleware: Blocking ${normalizedRole} from admin routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
    return NextResponse.next()
  }

  // Client routes
  if (pathname.startsWith("/client")) {
    if (!["client", "new client", "admin", "ceo"].includes(normalizedRole)) {
      console.log(`Middleware: Blocking ${normalizedRole} from client routes`)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
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
