// Extract role-specific logic from auth.ts
import type { UserRole } from "./auth"

export const ROLE_PERMISSIONS = {
  admin: ["*"],
  ceo: ["dashboard.*", "approvals.*", "reports.*", "tilo.*"],
  client: ["client.*", "projects.*", "tilo.basic", "tilo.project_status", "tilo.help"],
  "new client": ["client.*", "onboarding.*", "tilo.basic", "tilo.help"],
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

export function canUseTiloFeature(role: UserRole, feature: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || []

  if (permissions.includes("*") || permissions.includes("tilo.*")) {
    return true
  }

  return permissions.includes(`tilo.${feature}`)
}
