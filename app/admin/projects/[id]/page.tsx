"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Bot,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  Target,
  Building,
  AlertTriangle,
  Shield,
  Sparkles,
  Brain,
} from "lucide-react"
import { useMockData } from "@/lib/context/mock-data-context"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { DownloadProjectDoc } from "@/components/shared/DownloadProjectDoc"
import { ProjectNotFound } from "@/components/admin/projects/ProjectNotFound"

export default function AdminProjectDetailPage() {
  const params = useParams()
  const id = decodeURIComponent(params.id as string)
  const { projectSubmissions } = useMockData()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)

  console.log(`Rendering project ${id} for role: ${currentRole}`)

  // Safely match against the projectSubmissions mock data with case-insensitive comparison
  const project = projectSubmissions.find((p) => p.id.toLowerCase() === id.toLowerCase())

  console.log("Matched project:", project?.id || "No match found")
  console.log(`Loaded: AdminProjectDetailPage for ID ${id}`)

  // Handle fallback - if project is null, show friendly "Project Not Found" card
  if (!project) {
    return <ProjectNotFound projectId={id} />
  }

  console.log(`Rendered structured requirements for Project ID ${id}`)

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

  // Enhanced Restricted Section Component
  const RestrictedSection = ({ sectionName }: { sectionName: string }) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-cyan-500/20 shadow-lg text-white">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        {/* Centered Tilo Icon */}
        <div className="w-16 h-16 rounded-full bg-slate-700/60 border border-cyan-500/40 flex items-center justify-center">
          <Brain className="h-8 w-8 text-cyan-400" />
        </div>

        {/* Header Text */}
        <h3 className="text-lg font-semibold text-cyan-300">{sectionName} is Restricted</h3>

        {/* Subtext */}
        <p className="text-sm text-slate-400 max-w-md leading-relaxed">
          This section is not available to your current role ({currentRole.toLowerCase()}).
        </p>

        {/* Action Button */}
        <button
          className="mt-4 px-4 py-2 rounded-md bg-cyan-400 text-black font-medium shadow-md hover:bg-cyan-300 transition-colors"
          onClick={() => console.log(`Request access to ${sectionName}`)}
        >
          Ask Tilo for Access
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dashboard" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/admin/dashboard" className="hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-cyan-300 font-medium">Project Details</span>
          </div>
        </div>

        {/* Enhanced Project Header */}
        <div className="bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 border border-purple-500/20 rounded-xl overflow-hidden mb-8">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10" />

            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Project Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <Building className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-white">{project.projectName}</h1>
                      <Badge variant={getStatusBadgeVariant(project.status)} className="capitalize">
                        {project.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-cyan-200 text-sm">
                      Project ID: {project.id} • Client: {project.clientName}
                    </p>
                  </div>
                </div>

                {/* Confidence Score with Gradient */}
                <div className="text-right">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-4 shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-white" />
                      <span className="text-white text-sm font-medium">AI Confidence</span>
                    </div>
                    <p className="font-mono text-2xl font-bold text-white">{project.confidenceScore}%</p>
                  </div>
                </div>
              </div>

              {/* Agent Profile Card */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">Assigned Agent: {project.assignedAgent}</span>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <Brain className="h-3 w-3 mr-1" />
                        AI Specialist
                      </Badge>
                    </div>
                    <p className="text-cyan-200 text-sm">Submitted: {formatTimestamp(project.submissionDate)}</p>
                  </div>
                  <Badge variant="outline" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    <Shield className="h-3 w-3 mr-1" />
                    Viewing as {currentRole}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-cyan-400">Project Analysis</h2>
          </div>

          {/* Requirements Analysis Card */}
          {canViewSection("requirements") ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">Requirements Analysis</h3>
                </div>
                <div className="flex items-center gap-2">
                  <DownloadProjectDoc projectId={project.id} docType="requirements" />
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>Drafted by Bob</span>
                    <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300">
                      AI Confidence: {project.confidenceScore}%
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-6">Executive summary and organizational assessment</p>

              <div className="space-y-6">
                {/* Executive Summary */}
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-cyan-400" />
                    Executive Summary
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {project.clientName} has submitted a comprehensive project request focusing on digital
                    transformation and organizational optimization. The initiative aims to modernize their current
                    operations, improve efficiency, and establish a competitive advantage in their industry sector.
                  </p>
                </div>

                <Separator className="bg-slate-600" />

                {/* Organizational Context */}
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <Building className="h-4 w-4 text-green-400" />
                    Organizational Context
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-400">Industry</p>
                      <p className="text-white">Technology Services</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400">Organization Size</p>
                      <p className="text-white">500-1000 employees</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-600" />

                {/* Primary Goals */}
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-400" />
                    Primary Goals
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Assess current digital maturity level and identify gaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Identify transformation opportunities and quick wins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Develop comprehensive implementation roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Establish success metrics and KPIs for tracking progress</span>
                    </li>
                  </ul>
                </div>

                <Separator className="bg-slate-600" />

                {/* Key Challenges */}
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    Key Challenges Identified
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Legacy system integration complexities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Change management resistance from team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Skills gap in emerging digital technologies</span>
                    </li>
                  </ul>
                </div>

                {/* Metadata */}
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Generated: {formatTimestamp(project.submissionDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bot className="h-4 w-4" />
                        <span>AI Agent: Bob (Intake Specialist)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FileText className="h-3 w-3" />
                      <span>Downloadable Version Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <RestrictedSection sectionName="Requirements Analysis" />
          )}
        </div>

        {/* Implementation Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-cyan-400">Implementation Planning</h2>
          </div>

          {/* Project Plan Card */}
          {canViewSection("projectPlan") ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-xl font-semibold text-white">Project Implementation Plan</h3>
                </div>
                <div className="flex items-center gap-2">
                  <DownloadProjectDoc projectId={project.id} docType="plan" />
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>Drafted by Ada</span>
                    <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300">
                      Strategic Planning
                    </Badge>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-6">
                Phased approach to project implementation with timelines and deliverables
              </p>

              <div className="space-y-6">
                {projectPhases.map((phase, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white flex items-center gap-2">
                        <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        {phase.phase_name}
                      </h4>
                      <Badge variant="secondary" className="text-xs bg-slate-600 text-slate-200">
                        {phase.duration_weeks} weeks
                      </Badge>
                    </div>

                    {/* Phase Goals */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-400 mb-2">Phase Goals</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.goals.map((goal, goalIndex) => (
                          <Badge
                            key={goalIndex}
                            variant="outline"
                            className="text-xs bg-slate-700 text-slate-300 border-slate-600"
                          >
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Phase Tasks */}
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-2">Key Tasks</p>
                      <ul className="space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-slate-300">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* Plan Summary */}
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-white mb-2">Implementation Summary</h4>
                  <p className="text-sm text-slate-300 mb-3">
                    Total project duration: <span className="font-medium text-cyan-300">9 weeks</span> across 3
                    strategic phases. Each phase builds upon the previous to ensure comprehensive transformation and
                    sustainable results.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Last updated: {formatTimestamp(project.submissionDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Strategic Planner: Ada</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <FileText className="h-3 w-3" />
                      <span>Downloadable Version Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <RestrictedSection sectionName="Project Implementation Plan" />
          )}
        </div>

        {/* Management Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-red-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-cyan-400">Project Management</h2>
          </div>

          <div className="space-y-6">
            {/* Group restricted sections together */}
            {!canViewSection("agentActivity") &&
            !canViewSection("approvalPanel") &&
            !canViewSection("internalNotes") ? (
              <div className="space-y-4">
                <RestrictedSection sectionName="Agent Activity & Approvals" />
                <p className="text-center text-sm text-slate-400">
                  Multiple management sections are restricted for your role
                </p>
              </div>
            ) : (
              <>
                {/* Agent Activity Log */}
                {canViewSection("agentActivity") ? (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                      <Bot className="h-5 w-5 text-orange-400" />
                      Agent Activity Log
                    </h3>
                    <p className="text-slate-300 text-sm mb-6">Recent actions and updates from AI agents</p>

                    <div className="space-y-4">
                      {[
                        {
                          agent: "Bob",
                          action: "Generated requirements analysis",
                          timestamp: "2024-01-15T10:30:00Z",
                          status: "completed",
                        },
                        {
                          agent: "Ada",
                          action: "Created project implementation plan",
                          timestamp: "2024-01-15T14:20:00Z",
                          status: "completed",
                        },
                        {
                          agent: "Max",
                          action: "Reviewing technical feasibility",
                          timestamp: "2024-01-15T16:45:00Z",
                          status: "in-progress",
                        },
                      ].map((activity, index) => (
                        <div key={index} className="border border-slate-600 rounded-lg p-3 bg-slate-700/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Bot className="h-4 w-4 text-cyan-400" />
                              <span className="font-medium text-white">{activity.agent}</span>
                              <span className="text-slate-400">•</span>
                              <span className="text-slate-300">{activity.action}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusBadgeVariant(activity.status)} className="text-xs">
                                {activity.status}
                              </Badge>
                              <span className="text-xs text-slate-400">{formatTimestamp(activity.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <RestrictedSection sectionName="Agent Activity Log" />
                )}

                {/* Approval Panel */}
                {canViewSection("approvalPanel") ? (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      Approval Panel
                    </h3>
                    <p className="text-slate-300 text-sm mb-6">Project approval status and controls</p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border border-green-500/30 rounded-lg bg-green-900/20">
                          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                          <p className="font-semibold text-green-300">Requirements</p>
                          <p className="text-sm text-green-400">Approved</p>
                        </div>
                        <div className="text-center p-4 border border-yellow-500/30 rounded-lg bg-yellow-900/20">
                          <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                          <p className="font-semibold text-yellow-300">Project Plan</p>
                          <p className="text-sm text-yellow-400">Pending Review</p>
                        </div>
                        <div className="text-center p-4 border border-slate-500/30 rounded-lg bg-slate-800/20">
                          <Clock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                          <p className="font-semibold text-slate-300">Implementation</p>
                          <p className="text-sm text-slate-400">Not Started</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <RestrictedSection sectionName="Approval Panel" />
                )}

                {/* Internal Notes */}
                {canViewSection("internalNotes") ? (
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-red-400" />
                      Internal Notes
                      <Badge variant="destructive" className="text-xs">
                        Admin Only
                      </Badge>
                    </h3>
                    <p className="text-slate-300 text-sm mb-6">Internal team notes and observations</p>

                    <div className="space-y-3">
                      <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <p className="text-sm text-red-300">
                          <strong>Risk Assessment:</strong> Client may need additional technical support during
                          implementation phase.
                        </p>
                        <p className="text-xs text-red-400 mt-1">
                          Added by Admin • {formatTimestamp(project.submissionDate)}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                        <p className="text-sm text-blue-300">
                          <strong>Resource Note:</strong> Consider assigning additional developer resources for Q2.
                        </p>
                        <p className="text-xs text-blue-400 mt-1">
                          Added by Admin • {formatTimestamp(project.submissionDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <RestrictedSection sectionName="Internal Notes" />
                )}
              </>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-teal-500 rounded-full" />
            <h2 className="text-2xl font-semibold text-cyan-400">AI Insights</h2>
          </div>

          {/* Insights Summary */}
          {canViewSection("insights") ? (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-purple-400" />
                AI Insights Summary
              </h3>
              <p className="text-slate-300 text-sm mb-6">Key insights and recommendations from Ephrya</p>

              <div className="space-y-4">
                {[
                  {
                    type: "Strategic",
                    insight: "Project timeline is realistic and achievable with current resource allocation",
                    confidence: 92,
                  },
                  {
                    type: "Technical",
                    insight: "Legacy system integration may require additional 2-3 weeks for testing",
                    confidence: 78,
                  },
                  {
                    type: "Risk",
                    insight: "Change management training should be prioritized in Phase 1",
                    confidence: 85,
                  },
                ].map((item, index) => (
                  <div key={index} className="border border-slate-600 rounded-lg p-4 bg-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                        {item.type}
                      </Badge>
                      <span className="text-xs text-slate-400">Confidence: {item.confidence}%</span>
                    </div>
                    <p className="text-slate-300">{item.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <RestrictedSection sectionName="AI Insights Summary" />
          )}
        </div>
      </div>
    </div>
  )
}
