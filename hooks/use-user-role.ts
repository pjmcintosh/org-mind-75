"use client"

import { useState, useEffect } from "react"

export type UserRole = "admin" | "client"

interface UserSession {
  role: UserRole
  name: string
  permissions: string[]
}

export function useUserRole(): UserSession {
  const [userSession, setUserSession] = useState<UserSession>({
    role: "admin", // Default for now
    name: "Admin User",
    permissions: ["view_all", "manage_agents", "export_data", "system_config"],
  })

  useEffect(() => {
    // Mock role detection logic - in real app, this would check auth/session
    const mockDetectRole = (): UserSession => {
      // Check if we're in admin routes
      const isAdminRoute = window.location.pathname.startsWith("/admin")

      if (isAdminRoute) {
        return {
          role: "admin",
          name: "Admin User",
          permissions: ["view_all", "manage_agents", "export_data", "system_config"],
        }
      } else {
        return {
          role: "client",
          name: "Client User",
          permissions: ["view_own", "submit_intake", "request_feedback"],
        }
      }
    }

    setUserSession(mockDetectRole())
  }, [])

  return userSession
}
