// Extract role-specific logic from auth.ts
import type { UserRole } from "./auth"

export const ROLE_PERMISSIONS = {
  admin: ["*"],
  ceo: ["dashboard.*", "approvals.*", "reports.*"],
  client: ["client.*", "projects.*"],
  "new client": ["client.*", "onboarding.*"],
} as const

export const ROLE_ROUTES = {
  admin: "/admin",
  ceo: "/admin/ceo",
  client: "/client",
  "new client": "/client/intake",
} as const

export function getRoleRoute(role: UserRole): string {
  return ROLE_ROUTES[role] || "/select-role"
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || []
  return permissions.includes("*") || permissions.some((p) => permission.startsWith(p.replace("*", "")))
}
