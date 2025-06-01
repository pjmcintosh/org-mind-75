"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>("unknown")

  useEffect(() => {
    // Get the user role from multiple possible storage locations
    if (typeof window !== "undefined") {
      const role =
        localStorage.getItem("tilo-current-role") ||
        localStorage.getItem("ephrya-user-role") ||
        document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("ephrya-user-role="))
          ?.split("=")[1] ||
        "unknown"

      setUserRole(role)
      console.log(`Unauthorized page: Detected role as ${role}`)
    }
  }, [])

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to appropriate dashboard based on role
      const normalizedRole = userRole.toLowerCase()
      if (normalizedRole === "client" || normalizedRole === "new client") {
        router.push("/client/dashboard")
      } else if (normalizedRole === "mobile ceo" || normalizedRole === "ceo") {
        router.push("/admin/ceo")
      } else if (normalizedRole === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/select-role")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] flex items-center justify-center p-6">
      <Card className="bg-[#0f1a2c]/80 border border-red-500/20 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <Shield className="h-6 w-6 text-red-400" />
          </div>
          <CardTitle className="text-red-400">Access Denied</CardTitle>
          <CardDescription className="text-blue-300">
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-300 text-sm">
            This page requires elevated privileges. Please contact your administrator if you believe this is an error.
          </p>
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <p className="text-xs text-gray-400 mt-4">Detected role: {userRole}</p>
        </CardContent>
      </Card>
    </div>
  )
}
