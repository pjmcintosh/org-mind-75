"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { Crown, BarChart3, Users, FileCheck, TrendingUp, Settings, LogOut, Home } from "lucide-react"
import { useEffect } from "react"
import { useRole } from "@/lib/context/role-context"
import { useRouter } from "next/navigation"

export default function CEOLayout({ children }: { children: ReactNode }) {
  const user = getCurrentUser()
  const pathname = usePathname()
  const { currentRole } = useRole()
  const router = useRouter()

  useEffect(() => {
    const normalizedRole = currentRole?.toLowerCase() || ""
    const isCEO = normalizedRole === "ceo"
    const isAdmin = normalizedRole === "admin"

    // Allow both CEO and Admin access
    if (!isCEO && !isAdmin) {
      console.log(`CEO Layout: Redirecting ${normalizedRole} - access denied`)
      router.push("/unauthorized")
      return
    }

    console.log(`CEO Layout: Allowing ${normalizedRole} access`)
  }, [currentRole, router])

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] flex">
      {/* CEO Sidebar */}
      <aside className="w-64 bg-[#0f1a2c]/90 border-r border-cyan-500/20 backdrop-blur-sm">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-semibold text-cyan-400">Ephrya</span>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs ml-2">
              {currentRole?.toUpperCase()}
            </Badge>
          </div>

          {/* User Info */}
          <div className="mb-6 p-3 bg-[#101d34]/50 rounded-lg border border-yellow-500/20">
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-yellow-300 text-xs">{currentRole?.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-blue-300 text-xs uppercase tracking-widest px-3 mt-4 mb-2">Executive Dashboard</p>

            <Link href="/admin/ceo">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/ceo") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <Crown className="h-4 w-4 mr-3" />
                CEO Dashboard
              </Button>
            </Link>

            <Link href="/admin/dashboard">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/dashboard") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <Home className="h-4 w-4 mr-3" />
                System Overview
              </Button>
            </Link>

            <p className="text-blue-300 text-xs uppercase tracking-widest px-3 mt-4 mb-2">Analytics</p>

            <Link href="/admin/agent-monitoring">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/agent-monitoring") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Agent Performance
              </Button>
            </Link>

            <Link href="/admin/engagement-log">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/engagement-log") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-3" />
                Engagement Analytics
              </Button>
            </Link>

            <p className="text-blue-300 text-xs uppercase tracking-widest px-3 mt-4 mb-2">Governance</p>

            <Link href="/admin/auth/roles">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/auth/roles") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <Users className="h-4 w-4 mr-3" />
                Role Management
              </Button>
            </Link>

            <Link href="/admin/exports">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/exports") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <FileCheck className="h-4 w-4 mr-3" />
                Export Center
              </Button>
            </Link>

            <Link href="/admin/agent-settings">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/admin/agent-settings") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <Settings className="h-4 w-4 mr-3" />
                Agent Settings
              </Button>
            </Link>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-300 hover:text-cyan-300 hover:bg-cyan-500/10"
              onClick={() => router.push("/")}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 text-white overflow-x-hidden">{children}</main>
    </div>
  )
}
