"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/lib/context/role-context"
import { getCurrentUserRole, hasCompletedOnboarding } from "@/lib/auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ClientTile from "@/components/select-role/ClientTile"
import AdminTile from "@/components/select-role/AdminTile"
import NewClientTile from "@/components/select-role/NewClientTile"
import { Smartphone, ArrowRight, Volume2, MessageCircle, User, Shield, Crown, UserPlus, Eye } from "lucide-react"
import { setUserRole } from "@/lib/auth/setUserRole"

// Define role options with personas
const roleOptions = [
  {
    label: "Admin (Tom Edmonds)",
    value: "admin",
    icon: Shield,
    description: "Full system access and client impersonation",
    persona: "Tom Edmonds - System Administrator",
  },
  {
    label: "CEO (Joe McIntosh)",
    value: "ceo",
    icon: Crown,
    description: "Executive dashboard and approvals",
    persona: "Joe McIntosh - Chief Executive Officer",
  },
  {
    label: "Mobile CEO",
    value: "mobile ceo", // Exact match for middleware
    icon: Smartphone,
    description: "Mobile executive experience",
    persona: "Joe McIntosh - Mobile CEO Experience",
  },
  {
    label: "New Client (TBD)",
    value: "new client",
    icon: UserPlus,
    description: "First-time client onboarding",
    persona: "New client going through intake process",
  },
  {
    label: "Existing Client",
    value: "client",
    icon: User,
    description: "Established client with projects",
    persona: "Select from existing client users below",
  },
]

// Define client users for simulation
const clientUsers = [
  {
    label: "Sarah Johnson",
    value: "sarah",
    company: "TechCorp Solutions",
    projects: 3,
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    label: "Jake Clark",
    value: "jake",
    company: "Innovation Labs",
    projects: 1,
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    label: "Robert Nash",
    value: "robert",
    company: "Global Dynamics",
    projects: 5,
    status: "Premium",
    lastLogin: "30 minutes ago",
  },
  {
    label: "Jen Smith",
    value: "jen",
    company: "StartupX",
    projects: 2,
    status: "Active",
    lastLogin: "3 days ago",
  },
]

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
          destination = "/admin/dashboard"
          break
        case "ceo":
          destination = "/admin/ceo"
          break
        case "mobile ceo":
          destination = "/admin/ask-tilo/desktop" // Direct to mobile experience
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
    }
  }, [router])
}

