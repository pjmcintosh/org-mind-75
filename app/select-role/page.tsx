"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole, AVAILABLE_ROLES, getRoleInfo } from "@/lib/context/role-context"
import { getCurrentUserRole, hasCompletedOnboarding } from "@/lib/auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import ClientTile from "@/components/select-role/ClientTile"
import AdminTile from "@/components/select-role/AdminTile"
import ClientSelectorCard from "@/components/select-role/ClientSelectorCard"
import NewClientTile from "@/components/select-role/NewClientTile"
import { Smartphone, ArrowRight, Volume2, MessageCircle } from "lucide-react"

// Role-based redirect logic
function useRoleBasedRedirect() {
  const router = useRouter()

  useEffect(() => {
    const currentRole = getCurrentUserRole()
    const onboardingComplete = hasCompletedOnboarding()

    // Only redirect if user has a role and has completed onboarding
    if (currentRole && onboardingComplete) {
      let destination = ""
      const normalizedRole = currentRole.toLowerCase()

      switch (normalizedRole) {
        case "admin":
        case "internal staff":
          destination = "/admin/dashboard"
          break
        case "ceo":
          destination = "/admin/ceo"
          break
        case "client":
          destination = "/client/dashboard"
          break
        case "new client":
          destination = "/client/intake"
          break
        default:
          console.warn("Unknown role for redirect:", currentRole)
          return
      }

      console.log(`Redirected: ${currentRole} → ${destination}`)
      router.push(destination)
    } else if (currentRole && !onboardingComplete) {
      console.log(`Role detected (${currentRole}) but onboarding incomplete - showing role selection`)
    } else {
      console.log("No role detected - showing role selection interface")
    }
  }, [router])
}

// Role Switcher Component (Development Only)
function RoleSwitcher() {
  const { currentRole, setRole } = useRole()

  const handleRoleChange = (newRole: string) => {
    console.log(`Selected role: ${newRole}`)
    const normalizedRole = newRole.toLowerCase()
    setRole(normalizedRole as any)

    // Also set in the test role storage for consistency
    if (typeof window !== "undefined") {
      localStorage.setItem("tilo-test-role", normalizedRole)
      localStorage.setItem("tilo-current-role", normalizedRole)
    }

    console.log(`Role set to ${normalizedRole}`)
  }

  return (
    <Card className="mb-8 bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-cyan-400">Development Role Switcher</h3>
            <p className="text-sm text-blue-300">Switch between roles to test different access levels</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Current Role:</span>
            <Select value={currentRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {AVAILABLE_ROLES.map((role) => {
                  const info = getRoleInfo(role)
                  return (
                    <SelectItem key={role} value={role} className="text-white hover:bg-slate-700">
                      <span className="flex items-center gap-2">
                        {info.icon}
                        <span>{role}</span>
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SelectRolePage() {
  const { currentRole } = useRole()
  const router = useRouter()

  // Apply role-based redirect logic
  useRoleBasedRedirect()

  console.log(`Current Role: ${currentRole}`)

  // Normalize role for comparisons
  const normalizedRole = currentRole.toLowerCase()

  // Determine which tiles to show based on role
  const showNewClientTile = normalizedRole === "new client"
  const showClientTile = normalizedRole === "client"
  const showAdminClientSelector = normalizedRole === "admin"
  const showAdminTile = normalizedRole !== "client" && normalizedRole !== "new client"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Welcome Banner */}
        <Card className="text-center mb-8 bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl">
          <CardContent className="py-6 px-8">
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">Welcome to Organizational Mind</h2>
            <p className="text-blue-300 max-w-2xl mx-auto">
              An AI-powered platform for organizational strategy, operations, and insight. Coordinating multiple agents
              to deliver comprehensive analysis.
            </p>
          </CardContent>
        </Card>

        {/* Role Switcher (Development) */}
        <RoleSwitcher />

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl text-blue-300 max-w-2xl mx-auto">
            {showNewClientTile
              ? "Let's get started with your first AI project"
              : "Choose your role to access the appropriate dashboard and tools"}
          </p>
        </div>

        {/* Dynamic Role-Based Dashboard Tiles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* New Client Onboarding Tile - Show for New Clients only */}
          {showNewClientTile && (
            <div className="md:col-span-2 max-w-lg mx-auto">
              <NewClientTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
            </div>
          )}

          {/* Client Dashboard Tile - Show for Clients only */}
          {showClientTile && (
            <ClientTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
          )}

          {/* Admin Client Selector - Show for Admins only */}
          {showAdminClientSelector && (
            <ClientSelectorCard className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
          )}

          {/* Admin Dashboard Tile - Show for all non-Client roles */}
          {showAdminTile && (
            <AdminTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
          )}

          {/* Demo Mobile CEO Tile - Show for development/testing */}
          <div className="md:col-span-2 max-w-lg mx-auto">
            <Card
              className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500/20 backdrop-blur-sm text-white p-6 rounded-xl cursor-pointer hover:from-purple-800/80 hover:to-indigo-800/80 transition-all duration-200"
              onClick={() => {
                // Set demo flags
                if (typeof window !== "undefined") {
                  localStorage.setItem("tilo-current-role", "CEO")
                  localStorage.setItem("tilo-mobile-demo", "true")
                }
                // Redirect to ask-tilo
                router.push("/admin/ask-tilo")
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-200">Demo Mobile CEO</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-purple-300">Mobile Experience</span>
                        <span className="px-2 py-1 bg-purple-600/50 rounded-full text-xs text-purple-200">Demo</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-purple-300 text-sm mb-4">
                  Simulates mobile app access with CEO briefing mode. Experience voice-first interaction and executive
                  status updates.
                </p>
                <div className="flex items-center gap-2 text-xs text-purple-400">
                  <Volume2 className="w-3 h-3" />
                  <span>Voice-only interface</span>
                  <span>•</span>
                  <MessageCircle className="w-3 h-3" />
                  <span>Executive briefings</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-blue-300">
            Need help? Contact support at{" "}
            <a href="mailto:support@tilo.com" className="text-cyan-400 hover:text-cyan-300 underline">
              support@tilo.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

console.log("Loaded: SelectRolePage with case-insensitive redirect logic")
