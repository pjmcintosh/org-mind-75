"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { ParticleBackground } from "./particle-background"
import { AdminSidebar, AdminMobileHeader } from "./admin-sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  const isLogin = pathname === "/login"
  const isSelectRole = pathname === "/select-role"
  const isUnauthorized = pathname === "/unauthorized"
  const isRoot = pathname === "/"
  const isAdminPath = pathname?.startsWith("/admin")
  const isClientPath = pathname?.startsWith("/client")

  // Special pages with particle background
  if (isLogin) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 overflow-hidden">
        <ParticleBackground className="opacity-30" />
        <main className="relative z-10">{children}</main>
      </div>
    )
  }

  // Root page, select role, unauthorized - simple layout
  if (isRoot || isSelectRole || isUnauthorized) {
    return (
      <div className="min-h-screen">
        <main className="relative z-10">{children}</main>
      </div>
    )
  }

  // Admin and Client pages with sidebar
  if (isAdminPath || isClientPath) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34]">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:pl-64">
          {/* Mobile header */}
          <AdminMobileHeader />

          {/* Main content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    )
  }

  // Default layout for any other pages
  return (
    <div className="min-h-screen">
      <main className="relative z-10">{children}</main>
    </div>
  )
}
