"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/lib/context/role-context"

export function getDashboardPathByRole(role: string): string {
  if (role === "Client") {
    return "/client/dashboard"
  }
  return "/admin/dashboard"
}

export function useRedirectToDashboard() {
  const router = useRouter()
  const { currentRole } = useRole()

  useEffect(() => {
    if (currentRole) {
      const dashboardPath = getDashboardPathByRole(currentRole)
      console.log(`Redirecting to dashboard for role: ${currentRole}`)
      router.push(dashboardPath)
    }
  }, [currentRole, router])
}
