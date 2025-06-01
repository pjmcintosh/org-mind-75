"use client"

import { useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  role: string
  department: string
  permissions: string[]
}

// Mock user data for demonstration
const mockUsers: Record<string, User> = {
  admin: {
    id: "user-admin",
    name: "Admin User",
    role: "admin",
    department: "System",
    permissions: ["view_all", "manage_agents", "export_data", "system_config"],
  },
  finance: {
    id: "user-finance",
    name: "Finance Manager",
    role: "manager",
    department: "Finance",
    permissions: ["view_finance", "export_finance", "manage_budgets"],
  },
  hr: {
    id: "user-hr",
    name: "HR Specialist",
    role: "specialist",
    department: "HR",
    permissions: ["view_hr", "manage_employees", "onboarding"],
  },
  tech: {
    id: "user-tech",
    name: "Tech Lead",
    role: "tech",
    department: "Engineering",
    permissions: ["view_tech", "manage_prompts", "system_debug"],
  },
}

export function useUser(): User {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.admin)

  useEffect(() => {
    // Mock role detection based on route or localStorage
    const savedRole = localStorage.getItem("mock-user-role") || "admin"
    if (mockUsers[savedRole]) {
      setCurrentUser(mockUsers[savedRole])
    }
    console.log(`Current user role: ${currentUser.role}, department: ${currentUser.department}`)
  }, [currentUser.role, currentUser.department])

  return currentUser
}

// Helper function to switch user roles for testing
export function switchUserRole(role: keyof typeof mockUsers) {
  localStorage.setItem("mock-user-role", role)
  window.location.reload()
}
