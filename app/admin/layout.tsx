"use client"

import type React from "react"
import { useEffect } from "react"
import { useRole } from "@/lib/context/role-context"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentRole } = useRole()
  const router = useRouter()

  useEffect(() => {
    const normalizedRole = currentRole?.toLowerCase() || ""

    // Allow admin, ceo, developer, analyst roles
    const allowedRoles = ["admin", "ceo", "developer", "analyst"]

    if (!allowedRoles.includes(normalizedRole)) {
      console.log(`Admin Layout: Redirecting ${normalizedRole} - access denied`)
      router.push("/unauthorized")
      return
    }

    console.log(`Admin Layout: Allowing ${normalizedRole} access to admin area`)
  }, [currentRole, router])

  // Just return children - layout is handled by LayoutWrapper
  return <>{children}</>
}
