"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Users,
  Brain,
  Shield,
  DollarSign,
  FileText,
  Zap,
  UserCheck,
  Eye,
  Settings,
  LinkIcon,
  Network,
  Star,
} from "lucide-react"
import { humanLabels } from "@/lib/humanLabels"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"

interface Agent {
  id: string
  name: string
  role: string
  department: string
  status: "active" | "inactive" | "pending"
  lastActive: string
  description: string
  avatar: string
  capabilities: string[]
  workflowStatus: string
  lastUpdatedBy: string
  type: EntityType
}

const agents: Agent[] = [
  {
    id: "ada",
    name: "Ada",
    role: "Strategic Project Analyst",
    department: "Strategy",
    status: "active",
    lastActive: "2 min ago",
    description: humanLabels.onboarding.ada,
    avatar: "🔍",
    capabilities: ["Project Analysis", "Strategic Planning", "Risk Assessment"],
    workflowStatus: "Analyzing 3 projects",
    lastUpdatedBy: "System Auto-Update",
    type: "SPECIALIST",
  },
  {
    id: "bob",
    name: "Bob",
    role: "Client Intake Specialist",
    department: "Client Services",
    status: "active",
    lastActive: "5 min ago",
    description: humanLabels.onboarding.bob,
    avatar: "👤",
    capabilities: ["Client Onboarding", "Requirements Gathering", "Documentation"],
    workflowStatus: "Processing 2 intakes",
    lastUpdatedBy: "Client Portal",
    type: "AGENT",
  },
  {
    id: "ephrya",
    name: "Ephrya",
    role: "Organizational Intelligence",
    department: "Operations",
    status: "active",
    lastActive: "1 min ago",
    description: humanLabels.onboarding.ephrya,
    avatar: "🧠",
    capabilities: ["Coordination", "Decision Making", "Knowledge Management"],
    workflowStatus: "Orchestrating workflows",
    lastUpdatedBy: "Multi-Agent Sync",
    type: "ORCHESTRATOR",
  },
  {
    id: "erik",
    name: "Erik",
    role: "Security Specialist",
    department: "Security",
    status: "active",
    lastActive: "3 min ago",
    description: humanLabels.onboarding.erik,
    avatar: "🛡️",
    capabilities: ["Threat Detection", "PII Protection", "Security Monitoring"],
    workflowStatus: "Monitoring threats",
    lastUpdatedBy: "Security Scan",
    type: "SPECIALIST",
  },
  {
    id: "eve",
    name: "Eve",
    role: "System Health Monitor",
    department: "Operations",
    status: "active",
    lastActive: "30 sec ago",
    description: humanLabels.onboarding.eve,
    avatar: "⚡",
    capabilities: ["Performance Monitoring", "System Optimization", "Recommendations"],
    workflowStatus: "Optimizing performance",
    lastUpdatedBy: "Health Check",
    type: "OBSERVER",
  },
  {
    id: "janet",
    name: "Janet",
    role: "Financial Operations",
    department: "Finance",
    status: "active",
    lastActive: "4 min ago",
    description: humanLabels.onboarding.janet,
    avatar: "💰",
    capabilities: ["Cost Management", "Budget Tracking", "Financial Analysis"],
    workflowStatus: "Tracking Q1 budget",
    lastUpdatedBy: "FinOps Dashboard",
    type: "SPECIALIST",
  },
  {
    id: "lexi",
    name: "Lexi",
    role: "Compliance Guardian",
    department: "Compliance",
    status: "active",
    lastActive: "6 min ago",
    description: humanLabels.onboarding.lexi,
    avatar: "⚖️",
    capabilities: ["Regulatory Monitoring", "Audit Preparation", "Risk Assessment"],
    workflowStatus: "Reviewing compliance",
    lastUpdatedBy: "Compliance Scan",
    type: "SPECIALIST",
  },
  {
    id: "max",
    name: "Max",
    role: "Prompt Engineer",
    department: "AI Operations",
    status: "active",
    lastActive: "8 min ago",
    description: humanLabels.onboarding.max,
    avatar: "🚀",
    capabilities: ["Prompt Optimization", "AI Communication", "Model Tuning"],
    workflowStatus: "Optimizing prompts",
    lastUpdatedBy: "Prompt Analysis",
    type: "AGENT",
  },
  {
    id: "shandry",
    name: "Shandry",
    role: "HR Specialist",
    department: "Human Resources",
    status: "active",
    lastActive: "10 min ago",
    description: humanLabels.onboarding.shandry,
    avatar: "👥",
    capabilities: ["Team Development", "Training Management", "Culture Building"],
    workflowStatus: "Planning training",
    lastUpdatedBy: "HR Dashboard",
    type: "SPECIALIST",
  },
  {
    id: "openai-legal",
    name: "OpenAI Legal Advisor",
    role: "Legal Consultant",
    department: "Legal",
    status: "active",
    lastActive: "15 min ago",
    description: "External legal advisor specializing in AI compliance and contracts.",
    avatar: "⚖️",
    capabilities: ["Contract Review", "Legal Advice", "Compliance Guidance"],
    workflowStatus: "Reviewing NDA",
    lastUpdatedBy: "Legal Integration",
    type: "PARTNER",
  },
]