// Role and User Selector Component
function RoleUserSelector() {
  const { currentRole, setRole } = useRole()
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [impersonatedUser, setImpersonatedUser] = useState<string>("")
  const [cookieRole, setCookieRole] = useState<string>("unknown")

  useEffect(() => {
    // Load saved selections and cookie status
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("tilo-user")
      const savedImpersonation = localStorage.getItem("impersonated-user")

      // Check cookie status
      const cookieMatch = document.cookie.match(/ephrya-user-role=([^;]+)/)
      const currentCookieRole = cookieMatch?.[1] || "not set"

      if (savedUser) {
        setSelectedUser(savedUser)
      }
      if (savedImpersonation) {
        setImpersonatedUser(savedImpersonation)
      }

      setCookieRole(currentCookieRole)
    }
  }, [])

  const handleRoleChange = (newRole: string) => {
    console.log(`🎭 Selected role: ${newRole}`)
    const normalizedRole = newRole.toLowerCase()

    // Update context
    setRole(normalizedRole as any)

    // Set role in both localStorage and cookies
    setUserRole(normalizedRole)

    // Update cookie status display
    const cookieMatch = document.cookie.match(/ephrya-user-role=([^;]+)/)
    setCookieRole(cookieMatch?.[1] || "not set")

    // Clear user selection if switching away from client
    if (normalizedRole !== "client") {
      localStorage.removeItem("tilo-user")
      setSelectedUser("")
    }

    // Clear impersonation if switching away from admin
    if (normalizedRole !== "admin") {
      localStorage.removeItem("impersonated-user")
      setImpersonatedUser("")
    }

    console.log(`✅ Role set to ${normalizedRole}`)
  }

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId)
    if (typeof window !== "undefined") {
      localStorage.setItem("tilo-user", userId)
      console.log(`👤 User set to ${userId}`)
    }
  }

  const handleImpersonationChange = (userId: string) => {
    setImpersonatedUser(userId)
    if (typeof window !== "undefined") {
      if (userId) {
        localStorage.setItem("impersonated-user", userId)
        // Also set cookie for middleware
        document.cookie = `impersonated-user=${userId}; path=/; SameSite=Lax; max-age=86400`
        console.log(`👁️ Admin impersonating: ${userId}`)
      } else {
        localStorage.removeItem("impersonated-user")
        document.cookie = "impersonated-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        console.log(`👁️ Admin stopped impersonating`)
      }
    }
  }

  const selectedRoleOption = roleOptions.find((option) => option.value === currentRole)
  const selectedUserData = clientUsers.find((user) => user.value === selectedUser)
  const impersonatedUserData = clientUsers.find((user) => user.value === impersonatedUser)
  const isAdmin = currentRole === "admin"

  return (
    <Card className="mb-8 bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-cyan-400 mb-2">Role & User Simulation</h3>
            <p className="text-sm text-blue-300">
              Select a role and user persona to test different access levels and workflows
            </p>
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white">Select Role:</label>
            <Select value={currentRole} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Choose a role..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {roleOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-slate-400">{option.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Role Info */}
          {selectedRoleOption && (
            <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-600">
              <div className="flex items-center gap-2 mb-1">
                <selectedRoleOption.icon className="w-4 h-4 text-cyan-400" />
                <span className="font-medium text-cyan-400">Selected Role</span>
              </div>
              <p className="text-sm text-slate-300">{selectedRoleOption.persona}</p>
              <div className="mt-2 text-xs flex items-center gap-2">
                <span className="text-slate-400">Cookie:</span>
                <Badge variant={cookieRole !== "not set" ? "outline" : "destructive"} className="text-xs">
                  {cookieRole}
                </Badge>
              </div>
            </div>
          )}

          {/* Admin Impersonation */}
          {isAdmin && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-orange-400" />
                <label className="text-sm font-medium text-white">Admin Impersonation:</label>
                <Badge variant="outline" className="text-orange-400 border-orange-400">
                  Testing Mode
                </Badge>
              </div>
              <Select value={impersonatedUser} onValueChange={handleImpersonationChange}>
                <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select a client to impersonate..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="" className="text-white hover:bg-slate-700">
                    <span className="text-slate-400">No impersonation</span>
                  </SelectItem>
                  {clientUsers.map((user) => (
                    <SelectItem key={user.value} value={user.value} className="text-white hover:bg-slate-700">
                      <div>
                        <div className="font-medium">{user.label}</div>
                        <div className="text-xs text-slate-400">
                          {user.company} • {user.projects} projects • Last login: {user.lastLogin}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Impersonation Info */}
              {impersonatedUserData && (
                <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-orange-400" />
                    <span className="font-medium text-orange-400">Impersonating Client</span>
                  </div>
                  <div className="text-sm text-orange-200">
                    <div className="font-medium">{impersonatedUserData.label}</div>
                    <div className="text-xs text-orange-300">
                      {impersonatedUserData.company} • {impersonatedUserData.projects} active projects •{" "}
                      {impersonatedUserData.status} status
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-orange-300 bg-orange-900/30 p-2 rounded">
                    ⚠️ You are viewing as this client. All actions will be read-only for testing purposes.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Client User Selection (for non-admin roles) */}
          {currentRole === "client" && !isAdmin && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-white">Select Client User:</label>
              <Select value={selectedUser} onValueChange={handleUserChange}>
                <SelectTrigger className="w-full bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Choose a client user..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {clientUsers.map((user) => (
                    <SelectItem key={user.value} value={user.value} className="text-white hover:bg-slate-700">
                      <div>
                        <div className="font-medium">{user.label}</div>
                        <div className="text-xs text-slate-400">
                          {user.company} • {user.projects} projects • {user.status}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected User Info */}
              {selectedUserData && (
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-green-400" />
                    <span className="font-medium text-green-400">Selected User</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="font-medium">{selectedUserData.label}</div>
                    <div className="text-xs text-slate-400">
                      {selectedUserData.company} • {selectedUserData.projects} active projects •{" "}
                      {selectedUserData.status} status
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function SelectRolePage() {
  const { currentRole } = useRole()
  const router = useRouter()
  const [impersonatedUser, setImpersonatedUser] = useState<string>("")

  // Load impersonation state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedImpersonation = localStorage.getItem("impersonated-user")
      if (savedImpersonation) {
        setImpersonatedUser(savedImpersonation)
      }
    }
  }, [])

  // Apply role-based redirect logic
  useRoleBasedRedirect()

  console.log(`Current Role: ${currentRole}`)

  // Normalize role for comparisons
  const normalizedRole = currentRole.toLowerCase()
  const isAdmin = normalizedRole === "admin"
  const hasImpersonation = isAdmin && impersonatedUser

  // Determine which tiles to show based on role
  const showAdminDashboard = isAdmin && !hasImpersonation
  const showCEODashboard = normalizedRole === "ceo"
  const showDemoMobileCEO = normalizedRole === "mobile ceo"
  const showNewClientTile = normalizedRole === "new client"
  const showClientDashboardAccess = normalizedRole === "client" || hasImpersonation

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

        {/* Role and User Selector */}
        <RoleUserSelector />

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl text-blue-300 max-w-2xl mx-auto">
            {showNewClientTile
              ? "Let's get started with your first AI project"
              : hasImpersonation
                ? `Testing client experience as ${clientUsers.find((u) => u.value === impersonatedUser)?.label}`
                : "Access your role-specific dashboard and tools"}
          </p>
        </div>

        {/* Dynamic Role-Based Dashboard Tiles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Admin Dashboard - Show for Admin only (when not impersonating) */}
          {showAdminDashboard && (
            <AdminTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
          )}

          {/* CEO Dashboard - Show for CEO only */}
          {showCEODashboard && (
            <div className="md:col-span-2 max-w-lg mx-auto">
              <Card
                className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border border-blue-500/20 backdrop-blur-sm text-white p-6 rounded-xl cursor-pointer hover:from-blue-800/80 hover:to-indigo-800/80 transition-all duration-200"
                onClick={() => router.push("/admin/ceo")}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-200">CEO Dashboard</h3>
                        <span className="text-sm text-blue-300">Executive Overview</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-blue-300 text-sm">
                    Access executive briefings, approval queues, and strategic oversight tools.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Mobile CEO - Show for Mobile CEO only */}
          {showDemoMobileCEO && (
            <div className="md:col-span-2 max-w-lg mx-auto">
              <Card
                className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500/20 backdrop-blur-sm text-white p-6 rounded-xl cursor-pointer hover:from-purple-800/80 hover:to-indigo-800/80 transition-all duration-200"
                onClick={() => {
                  // Ensure cookie is set before redirect
                  setUserRole("mobile ceo")
                  router.push("/admin/ask-tilo/desktop")
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
          )}

          {/* New Client Onboarding - Show for New Clients only */}
          {showNewClientTile && (
            <div className="md:col-span-2 max-w-lg mx-auto">
              <NewClientTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
            </div>
          )}

          {/* Client Dashboard Access - Show for Existing Clients or Admin Impersonation */}
          {showClientDashboardAccess && (
            <div className="relative">
              {hasImpersonation && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-orange-500 text-white">
                    <Eye className="w-3 h-3 mr-1" />
                    Admin View
                  </Badge>
                </div>
              )}
              <ClientTile className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white p-6 rounded-xl" />
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg text-xs text-slate-400">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <strong>Role (localStorage):</strong>{" "}
              {typeof window !== "undefined" ? localStorage.getItem("tilo-current-role") : "N/A"}
            </div>
            <div>
              <strong>Role (cookie):</strong>{" "}
              {typeof document !== "undefined"
                ? document.cookie.match(/ephrya-user-role=([^;]+)/)?.[1] || "not set"
                : "N/A"}
            </div>
            <div>
              <strong>Impersonation:</strong>{" "}
              {typeof window !== "undefined" ? localStorage.getItem("impersonated-user") || "none" : "N/A"}
            </div>
            <div>
              <strong>Mobile Demo:</strong>{" "}
              {typeof window !== "undefined" ? localStorage.getItem("tilo-mobile-demo") || "false" : "N/A"}
            </div>
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

console.log("Loaded: SelectRolePage with cookie-based role storage for middleware")
