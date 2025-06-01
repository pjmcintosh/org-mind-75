"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, CheckCircle, Lightbulb, FileText, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { useMockData } from "@/lib/context/mock-data-context"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-500/20 text-green-400 border-green-400/30"
    case "under_review":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
    case "in_progress":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "submitted":
      return "bg-purple-500/20 text-purple-400 border-purple-400/30"
    case "completed":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-400/30"
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-400/30"
  }
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

export default function ClientDashboardPage() {
  console.log("Loaded: ClientDashboardPage")

  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const { projectSubmissions, agentInsights, userRoles } = useMockData()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Normalize role for comparisons
  const normalizedRole = currentRole.toLowerCase()

  // Check if admin is impersonating a client
  const impersonatingClientEmail = searchParams.get("client")
  const isAdminImpersonating = normalizedRole === "admin" && impersonatingClientEmail

  // Find the impersonated client
  const impersonatedClient = useMemo(() => {
    if (!isAdminImpersonating) return null
    return userRoles.find((user) => user.email === impersonatingClientEmail && user.role.toLowerCase() === "client")
  }, [isAdminImpersonating, impersonatingClientEmail, userRoles])

  // Log admin impersonation
  useEffect(() => {
    if (isAdminImpersonating && impersonatedClient) {
      console.log(`Admin impersonating client: ${impersonatedClient.email}`)
    }
  }, [isAdminImpersonating, impersonatedClient])

  // Redirect logic - only redirect if not a client and not admin impersonating
  useEffect(() => {
    if (normalizedRole !== "client" && !isAdminImpersonating) {
      console.log(`Non-client role ${currentRole} accessing client dashboard, redirecting to admin`)
      router.push("/admin/dashboard")
    }
  }, [normalizedRole, isAdminImpersonating, router, currentRole])

  // Determine which client data to show
  const displayClient =
    isAdminImpersonating && impersonatedClient
      ? {
          name: impersonatedClient.name,
          company: impersonatedClient.department || "Unknown Company",
          avatar: "/placeholder.svg?height=40&width=40",
          email: impersonatedClient.email,
        }
      : {
          name: "Sarah Johnson",
          company: "TechFlow Solutions",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "sarah.johnson@techcorp.com",
        }

  // Filter data for the displayed client
  const clientSubmissions = projectSubmissions.filter(
    (submission) => submission.clientEmail === displayClient.email || submission.clientName === displayClient.name,
  )

  const clientInsights = agentInsights
    .filter((insight) => ["Ephrya", "Bob", "Shandry"].includes(insight.sourceAgent))
    .slice(0, 3)

  // Show access restricted for non-clients who aren't impersonating
  if (normalizedRole !== "client" && !isAdminImpersonating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] flex items-center justify-center">
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-cyan-400">Access Restricted</CardTitle>
            <CardDescription className="text-blue-300">This page is only accessible to Client users.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto space-y-6">
        {/* Role Indicator */}
        <div className="flex items-center justify-between">
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Viewing as {roleInfo.label}</Badge>
          {isAdminImpersonating && (
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Admin impersonating: {displayClient.name}
            </Badge>
          )}
        </div>

        {/* Welcome Banner */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 p-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={displayClient.avatar || "/placeholder.svg"} alt={displayClient.name} />
                  <AvatarFallback className="bg-cyan-500/20 text-cyan-400">
                    {displayClient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-2xl font-bold">
                    Welcome back, {displayClient.name}
                  </CardTitle>
                  <CardDescription className="text-blue-300">{displayClient.company}</CardDescription>
                </div>
              </div>
              <Badge className="bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded">
                🧠 Ephrya monitoring your submissions
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-cyan-400 text-lg font-semibold">Total Projects</CardTitle>
              <FileText className="h-5 w-5 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold">{clientSubmissions.length}</div>
              <p className="text-blue-300 text-sm">Active submissions</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-cyan-400 text-lg font-semibold">Completion Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold">
                {clientSubmissions.length > 0
                  ? Math.round(
                      (clientSubmissions.filter((s) => s.status === "completed").length / clientSubmissions.length) *
                        100,
                    )
                  : 0}
                %
              </div>
              <p className="text-blue-300 text-sm">Projects completed</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-cyan-400 text-lg font-semibold">Avg. Confidence</CardTitle>
              <CheckCircle className="h-5 w-5 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-white text-2xl font-bold">
                {clientSubmissions.length > 0
                  ? Math.round(
                      clientSubmissions.reduce((acc, s) => acc + s.confidenceScore, 0) / clientSubmissions.length,
                    )
                  : 0}
                %
              </div>
              <p className="text-blue-300 text-sm">Project confidence score</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submission History */}
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Submission History</span>
              </CardTitle>
              <CardDescription className="text-blue-300">Recent project submissions and their status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientSubmissions.length > 0 ? (
                clientSubmissions.map((submission) => (
                  <div key={submission.id} className="bg-[#101d34]/90 border border-cyan-500/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{submission.projectName}</h3>
                      <Badge className={getStatusColor(submission.status)}>{formatStatus(submission.status)}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-blue-300">
                        <CalendarDays className="h-4 w-4" />
                        <span>{new Date(submission.submissionDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-300">Agent:</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {submission.assignedAgent}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-300 text-sm">Confidence:</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {submission.confidenceScore}%
                        </Badge>
                      </div>
                      <Link href="/client/review-summary">
                        <Button className="bg-cyan-600 text-white hover:bg-cyan-500 rounded-md" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-blue-300">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No project submissions found for this client.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Recent AI Insights</span>
              </CardTitle>
              <CardDescription className="text-blue-300">
                Ephrya-generated recommendations for your projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientInsights.map((insight) => (
                <div key={insight.id} className="bg-[#101d34]/90 border border-cyan-500/10 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{insight.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                          {insight.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-blue-300">
                          <span className="text-cyan-300 text-sm">From: {insight.sourceAgent}</span>
                          <span>•</span>
                          <span>Confidence: {insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
