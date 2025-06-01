"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Workflow,
  Shield,
  Lock,
  Plus,
  Edit,
  Trash2,
  Play,
  CheckCircle,
  User,
  Settings,
  DollarSign,
  Users,
} from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { humanLabels } from "@/lib/humanLabels"

interface WorkflowTemplate {
  id: string
  name: string
  category: "compliance" | "security" | "general" | "finops"
  controlledBy: "Lexi" | "Erik" | "System" | "Janet"
  description: string
  triggerAgent: string
  targetAgent: string
  isLocked: boolean
  lastModified: string
  createdBy: string
}

export default function WorkflowCreatorPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const normalizedRole = currentRole.toLowerCase()

  console.log("Loaded: WorkflowCreatorPage")

  const [workflows] = useState<WorkflowTemplate[]>([
    {
      id: "wf-comp-001",
      name: "SOC2 Compliance Validation",
      category: "compliance",
      controlledBy: "Lexi",
      description: "Automated SOC2 compliance checking and validation workflow",
      triggerAgent: "Lexi",
      targetAgent: "Ephrya",
      isLocked: true,
      lastModified: "2024-01-22T10:30:00Z",
      createdBy: "Lexi",
    },
    {
      id: "wf-comp-002",
      name: "GDPR Data Processing Audit",
      category: "compliance",
      controlledBy: "Lexi",
      description: "Continuous GDPR compliance monitoring and reporting",
      triggerAgent: "Lexi",
      targetAgent: "Legal Agent",
      isLocked: true,
      lastModified: "2024-01-22T09:15:00Z",
      createdBy: "Lexi",
    },
    {
      id: "wf-sec-001",
      name: "Threat Detection Pipeline",
      category: "security",
      controlledBy: "Erik",
      description: "Real-time threat detection and response orchestration",
      triggerAgent: "Erik",
      targetAgent: "Ephrya",
      isLocked: true,
      lastModified: "2024-01-22T11:45:00Z",
      createdBy: "Erik",
    },
    {
      id: "wf-sec-002",
      name: "PII Exposure Monitoring",
      category: "security",
      controlledBy: "Erik",
      description: "Continuous PII exposure detection and remediation",
      triggerAgent: "Erik",
      targetAgent: "Legal Agent",
      isLocked: true,
      lastModified: "2024-01-22T08:20:00Z",
      createdBy: "Erik",
    },
    {
      id: "wf-gen-001",
      name: "Project Status Updates",
      category: "general",
      controlledBy: "System",
      description: "Automated project status reporting workflow",
      triggerAgent: "Ada",
      targetAgent: "Ephrya",
      isLocked: false,
      lastModified: "2024-01-22T14:30:00Z",
      createdBy: "Admin",
    },
    {
      id: "wf-fin-001",
      name: "AI Agent Budget Allocation",
      category: "finops",
      controlledBy: "Janet",
      description: "Automated budget allocation and cost optimization for AI agents",
      triggerAgent: "Janet",
      targetAgent: "Ephrya",
      isLocked: true,
      lastModified: "2024-01-22T12:15:00Z",
      createdBy: "Janet",
    },
    {
      id: "wf-fin-002",
      name: "Token Threshold Monitoring",
      category: "finops",
      controlledBy: "Janet",
      description: "Continuous monitoring of token usage and cost thresholds",
      triggerAgent: "Janet",
      targetAgent: "All Agents",
      isLocked: true,
      lastModified: "2024-01-22T13:30:00Z",
      createdBy: "Janet",
    },
    {
      id: "wf-fin-003",
      name: "Licensing Review Automation",
      category: "finops",
      controlledBy: "Janet",
      description: "Automated third-party licensing cost analysis and renewal tracking",
      triggerAgent: "Janet",
      targetAgent: "Legal Agent",
      isLocked: true,
      lastModified: "2024-01-22T11:00:00Z",
      createdBy: "Janet",
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Redirect non-admin users
  if (normalizedRole !== "admin") {
    router.push("/unauthorized")
    return null
  }

  const filteredWorkflows = workflows.filter((workflow) => {
    if (selectedCategory === "all") return true
    return workflow.category === selectedCategory
  })

  const getControllerBadge = (controlledBy: string) => {
    switch (controlledBy) {
      case "Lexi":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
      case "Erik":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "Janet":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "compliance":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
      case "security":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "finops":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
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

  // Replace the existing canEditWorkflow function with enhanced RBAC logic
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isCEO = normalizedRole === "ceo"

  const canCreateWorkflow = !isReadOnlyAdmin && isCEO
  const canExecuteWorkflow = (workflow: WorkflowTemplate) => {
    return !isReadOnlyAdmin && isCEO
  }
  const canEditWorkflow = (workflow: WorkflowTemplate) => {
    if (workflow.isLocked) {
      return isCEO // Only CEO can edit locked workflows
    }
    return !isReadOnlyAdmin && (isCEO || normalizedRole === "admin")
  }
  const canDeleteWorkflow = (workflow: WorkflowTemplate) => {
    return !workflow.isLocked && !isReadOnlyAdmin && isCEO
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <Workflow className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">
                    {humanLabels?.navigation?.workflowCreator || "Build a Flow"}
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    Design processes and assign responsibility across your team. Only Team Members can initiate and
                    execute flows. Silent Watchers and Outside Collaborators can observe or trigger scoped inputs.
                  </CardDescription>
                </div>
              </div>
              <Badge className={`${roleInfo.color} flex items-center gap-2`}>
                <span>{roleInfo.icon}</span>
                {roleInfo.label}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Dashboard Authority Notice */}
        <Alert className="bg-[#0f1a2c]/80 border border-cyan-500/20">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Dashboard Authority:</strong> Compliance workflows are controlled by Lexi, Security workflows by
            Erik. System workflows can be modified by administrators.
          </AlertDescription>
        </Alert>

        <Alert className="bg-[#0f1a2c]/80 border border-blue-500/20">
          <Users className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Entity Role Awareness:</strong> Team Members can execute workflows, Silent Watchers can monitor
            activity, and Outside Collaborators work through scoped integrations only.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="authority">Authority Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-white">{workflows.length}</div>
                  <p className="text-xs text-slate-400">Total Workflows</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-cyan-400">
                    {workflows.filter((w) => w.controlledBy === "Lexi").length}
                  </div>
                  <p className="text-xs text-slate-400">Lexi Controlled</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-red-400">
                    {workflows.filter((w) => w.controlledBy === "Erik").length}
                  </div>
                  <p className="text-xs text-slate-400">Erik Controlled</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-400">
                    {workflows.filter((w) => w.controlledBy === "System").length}
                  </div>
                  <p className="text-xs text-slate-400">System Workflows</p>
                </CardContent>
              </Card>
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {workflows.filter((w) => w.controlledBy === "Janet").length}
                  </div>
                  <p className="text-xs text-slate-400">Janet Controlled</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Label className="text-cyan-300">Filter by Category:</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="finops">FinOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button className="bg-cyan-600 hover:bg-cyan-700" disabled={!canCreateWorkflow}>
                            <Plus className="h-4 w-4 mr-2" />
                            {humanLabels?.workflows?.initiateWorkflow || "Create Workflow"}
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {!canCreateWorkflow && (
                        <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                          <p className="text-cyan-300">Only the CEO may create new workflows.</p>
                          <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {/* Workflows List */}
            <div className="space-y-4">
              {filteredWorkflows.map((workflow) => (
                <Card key={workflow.id} className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg text-white">{workflow.name}</CardTitle>
                        <Badge className={getCategoryColor(workflow.category)}>{workflow.category}</Badge>
                        <Badge className={getControllerBadge(workflow.controlledBy)}>
                          <User className="h-3 w-3 mr-1" />
                          {humanLabels?.workflows?.workflowOwnership || "Controlled by"}: {workflow.controlledBy}
                        </Badge>
                        {workflow.isLocked && (
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-400/30">
                            <Lock className="h-3 w-3 mr-1" />
                            Protected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-400 hover:text-blue-300"
                                  disabled={!canExecuteWorkflow(workflow)}
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!canExecuteWorkflow(workflow) && (
                              <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                                <p className="text-cyan-300">
                                  Only {workflow.controlledBy} or the CEO may execute this workflow.
                                </p>
                                <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={!canEditWorkflow(workflow)}
                                  className="text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!canEditWorkflow(workflow) && (
                              <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                                <p className="text-cyan-300">
                                  Only {workflow.controlledBy} or the CEO may edit this workflow.
                                </p>
                                <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={!canDeleteWorkflow(workflow)}
                                  className="text-red-400 hover:text-red-300 disabled:opacity-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!canDeleteWorkflow(workflow) && (
                              <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                                <p className="text-cyan-300">Only the CEO may delete workflows.</p>
                                <p className="text-slate-400 text-xs">Protected workflows cannot be deleted.</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{workflow.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">{humanLabels?.fields?.trigger_type || "Trigger Agent"}:</span>
                        <p className="text-white">{workflow.triggerAgent}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Target Agent:</span>
                        <p className="text-white">{workflow.targetAgent}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Created By:</span>
                        <p className="text-white">{workflow.createdBy}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">
                          {humanLabels?.fields?.last_updated_by || "Last Modified"}:
                        </span>
                        <p className="text-white">{formatDate(workflow.lastModified)}</p>
                      </div>
                    </div>
                    {workflow.isLocked && (
                      <Alert className="mt-4 bg-orange-500/10 border border-orange-500/20">
                        <Lock className="h-4 w-4" />
                        <AlertDescription className="text-orange-300">
                          This workflow is protected by {workflow.controlledBy} and cannot be modified without proper
                          authorization.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="authority" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Dashboard Authority Matrix
                </CardTitle>
                <CardDescription className="text-blue-300">
                  Agent ownership and control relationships for workflow management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/30 border border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-cyan-400 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Lexi - Compliance Authority
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Authority:</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">Compliance</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Controlled Workflows:</span>
                        <span className="text-white">{workflows.filter((w) => w.controlledBy === "Lexi").length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{humanLabels?.fields?.role_permissions || "Can Edit"}:</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Access:</span>
                        <span className="text-cyan-400">/admin/compliance</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/30 border border-red-500/20">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Erik - Security Authority
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Authority:</span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-400/30">Security</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Controlled Workflows:</span>
                        <span className="text-white">{workflows.filter((w) => w.controlledBy === "Erik").length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{humanLabels?.fields?.role_permissions || "Can Edit"}:</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Access:</span>
                        <span className="text-red-400">/admin/security-agent</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/30 border border-yellow-500/20">
                    <CardHeader>
                      <CardTitle className="text-yellow-400 flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Janet - FinOps Authority
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Authority:</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">FinOps</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Controlled Workflows:</span>
                        <span className="text-white">{workflows.filter((w) => w.controlledBy === "Janet").length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">{humanLabels?.fields?.role_permissions || "Can Edit"}:</span>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Dashboard Access:</span>
                        <span className="text-yellow-400">/admin/finops</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="bg-slate-800/30 border border-slate-500/20">
                  <Settings className="h-4 w-4" />
                  <AlertDescription className="text-slate-300">
                    <strong>Authority Rules:</strong> Only administrators can reassign dashboard ownership.
                    Agent-controlled workflows are automatically protected and require proper authorization to modify.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
