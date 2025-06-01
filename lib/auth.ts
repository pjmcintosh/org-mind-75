"use client"

import { AVAILABLE_ROLES } from "@/lib/context/role-context"

export type UserRole = (typeof AVAILABLE_ROLES)[number]

export interface User {
  name: string
  email: string
  role: UserRole
  impersonated: boolean
}

// Mock users for testing different roles
const MOCK_USERS: Record<string, User> = {
  admin: {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@elevateai.com",
    role: "admin",
    impersonated: false,
  },
  ceo: {
    name: "Michael Chen",
    email: "michael.chen@elevateai.com",
    role: "ceo",
    impersonated: false,
  },
  "mobile ceo": {
    name: "Michael Chen",
    email: "michael.chen@elevateai.com",
    role: "mobile ceo",
    impersonated: false,
  },
  client: {
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    role: "client",
    impersonated: false,
  },
  "new client": {
    name: "David Kim",
    email: "david.kim@startup.io",
    role: "new client",
    impersonated: false,
  },
}

// Returns mock user based on environment or hardcoded test
export function getCurrentUser(): User {
  // Check for role override in localStorage (for testing)
  if (typeof window !== "undefined") {
    const overrideRole = localStorage.getItem("tilo-current-role") || localStorage.getItem("tilo-test-role")
    if (overrideRole) {
      const normalizedRole = overrideRole.toLowerCase() as UserRole

      // Handle mobile CEO as a special case
      if (normalizedRole === "mobile ceo") {
        return {
          ...MOCK_USERS["ceo"],
          role: "mobile ceo",
        }
      }

      if (MOCK_USERS[normalizedRole]) {
        const user = { ...MOCK_USERS[normalizedRole] }

        // Check if this is an impersonation session
        const isImpersonating = localStorage.getItem("tilo-impersonating") === "true"
        if (isImpersonating) {
          user.impersonated = true
        }

        return user
      }
    }
  }

  // Default to Client role for demo
  return MOCK_USERS["client"]
}

// Mock function to get current user role
export function getCurrentUserRole(): UserRole | null {
  if (typeof window !== "undefined") {
    const storedRole = localStorage.getItem("tilo-current-role") || localStorage.getItem("tilo-test-role")
    if (storedRole) {
      const normalizedRole = storedRole.toLowerCase() as UserRole
      if (AVAILABLE_ROLES.includes(normalizedRole)) {
        return normalizedRole
      }
    }
  }

  return getCurrentUser().role
}

// Helper functions for role checking
export function isAdmin(): boolean {
  return getCurrentUser().role.toLowerCase() === "admin"
}

export function isClient(): boolean {
  const role = getCurrentUser().role.toLowerCase()
  return role === "client" || role === "new client"
}

export function isCEO(): boolean {
  const role = getCurrentUser().role.toLowerCase()
  return role === "ceo" || role === "mobile ceo"
}

export function isNewClient(): boolean {
  return getCurrentUser().role.toLowerCase() === "new client"
}

export function getUserRole(): UserRole {
  return getCurrentUser().role
}

export function isImpersonated(): boolean {
  return getCurrentUser().impersonated
}

// Mock function to switch roles (for testing)
export function switchToRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    const normalizedRole = role.toLowerCase()
    localStorage.setItem("tilo-test-role", normalizedRole)
    localStorage.setItem("tilo-current-role", normalizedRole)
    localStorage.setItem("ephrya-user-role", normalizedRole)

    // Set mobile demo flag for mobile CEO
    if (normalizedRole === "mobile ceo") {
      localStorage.setItem("tilo-mobile-demo", "true")
    } else {
      localStorage.removeItem("tilo-mobile-demo")
    }

    console.log(`Auth: Switched to role ${normalizedRole}`)
  }
}

// Mock function to start impersonation (admin feature)
export function startImpersonation(targetRole: UserRole): void {
  if (typeof window !== "undefined" && isAdmin()) {
    const normalizedRole = targetRole.toLowerCase()
    localStorage.setItem("tilo-test-role", normalizedRole)
    localStorage.setItem("tilo-current-role", normalizedRole)
    localStorage.setItem("ephrya-user-role", normalizedRole)
    localStorage.setItem("tilo-impersonating", "true")
    console.log(`Auth: Started impersonating ${normalizedRole}`)
  }
}

// Mock function to stop impersonation
export function stopImpersonation(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("tilo-test-role", "admin")
    localStorage.setItem("tilo-current-role", "admin")
    localStorage.setItem("ephrya-user-role", "admin")
    localStorage.removeItem("tilo-impersonating")
    console.log("Auth: Stopped impersonation")
  }
}

// Get user permissions based on role
export function getUserPermissions() {
  const role = getUserRole().toLowerCase()
  const isMobileCEO = role === "mobile ceo"

  const permissions = {
    canViewAdminPanel: role === "admin" || role === "ceo" || isMobileCEO,
    canManageAgents: role === "admin",
    canViewReports: role === "admin" || role === "ceo" || isMobileCEO,
    canApproveProjects: role === "ceo" || isMobileCEO,
    canSubmitProjects: role === "client" || role === "new client",
    canViewOwnProjects: true,
    canImpersonate: role === "admin",
    canAccessTilo: true,
    canViewSystemStatus: role === "admin" || role === "ceo" || isMobileCEO,
  }

  return permissions
}

// Mock function for checking if user has completed onboarding
export function hasCompletedOnboarding(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("tilo-onboarding-complete") === "true"
  }
  return false
}

// Mock function to complete onboarding
export function completeOnboarding(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("tilo-onboarding-complete", "true")
    console.log("Auth: Onboarding completed")
  }
}

// Mock function to set user role (for development)
export function setUserRole(role: UserRole): void {
  switchToRole(role)
}

console.log("Loaded: Auth utility with case-insensitive RBAC and mobile CEO support")
