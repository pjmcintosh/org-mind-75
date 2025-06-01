"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bot, CheckCircle, Target, Lock } from "lucide-react"
import { useMockData } from "@/lib/context/mock-data-context"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { DownloadProjectDoc } from "@/components/shared/DownloadProjectDoc"

export default function ClientProjectDetailPage() {
  const params = useParams()
  const id = decodeURIComponent(params.id as string)
  const { projectSubmissions } = useMockData()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)

  console.log(`Rendering project ${id} for role: ${currentRole}`)

  // Find project data
  const project = projectSubmissions.find((p) => p.id.toLowerCase() === id.toLowerCase())

  console.log("Matched project:", project?.id || "No match found")
  console.log(`Loaded: ClientProjectDetailPage for ID ${id}`)

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
            <p className="text-slate-600 mb-4">The project with ID "{id}" could not be found.</p>
            <Link href="/client/dashboard" className="text-blue-600 hover:underline">
              Return to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // RBAC Helper Functions
  const canViewSection = (section: string) => {
    const permissions = {
      requirements: ["Admin", "CEO", "Client"],
      projectPlan: ["Admin", "CEO", "Client"],
      agentActivity: ["Admin", "CEO"],
      approvalPanel: ["Admin", "CEO"],
      internalNotes: ["Admin"],
      insights: ["Admin", "CEO", "Client"],
    }
    return permissions[section as keyof typeof permissions]?.includes(currentRole) || false
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "under-review":
        return "outline"
      case "planning":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Mock project phases for Ada's plan
  const projectPhases = [
    {
      phase_name: "Discovery & Assessment",
      duration_weeks: 4,
      goals: ["Current state analysis", "Stakeholder interviews", "Technology audit"],
      tasks: [
        "Conduct leadership interviews",
        "Survey employee digital readiness",
        "Audit existing technology stack",
        "Map current business processes",
      ],
    },
    {
      phase_name: "Strategy Development",
      duration_weeks: 3,
      goals: ["Define transformation vision", "Create implementation roadmap"],
      tasks: [
        "Develop digital transformation strategy",
        "Prioritize transformation initiatives",
        "Create change management plan",
        "Define success metrics and KPIs",
      ],
    },
    {
      phase_name: "Implementation Planning",
      duration_weeks: 2,
      goals: ["Detailed project planning", "Resource allocation"],
      tasks: [
        "Create detailed project timeline",
        "Identify required resources",
        "Plan training programs",
        "Establish governance structure",
      ],
    },
  ]

  // Restricted Section Component
  const RestrictedSection = ({ sectionName }: { sectionName: string }) => (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-6 text-center">
        <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-600 mb-1">Restricted Access</h3>
        <p className="text-sm text-gray-500">
          {sectionName} is not available for your current role ({currentRole})
        </p>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <Link href="/client/dashboard" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-4">
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-cyan-400 text-2xl font-semibold">{project.projectName}</h1>
            <p className="text-blue-300 text-sm mt-1">
              Project ID: {project.id} • Client: {project.clientName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Confidence: {project.confidenceScore}%
            </Badge>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              {project.status.replace("-", " ")}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Summary */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 rounded-xl backdrop-blur-sm shadow-cyan-500/10 p-6">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-xl font-semibold">Project Summary</CardTitle>
            <CardDescription className="text-blue-300">
              Assigned Agent: {project.assignedAgent} • Submitted: {formatTimestamp(project.submissionDate)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white">
            <p>
              {project.clientName} has submitted a comprehensive project request focusing on digital transformation and
              organizational optimization. The initiative aims to modernize their current operations, improve
              efficiency, and establish a competitive advantage in their industry sector.
            </p>
          </CardContent>
        </Card>

        {/* Requirements Analysis - RBAC Protected */}
        {canViewSection("requirements") ? (
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 rounded-xl backdrop-blur-sm shadow-cyan-500/10 p-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  <CardTitle className="text-cyan-400 text-xl font-semibold">Requirements Analysis</CardTitle>
                </div>
                <DownloadProjectDoc projectId={project.id} docType="requirements" />
              </div>
              <CardDescription className="text-blue-300">
                Executive summary and organizational assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              {/* Executive Summary */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Executive Summary
                </h4>
                <p className="text-white leading-relaxed">
                  {project.clientName} has submitted a comprehensive project request focusing on digital transformation
                  and organizational optimization. The initiative aims to modernize their current operations, improve
                  efficiency, and establish a competitive advantage in their industry sector.
                </p>
              </div>

              <Separator className="border-cyan-500/20" />

              {/* Primary Goals */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Primary Goals
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Assess current digital maturity level and identify gaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Identify transformation opportunities and quick wins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Develop comprehensive implementation roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">Establish success metrics and KPIs for tracking progress</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#0f1a2c]/40 border border-red-500/20 rounded-xl backdrop-blur-sm p-6">
            <CardContent className="text-center">
              <Lock className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <h3 className="text-red-400 font-semibold mb-1">Restricted Access</h3>
              <p className="text-blue-300 text-sm">
                Requirements Analysis is not available for your current role ({currentRole})
              </p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-cyan-500/20">
          <div className="text-blue-300 text-sm">
            Generated: {formatTimestamp(project.submissionDate)} • Agent: {project.assignedAgent}
          </div>
          <button className="text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-md hover:bg-cyan-500/10 transition-colors">
            Download Report
          </button>
        </div>
      </div>
    </div>
  )
}
