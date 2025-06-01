"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { Home, MessageSquare, FileText, PlusCircle, User, LogOut } from "lucide-react"

export default function ClientLayout({ children }: { children: ReactNode }) {
  console.log("Loaded: ClientLayout - Role-aware sidebar for Client/New Client")

  const user = getCurrentUser()
  const pathname = usePathname()

  // Normalize role for comparison
  const normalizedRole = user.role.toLowerCase()

  // Enforce role-based access
  if (!["client", "new client"].includes(normalizedRole)) {
    return <div>Access denied</div>
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f1a2c]/90 border-r border-cyan-500/20 backdrop-blur-sm">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-semibold text-cyan-400">Ephrya</span>
            <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400 ml-2">
              Client Portal
            </Badge>
          </div>

          {/* User Info */}
          <div className="mb-6 p-3 bg-[#101d34]/50 rounded-lg border border-cyan-500/10">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-cyan-400" />
              <div>
                <p className="text-white text-sm font-medium">{user.name}</p>
                <p className="text-blue-300 text-xs">{user.role}</p>
                {user.impersonated && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs mt-1">
                    Impersonated
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-blue-300 text-xs uppercase tracking-widest px-3 mt-4 mb-2">Navigation</p>

            <Link href="/client/dashboard">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/client/dashboard") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <Home className="h-4 w-4 mr-3" />
                Dashboard
              </Button>
            </Link>

            <Link href="/client/ephrya">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/client/ephrya") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <MessageSquare className="h-4 w-4 mr-3" />
                Chat with Ephrya
              </Button>
            </Link>

            <Link href="/client/review-summary">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/client/review-summary") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <FileText className="h-4 w-4 mr-3" />
                Review Summary
              </Button>
            </Link>

            <Link href="/client/intake">
              <Button
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-cyan-500/10 ${
                  isActive("/client/intake") ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400" : ""
                }`}
              >
                <PlusCircle className="h-4 w-4 mr-3" />
                New Intake
              </Button>
            </Link>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-300 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content - Remove any background overrides */}
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  )
}