const getStatusBadge = (status: string) => {
  const statusLabel = humanLabels.getLabel(`status.${status}`)
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-200">{statusLabel}</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{statusLabel}</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{statusLabel}</Badge>
    default:
      return <Badge variant="outline">{statusLabel}</Badge>
  }
}

const getDepartmentIcon = (department: string) => {
  switch (department) {
    case "Strategy":
      return <Brain className="h-4 w-4" />
    case "Client Services":
      return <Users className="h-4 w-4" />
    case "Operations":
      return <Settings className="h-4 w-4" />
    case "Security":
      return <Shield className="h-4 w-4" />
    case "Finance":
      return <DollarSign className="h-4 w-4" />
    case "Compliance":
      return <FileText className="h-4 w-4" />
    case "AI Operations":
      return <Zap className="h-4 w-4" />
    case "Human Resources":
      return <UserCheck className="h-4 w-4" />
    case "Legal":
      return <FileText className="h-4 w-4" />
    default:
      return <Eye className="h-4 w-4" />
  }
}

const getEntityIcon = (type: EntityType) => {
  switch (type) {
    case "AGENT":
      return <Users className="h-4 w-4" />
    case "OBSERVER":
      return <Eye className="h-4 w-4" />
    case "PARTNER":
      return <LinkIcon className="h-4 w-4" />
    case "ORCHESTRATOR":
      return <Network className="h-4 w-4" />
    case "SPECIALIST":
      return <Star className="h-4 w-4" />
    default:
      return <Users className="h-4 w-4" />
  }
}

const getEntityBadgeColor = (type: EntityType) => {
  const color = entityTypes[type].color
  switch (color) {
    case "cyan":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
    case "yellow":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "green":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "purple":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "blue":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || agent.department === departmentFilter
    const matchesType = typeFilter === "all" || agent.type === typeFilter

    return matchesSearch && matchesStatus && matchesDepartment && matchesType
  })

  const departments = [...new Set(agents.map((agent) => agent.department))]
  const entityTypeOptions = Object.keys(entityTypes) as EntityType[]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400 mb-4">{humanLabels.navigation.agents}</h1>
          <p className="text-blue-300 text-sm mb-6">
            Get to know your team of intelligent collaborators. Each agent specializes in a different part of the
            organization.
          </p>

          {/* Contextual Description */}
          <Card className="bg-slate-800/50 border-cyan-500/20 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-blue-400">Your team includes different types of collaborators:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {entityTypeOptions.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Badge className={getEntityBadgeColor(type)}>
                      {getEntityIcon(type)}
                      <span className="ml-1">{entityTypes[type].label}</span>
                    </Badge>
                    <span className="text-xs text-gray-400">{entityTypes[type].description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search agents by name, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">{humanLabels.getLabel("status.active")}</SelectItem>
              <SelectItem value="inactive">{humanLabels.getLabel("status.inactive")}</SelectItem>
              <SelectItem value="pending">{humanLabels.getLabel("status.pending")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {entityTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {entityTypes[type].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.id}
              className="bg-slate-800/50 border-slate-600 hover:border-cyan-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div>
                      <CardTitle className="text-lg text-cyan-400" title={humanLabels.fields.agent_name}>
                        {agent.name}
                      </CardTitle>
                      <CardDescription className="text-blue-300 text-sm">{agent.role}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Entity Type Badge */}
                <div className="flex items-center gap-2">
                  <Badge className={getEntityBadgeColor(agent.type)}>
                    {getEntityIcon(agent.type)}
                    <span className="ml-1">{entityTypes[agent.type].label}</span>
                  </Badge>
                </div>

                {/* Department */}
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  {getDepartmentIcon(agent.department)}
                  <span>{agent.department}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">{agent.description}</p>

                {/* Capabilities */}
                <div>
                  <p className="text-xs text-blue-400 mb-2 font-medium">{humanLabels.fields.role_permissions}</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-slate-500 text-slate-300">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Status Info */}
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>{humanLabels.workflows.workflowStatus}:</span>
                    <span className="text-cyan-400">{agent.workflowStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{humanLabels.fields.last_updated_by}:</span>
                    <span className="text-blue-300">{agent.lastUpdatedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Active:</span>
                    <span className="text-green-400">{agent.lastActive}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/admin/agents/${agent.id}`}>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" size="sm">
                    {humanLabels.actions.viewDetails}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <Card className="bg-slate-800/50 border-slate-600 text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No agents found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or filters to find the team members you're looking for.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
