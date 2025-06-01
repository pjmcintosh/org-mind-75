"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available roles in the Ephrya platform
export const AVAILABLE_ROLES = [
  "ceo",
  "admin",
  "client",
  "new client",
  "analyst",
  "developer",
  "hr",
  "finance",
  "legal",
  "mobile ceo", // Added Mobile CEO role
] as const

export type Role = (typeof AVAILABLE_ROLES)[number]

interface RoleContextType {
  currentRole: Role
  setRole: (role: Role) => void
  isLoading: boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

interface RoleProviderProps {
  children: ReactNode
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [currentRole, setCurrentRole] = useState<Role>("admin")
  const [isLoading, setIsLoading] = useState(true)

  // Load role from localStorage on mount
  useEffect(() => {
    console.log("RoleProvider: Initializing role context")

    try {
      const savedRole = localStorage.getItem("ephrya-user-role")
      if (savedRole) {
        const normalizedRole = savedRole.toLowerCase() as Role
        if (AVAILABLE_ROLES.includes(normalizedRole)) {
          setCurrentRole(normalizedRole)
          console.log(`RoleProvider: Loaded role from localStorage: ${normalizedRole}`)
        } else {
          console.log("RoleProvider: No valid saved role, defaulting to admin")
          localStorage.setItem("ephrya-user-role", "admin")
          setCurrentRole("admin")
        }
      } else {
        console.log("RoleProvider: No saved role, defaulting to admin")
        localStorage.setItem("ephrya-user-role", "admin")
        setCurrentRole("admin")
      }
    } catch (error) {
      console.warn("RoleProvider: Failed to load from localStorage, using default admin role")
      setCurrentRole("admin")
    }

    setIsLoading(false)
  }, [])

  const setRole = (role: Role) => {
    const normalizedRole = role.toLowerCase() as Role
    console.log(`RoleProvider: Setting role to ${normalizedRole}`)
    setCurrentRole(normalizedRole)

    try {
      localStorage.setItem("ephrya-user-role", normalizedRole)
      console.log(`RoleProvider: Role ${normalizedRole} saved to localStorage`)
    } catch (error) {
      console.warn("RoleProvider: Failed to save role to localStorage")
    }
  }

  const value: RoleContextType = {
    currentRole,
    setRole,
    isLoading,
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole(): RoleContextType {
  const context = useContext(RoleContext)

  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }

  return context
}

// Helper function to check if user has specific role
export function hasRole(requiredRole: Role, currentRole: Role): boolean {
  const normalizedRequired = requiredRole.toLowerCase()
  const normalizedCurrent = currentRole.toLowerCase()

  // CEO has access to everything
  if (normalizedCurrent === "ceo") return true

  // Admin has access to most things except CEO-specific features
  if (normalizedCurrent === "admin" && normalizedRequired !== "ceo") return true

  // Exact role match
  return normalizedCurrent === normalizedRequired
}

// Helper function to check if user can access admin features
export function canAccessAdmin(role: Role): boolean {
  const normalizedRole = role.toLowerCase()
  return ["ceo", "admin", "analyst", "developer", "hr", "finance", "legal"].includes(normalizedRole)
}

// Helper function to get role display info
export function getRoleInfo(role: Role) {
  // Convert to proper case for display
  const displayRole = role.charAt(0).toUpperCase() + role.slice(1)

  const roleInfo = {
    ceo: {
      label: "Chief Executive Officer",
      description: "Full platform access and executive oversight",
      color: "bg-purple-100 text-purple-800",
      icon: "👑",
    },
    admin: {
      label: "Administrator",
      description: "Platform administration and user management",
      color: "bg-blue-100 text-blue-800",
      icon: "🛡️",
    },
    client: {
      label: "Client",
      description: "Client intake and assessment access",
      color: "bg-green-100 text-green-800",
      icon: "👤",
    },
    "new client": {
      label: "New Client",
      description: "First-time client starting intake process",
      color: "bg-emerald-100 text-emerald-800",
      icon: "✨",
    },
    analyst: {
      label: "Business Analyst",
      description: "Data analysis and reporting access",
      color: "bg-orange-100 text-orange-800",
      icon: "📊",
    },
    developer: {
      label: "Developer",
      description: "Technical tools and system configuration",
      color: "bg-gray-100 text-gray-800",
      icon: "💻",
    },
    hr: {
      label: "Human Resources",
      description: "HR tools and employee management",
      color: "bg-pink-100 text-pink-800",
      icon: "👥",
    },
    finance: {
      label: "Finance",
      description: "Financial tools and budget management",
      color: "bg-emerald-100 text-emerald-800",
      icon: "💰",
    },
    legal: {
      label: "Legal",
      description: "Legal document management and compliance",
      color: "bg-indigo-100 text-indigo-800",
      icon: "⚖️",
    },
    "mobile ceo": {
      label: "Mobile CEO",
      description: "Mobile executive experience",
      color: "bg-cyan-100 text-cyan-800",
      icon: "📱",
    },
  }

  return roleInfo[role.toLowerCase() as keyof typeof roleInfo] || roleInfo.admin
}

console.log("Loaded: RoleContext with normalized roles")
