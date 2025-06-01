// Role-based access control utilities

import { getCurrentUserRole } from "@/lib/auth"

// Define role types
export type Role =
  | "admin"
  | "ceo"
  | "client"
  | "new client"
  | "analyst"
  | "developer"
  | "hr"
  | "finance"
  | "legal"
  | "mobile ceo"

// Define feature access types
export type TiloFeature = "basic" | "advanced" | "admin" | "ceo" | "mobile"

// Check if user can access a specific Tilo feature
export function canUseTiloFeature(role: Role, feature: TiloFeature): boolean {
  const normalizedRole = role.toLowerCase() as Role

  // Treat mobile CEO as equivalent to CEO for permissions
  const effectiveRole = normalizedRole === "mobile ceo" ? "ceo" : normalizedRole

  switch (feature) {
    case "basic":
      // All roles can access basic features
      return true
    case "advanced":
      // Admin, CEO, and mobile CEO can access advanced features
      return ["admin", "ceo"].includes(effectiveRole)
    case "admin":
      // Only admin can access admin features
      return effectiveRole === "admin"
    case "ceo":
      // Only CEO and mobile CEO can access CEO features
      return effectiveRole === "ceo"
    case "mobile":
      // Only mobile CEO can access mobile-specific features
      return normalizedRole === "mobile ceo"
    default:
      return false
  }
}

// Check if user has a specific role
export function hasRole(role: Role): boolean {
  const currentRole = getCurrentUserRole()
  if (!currentRole) return false

  const normalizedCurrentRole = currentRole.toLowerCase() as Role
  const normalizedRole = role.toLowerCase() as Role

  // Special case: mobile CEO has CEO permissions
  if (normalizedRole === "ceo" && normalizedCurrentRole === "mobile ceo") {
    return true
  }

  return normalizedCurrentRole === normalizedRole
}

// Check if user can access a specific route
export function canAccessRoute(route: string): boolean {
  const currentRole = getCurrentUserRole()
  if (!currentRole) return false

  const normalizedRole = currentRole.toLowerCase() as Role

  // Treat mobile CEO as equivalent to CEO for route access
  const effectiveRole = normalizedRole === "mobile ceo" ? "ceo" : normalizedRole

  // Admin can access everything
  if (effectiveRole === "admin") return true

  // CEO routes
  if (route.startsWith("/admin/ceo")) {
    return effectiveRole === "ceo"
  }

  // Admin routes
  if (route.startsWith("/admin")) {
    return ["admin", "ceo"].includes(effectiveRole)
  }

  // Client routes
  if (route.startsWith("/client")) {
    return ["client", "new client", "admin", "ceo"].includes(effectiveRole)
  }

  // Tilo routes
  if (route.startsWith("/ask-tilo")) {
    return true // Everyone can access Tilo
  }

  return true // Default to allowing access
}

// Force set the role in all storage mechanisms
export function forceSetRole(role: Role): void {
  if (typeof window === "undefined") return

  const normalizedRole = role.toLowerCase() as Role

  // Set in localStorage
  localStorage.setItem("tilo-current-role", normalizedRole)
  localStorage.setItem("tilo-test-role", normalizedRole)
  localStorage.setItem("ephrya-user-role", normalizedRole)

  // Set in cookie
  document.cookie = `ephrya-user-role=${normalizedRole}; path=/; max-age=86400`

  // Set mobile demo flag for mobile CEO
  if (normalizedRole === "mobile ceo") {
    localStorage.setItem("tilo-mobile-demo", "true")
  } else {
    localStorage.removeItem("tilo-mobile-demo")
  }

  console.log(`Force set role to ${normalizedRole} in all storage mechanisms`)
}
