"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CalendarDays,
  Search,
  Filter,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Bot,
  User,
} from "lucide-react"

// Force dynamic rendering
export const dynamic = "force-dynamic"

// Mock engagement data
const mockEngagements = [
  {
    id: "ENG-001",
    projectName: "TechCorp Digital Transformation",
    clientName: "TechCorp Inc.",
    status: "in-progress",
    priority: "high",
    startDate: "2024-01-10",
    assignedAgent: "Ada",
    progress: 65,
    stages: [
      { name: "Initial Analysis", status: "completed", agent: "Ada" },
      { name: "Requirements Gathering", status: "in-progress", agent: "Bob" },
      { name: "Implementation Planning", status: "pending", agent: "Max" },
    ],
  },
  {
    id: "ENG-002",
    projectName: "FinanceGroup Risk Assessment",
    clientName: "FinanceGroup LLC",
    status: "completed",
    priority: "medium",
    startDate: "2024-01-08",
    assignedAgent: "Eve",
    progress: 100,
    stages: [
      { name: "Risk Analysis", status: "completed", agent: "Eve" },
      { name: "Report Generation", status: "completed", agent: "Janet" },
      { name: "Client Review", status: "completed", agent: "Shandry" },
    ],
  },
  {
    id: "ENG-003",
    projectName: "StartupXYZ Culture Assessment",
    clientName: "StartupXYZ",
    status: "pending",
    priority: "low",
    startDate: "2024-01-12",
    assignedAgent: "Max",
    progress: 25,
    stages: [
      { name: "Initial Consultation", status: "completed", agent: "Max" },
      { name: "Data Collection", status: "pending", agent: "Ada" },
      { name: "Analysis", status: "pending", agent: "Bob" },
    ],
  },
]

const mockActivityLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-15T09:30:00Z",
    actor: "Ada",
    actorType: "agent",
    action: "Completed technical analysis for TechCorp project",
    engagementId: "ENG-001",
    status: "success",
  },
  {
    id: "LOG-002",
    timestamp: "2024-01-15T08:45:00Z",
    actor: "Bob",
    actorType: "agent",
    action: "Started requirements gathering phase",
    engagementId: "ENG-001",
    status: "in-progress",
  },
  {
    id: "LOG-003",
    timestamp: "2024-01-15T08:15:00Z",
    actor: "Admin",
    actorType: "user",
    action: "Approved project milestone",
    engagementId: "ENG-002",
    status: "success",
  },
  {
    id: "LOG-004",
    timestamp: "2024-01-14T16:20:00Z",
    actor: "Eve",
    actorType: "agent",
    action: "Generated risk assessment report",
    engagementId: "ENG-002",
    status: "success",
  },
]

export default function EngagementLogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [agentFilter, setAgentFilter] = useState("all")

  const filteredEngagements = useMemo(() => {
    return mockEngagements.filter((engagement) => {
      const matchesSearch =
        engagement.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engagement.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        engagement.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || engagement.status === statusFilter
      const matchesAgent = agentFilter === "all" || engagement.assignedAgent === agentFilter

      return matchesSearch && matchesStatus && matchesAgent
    })
  }, [searchTerm, statusFilter, agentFilter])

  const filteredLogs = useMemo(() => {
    return mockActivityLogs.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesAgent = agentFilter === "all" || log.actor === agentFilter

      return matchesSearch && matchesAgent
    })
  }, [searchTerm, agentFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const stats = {
    total: mockEngagements.length,
    active: mockEngagements.filter((e) => e.status === "in-progress").length,
    completed: mockEngagements.filter((e) => e.status === "completed").length,
    pending: mockEngagements.filter((e) => e.status === "pending").length,
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarDays className="h-8 w-8" />
            Engagement Activity Log
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and track all engagement activities across the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50">
            System Online
          </Badge>
          <Badge variant="outline" className="bg-blue-50">
            Live Mode
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Engagements</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search engagements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Agent</label>
              <Select value={agentFilter} onValueChange={setAgentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Agents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="Ada">Ada</SelectItem>
                  <SelectItem value="Bob">Bob</SelectItem>
                  <SelectItem value="Max">Max</SelectItem>
                  <SelectItem value="Eve">Eve</SelectItem>
                  <SelectItem value="Janet">Janet</SelectItem>
                  <SelectItem value="Shandry">Shandry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Results</label>
              <div className="flex items-center h-10 px-3 py-2 border rounded-md bg-muted">
                <span className="text-sm text-muted-foreground">
                  {filteredEngagements.length} of {mockEngagements.length} engagements
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Engagement Flows</span>
              <Badge variant="outline">{filteredEngagements.length} engagements</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filteredEngagements.map((engagement) => (
                  <Card key={engagement.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{engagement.projectName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {engagement.clientName} • {engagement.id}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(engagement.status)}>{engagement.status}</Badge>
                            <Badge className={getPriorityColor(engagement.priority)}>{engagement.priority}</Badge>
                          </div>
                        </div>

                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{engagement.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${engagement.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Stages */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">Stages</h4>
                          <div className="space-y-2">
                            {engagement.stages.map((stage, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(stage.status)}
                                  <span>{stage.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={`/${stage.agent.toLowerCase()}-avatar.png`} />
                                    <AvatarFallback className="text-xs">{stage.agent.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-muted-foreground">{stage.agent}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Assigned Agent */}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Assigned Agent</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/${engagement.assignedAgent.toLowerCase()}-avatar.png`} />
                              <AvatarFallback className="text-xs">{engagement.assignedAgent.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{engagement.assignedAgent}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredEngagements.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No engagements match the current filters</div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Activity Timeline</span>
              <Badge variant="outline">{filteredLogs.length} events</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {filteredLogs.map((log, index) => (
                  <div key={log.id} className="flex items-start space-x-3 relative">
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/${log.actor.toLowerCase()}-avatar.png`} />
                        <AvatarFallback className="text-xs">{log.actor.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{log.actor}</span>
                        <div className="flex items-center space-x-1">
                          {log.actorType === "agent" ? (
                            <Bot className="h-3 w-3 text-blue-500" />
                          ) : (
                            <User className="h-3 w-3 text-green-500" />
                          )}
                          <span className="text-xs text-muted-foreground">{log.actorType}</span>
                        </div>
                        <Badge className={getStatusColor(log.status)} variant="outline">
                          {log.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-1">{log.action}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                        <span>Engagement: {log.engagementId}</span>
                      </div>
                    </div>

                    {index < filteredLogs.length - 1 && <div className="absolute left-4 top-10 w-px h-6 bg-border" />}
                  </div>
                ))}

                {filteredLogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No activity logs match the current filters
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
