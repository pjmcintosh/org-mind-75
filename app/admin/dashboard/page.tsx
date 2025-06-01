"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Activity, CheckCircle, Clock, Users, TrendingUp, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"

interface Project {
  id: string
  name: string
  status: "new" | "planning" | "in-progress" | "completed" | "on-hold"
  createdAt: string
}

interface AgentEvent {
  id: string
  agentName: "Bob" | "Ada" | "Max" | "Eve"
  eventType:
    | "INTAKE_COMPLETED"
    | "PLAN_CREATED"
    | "ASSESSMENT_STARTED"
    | "ALERT"
    | "REPORT_GENERATED"
    | "CLIENT_CONTACTED"
  timestamp: string
  projectId: string
}

interface SystemAlert {
  id: string
  timestamp: string
  projectId: string
  message: string
  severity: "high" | "medium" | "low"
}

interface SystemMetrics {
  totalProjects: number
  projectsNeedingReview: number
  agentUptime: number
  lastEveCheck: string
}

export default function AdminDashboard() {
  console.log("Loaded: AdminDashboard")

  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)

  const [projects] = useState<Project[]>([
    {
      id: "PRJ-001",
      name: "TechCorp Digital Transformation",
      status: "in-progress",
      createdAt: "2024-01-15T09:30:00Z",
    },
    {
      id: "PRJ-002",
      name: "HealthSystem Process Optimization",
      status: "completed",
      createdAt: "2024-01-12T14:20:00Z",
    },
    {
      id: "PRJ-003",
      name: "StartupXYZ Culture Assessment",
      status: "new",
      createdAt: "2024-01-20T11:45:00Z",
    },
    {
      id: "PRJ-004",
      name: "Manufacturing Inc Workflow Analysis",
      status: "planning",
      createdAt: "2024-01-18T16:15:00Z",
    },
    {
      id: "PRJ-005",
      name: "RetailChain Communication Audit",
      status: "on-hold",
      createdAt: "2024-01-10T08:00:00Z",
    },
    {
      id: "PRJ-006",
      name: "FinanceGroup Risk Assessment",
      status: "in-progress",
      createdAt: "2024-01-22T13:30:00Z",
    },
  ])

  const [agentEvents] = useState<AgentEvent[]>([
    {
      id: "EVT-001",
      agentName: "Bob",
      eventType: "INTAKE_COMPLETED",
      timestamp: "2024-01-22T15:45:00Z",
      projectId: "PRJ-006",
    },
    {
      id: "EVT-002",
      agentName: "Ada",
      eventType: "PLAN_CREATED",
      timestamp: "2024-01-22T14:30:00Z",
      projectId: "PRJ-004",
    },
    {
      id: "EVT-003",
      agentName: "Max",
      eventType: "ALERT",
      timestamp: "2024-01-22T13:15:00Z",
      projectId: "PRJ-005",
    },
    {
      id: "EVT-004",
      agentName: "Bob",
      eventType: "ASSESSMENT_STARTED",
      timestamp: "2024-01-22T12:00:00Z",
      projectId: "PRJ-003",
    },
    {
      id: "EVT-005",
      agentName: "Eve",
      eventType: "REPORT_GENERATED",
      timestamp: "2024-01-22T11:30:00Z",
      projectId: "PRJ-002",
    },
    {
      id: "EVT-006",
      agentName: "Ada",
      eventType: "CLIENT_CONTACTED",
      timestamp: "2024-01-22T10:45:00Z",
      projectId: "PRJ-001",
    },
  ])

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: "ALERT-001",
      timestamp: "2024-01-22T15:30:00Z",
      projectId: "PRJ-003",
      message: "Low confidence in intake data - requires manual review",
      severity: "high",
    },
    {
      id: "ALERT-002",
      timestamp: "2024-01-22T14:45:00Z",
      projectId: "PRJ-005",
      message: "Agent timeout detected during plan generation",
      severity: "high",
    },
    {
      id: "ALERT-003",
      timestamp: "2024-01-22T13:20:00Z",
      projectId: "PRJ-001",
      message: "Unusual client response pattern detected",
      severity: "medium",
    },
  ])

  const [systemMetrics] = useState<SystemMetrics>({
    totalProjects: projects.length,
    projectsNeedingReview: 3,
    agentUptime: 98.7,
    lastEveCheck: "2024-01-22T15:45:00Z",
  })

  const [showHelp, setShowHelp] = useState(false)

  // Normalize role for comparisons
  const normalizedRole = currentRole.toLowerCase()

  const getStatusBadgeVariant = (status: Project["status"]) => {
    switch (status) {
      case "new":
        return "bg-cyan-400/20 text-cyan-300 border border-cyan-300/30"
      case "planning":
        return "bg-purple-500/20 text-purple-400 border border-purple-400/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border border-blue-400/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border border-green-400/30"
      case "on-hold":
        return "bg-orange-500/20 text-orange-400 border border-orange-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-400/30"
    }
  }

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "new":
        return <Clock className="h-3 w-3" />
      case "planning":
        return <Users className="h-3 w-3" />
      case "in-progress":
        return <Activity className="h-3 w-3" />
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "on-hold":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventTypeColor = (eventType: AgentEvent["eventType"]) => {
    switch (eventType) {
      case "ALERT":
        return "bg-red-500/20 text-red-400 border border-red-400/30"
      case "INTAKE_COMPLETED":
        return "bg-green-500/20 text-green-400 border border-green-400/30"
      case "PLAN_CREATED":
        return "bg-blue-500/20 text-blue-400 border border-blue-400/30"
      case "ASSESSMENT_STARTED":
        return "bg-purple-500/20 text-purple-400 border border-purple-400/30"
      case "REPORT_GENERATED":
        return "bg-orange-500/20 text-orange-400 border border-orange-400/30"
      case "CLIENT_CONTACTED":
        return "bg-indigo-500/20 text-indigo-400 border border-indigo-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-400/30"
    }
  }

  const getProjectName = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId)
    return project?.name || "Unknown Project"
  }

  const getAlertSeverityColor = (severity: SystemAlert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border border-red-400/30"
      case "medium":
        return "bg-orange-500/20 text-orange-400 border border-orange-400/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border border-blue-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border border-slate-400/30"
    }
  }

  const handleViewProject = (projectId: string) => {
    console.log(`Navigating to project detail: ${projectId}`)
    router.push(`/admin/projects/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <TooltipProvider>
        <div className="container mx-auto p-6 space-y-6">
          {/* Cinematic Header */}
          <div className="relative">
            <Card className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 opacity-75 blur-lg animate-pulse"></div>
                    <div className="relative h-32 w-32 md:h-40 md:w-40 ring-4 ring-cyan-400/50 ring-offset-4 ring-offset-slate-800 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                      <Brain className="h-16 w-16 md:h-20 md:w-20 text-white" />
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent mb-2">
                      System Overview
                    </h1>
                    <p className="text-xl text-cyan-300 mb-4">Administrative Dashboard</p>
                    <p className="text-slate-300 mb-4 max-w-2xl">
                      Central command center for monitoring organizational intelligence, agent performance, and system
                      health across all operational domains.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/30 animate-pulse">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                        All Systems Operational
                      </Badge>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{roleInfo.icon}</span>
                        <span className="font-medium text-slate-300">{roleInfo.label}</span>
                        <Badge className={`text-xs ${roleInfo.color}`}>{currentRole}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <Users className="h-4 w-4" />
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{projects.length}</div>
                <p className="text-xs text-slate-400">Active engagements</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <Activity className="h-4 w-4" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {projects.filter((p) => p.status === "in-progress").length}
                </div>
                <p className="text-xs text-slate-400">Active projects</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <CheckCircle className="h-4 w-4" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <p className="text-xs text-slate-400">Delivered projects</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <AlertTriangle className="h-4 w-4" />
                  Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {agentEvents.filter((e) => e.eventType === "ALERT").length}
                </div>
                <p className="text-xs text-slate-400">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Projects Table */}
            {["ceo", "admin", "developer", "analyst"].includes(normalizedRole) && (
              <div className="xl:col-span-2">
                <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Projects</CardTitle>
                    <CardDescription className="text-slate-300">
                      {normalizedRole === "developer"
                        ? "Development-focused project view"
                        : "Overview of all organizational assessment projects"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-cyan-500/20">
                            <TableHead className="text-cyan-300">Project ID</TableHead>
                            <TableHead className="text-cyan-300">Project Name</TableHead>
                            <TableHead className="text-cyan-300">Status</TableHead>
                            <TableHead className="text-cyan-300">Created At</TableHead>
                            {["ceo", "admin"].includes(normalizedRole) && (
                              <TableHead className="text-cyan-300">Actions</TableHead>
                            )}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(normalizedRole === "developer" ? projects.slice(0, 3) : projects).map((project) => (
                            <TableRow
                              key={project.id}
                              className="border-cyan-500/10 hover:bg-cyan-500/5 cursor-pointer"
                            >
                              <TableCell className="font-mono text-sm text-slate-300">{project.id}</TableCell>
                              <TableCell className="font-medium text-white">{project.name}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`flex items-center gap-1 w-fit ${getStatusBadgeVariant(project.status)}`}
                                >
                                  {getStatusIcon(project.status)}
                                  {project.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-slate-400">{formatDate(project.createdAt)}</TableCell>
                              {["ceo", "admin"].includes(normalizedRole) && (
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewProject(project.id)}
                                    className="text-xs bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                                  >
                                    View Details
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Agent Events */}
            {["ceo", "admin", "developer", "analyst"].includes(normalizedRole) && (
              <div>
                <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Agent Events</CardTitle>
                    <CardDescription className="text-slate-300">
                      {normalizedRole === "developer" ? "Max and Ada agent activity" : "Recent activity from AI agents"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
                      {(normalizedRole === "developer"
                        ? agentEvents.filter((event) => ["Max", "Ada"].includes(event.agentName))
                        : agentEvents
                      ).map((event) => (
                        <div key={event.id} className="p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-white">{event.agentName}</span>
                                {event.eventType === "ALERT" && <AlertTriangle className="h-4 w-4 text-red-400" />}
                              </div>
                              <div
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.eventType)}`}
                              >
                                {event.eventType.replace("_", " ")}
                              </div>
                              <p className="text-xs text-slate-400 mt-1">{getProjectName(event.projectId)}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-slate-500">{formatDate(event.timestamp)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* System Health and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Alerts */}
            {["ceo", "admin", "developer", "analyst"].includes(normalizedRole) && (
              <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    System Alerts
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {normalizedRole === "developer"
                      ? "Development and system alerts"
                      : "AI-generated system monitoring and alerts"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {(normalizedRole === "developer"
                      ? systemAlerts.filter(
                          (alert) =>
                            alert.message.toLowerCase().includes("timeout") ||
                            alert.message.toLowerCase().includes("resource"),
                        )
                      : systemAlerts
                    ).map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border ${getAlertSeverityColor(alert.severity)} bg-slate-700/20`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className={`text-xs ${
                                  alert.severity === "high"
                                    ? "bg-red-500/20 text-red-400 border border-red-400/30"
                                    : alert.severity === "medium"
                                      ? "bg-orange-500/20 text-orange-400 border border-orange-400/30"
                                      : "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                                }`}
                              >
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-slate-500">{formatDate(alert.timestamp)}</span>
                            </div>
                            <p className="text-sm font-medium text-white mb-1">{alert.message}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">Project:</span>
                              <Link
                                href={`/admin/projects/${alert.projectId}`}
                                className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                              >
                                {alert.projectId}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* System Health Summary */}
            {["ceo", "admin", "analyst"].includes(normalizedRole) && (
              <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    System Health Summary
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {normalizedRole === "analyst"
                      ? "Performance metrics and export readiness"
                      : "Overall system performance metrics"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="text-center p-2 sm:p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                        <p className="text-xl sm:text-2xl font-bold text-white">{systemMetrics.totalProjects}</p>
                        <p className="text-xs sm:text-sm text-slate-400">Total Projects</p>
                      </div>
                      <div className="text-center p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                        <p className="text-2xl font-bold text-orange-400">{systemMetrics.projectsNeedingReview}</p>
                        <p className="text-sm text-slate-400">
                          {normalizedRole === "analyst" ? "Ready for Export" : "Need Review"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-300">Agent Uptime</span>
                        <span className="text-sm font-bold text-green-400">{systemMetrics.agentUptime}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${systemMetrics.agentUptime}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-600">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Last System Check</span>
                        <span className="text-sm font-medium text-slate-300">
                          {formatDate(systemMetrics.lastEveCheck)}
                        </span>
                      </div>
                    </div>

                    {normalizedRole === "analyst" && (
                      <div className="pt-3 border-t border-slate-600">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                        >
                          Export System Report
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Client Role Message */}
          {normalizedRole === "client" && (
            <div className="text-center py-12">
              <Card className="max-w-md mx-auto bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">👤</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Client Dashboard</h3>
                  <p className="text-slate-300 mb-4">
                    Welcome! Your client dashboard is available at a different location.
                  </p>
                  <Button
                    onClick={() => router.push("/client/intake")}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Go to Client Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
