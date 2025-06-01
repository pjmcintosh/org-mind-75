"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldX, ArrowLeft, Home } from "lucide-react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>("unknown")

  useEffect(() => {
    // Get role from multiple possible sources
    const roleFromStorage =
      localStorage.getItem("tilo-current-role") ||
      localStorage.getItem("ephrya-user-role") ||
      localStorage.getItem("tilo-test-role")

    setUserRole(roleFromStorage || "unknown")
  }, [])

  const handleGoBack = () => {
    const normalizedRole = userRole.toLowerCase()

    // Smart fallback based on role
    if (normalizedRole === "mobile ceo" || normalizedRole === "ceo") {
      router.push("/admin/ceo")
    } else if (normalizedRole === "admin") {
      router.push("/admin/dashboard")
    } else if (normalizedRole === "client") {
      router.push("/client/dashboard")
    } else if (normalizedRole === "new client") {
      router.push("/client/intake")
    } else {
      // Default fallback
      router.push("/select-role")
    }
  }

  const handleGoHome = () => {
    router.push("/select-role")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h1>
          <p className="text-slate-300 mb-4">You don't have permission to access this resource.</p>

          <p className="text-sm text-slate-400 mb-8">
            This page requires elevated privileges. Please contact your administrator if you believe this is an error.
          </p>

          <div className="space-y-3">
            <Button onClick={handleGoBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Role Selection
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-600">
            <p className="text-xs text-slate-500">
              Detected role: <span className="text-slate-400 font-mono">{userRole}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Current path: <span className="text-slate-400 font-mono">{window.location.pathname}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
