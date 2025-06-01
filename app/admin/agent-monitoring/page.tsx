"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Clock, DollarSign, Search, TrendingUp, Zap } from "lucide-react"

// Mock data defined inline
const mockAgents = [
  {
    id: "ada",
    name: "Ada",
    role: "Engineering Lead",
    department: "Engineering",
    status: "healthy",
    uptime: 99.8,
    responseTime: 120,
    errorRate: 0.2,
    memoryUsage: 65,
    cpuUsage: 45,
    requestsPerHour: 1247,
    lastActive: "2 minutes ago",
    version: "v2.1.4",
    model: "GPT-4",
    tokensUsed: 45230,
    costToday: 12.45,
  },
  {
    id: "bob",
    name: "Bob",
    role: "Financial Analyst",
    department: "Finance",
    status: "warning",
    uptime: 98.2,
    responseTime: 280,
    errorRate: 1.5,
    memoryUsage: 92,
    cpuUsage: 78,
    requestsPerHour: 856,
    lastActive: "5 minutes ago",
    version: "v2.1.3",
    model: "GPT-4",
    tokensUsed: 38920,
    costToday: 10.23,
  },
  {
    id: "max",
    name: "Max",
    role: "Customer Success",
    department: "Customer Success",
    status: "healthy",
    uptime: 99.5,
    responseTime: 95,
    errorRate: 0.1,
    memoryUsage: 58,
    cpuUsage: 32,
    requestsPerHour: 1834,
    lastActive: "1 minute ago",
    version: "v2.1.4",
    model: "GPT-4",
    tokensUsed: 52100,
    costToday: 14.67,
  },
  {
    id: "eve",
    name: "Eve",
    role: "Security Monitor",
    department: "Security",
    status: "healthy",
    uptime: 99.9,
    responseTime: 75,
    errorRate: 0.05,
    memoryUsage: 42,
    cpuUsage: 28,
    requestsPerHour: 3421,
    lastActive: "30 seconds ago",
    version: "v2.1.4",
    model: "GPT-4",
    tokensUsed: 67890,
    costToday: 18.92,
  },
  {
    id: "janet",
    name: "Janet",
    role: "HR Specialist",
    department: "Human Resources",
    status: "healthy",
    uptime: 99.1,
    responseTime: 150,
    errorRate: 0.3,
    memoryUsage: 71,
    cpuUsage: 55,
    requestsPerHour: 987,
    lastActive: "3 minutes ago",
    version: "v2.1.4",
    model: "GPT-3.5",
    tokensUsed: 29450,
    costToday: 6.78,
  },
  {
    id: "ephrya",
    name: "Ephrya",
    role: "Strategic Advisor",
    department: "Strategy",
    status: "healthy",
    uptime: 99.6,
    responseTime: 110,
    errorRate: 0.15,
    memoryUsage: 55,
    cpuUsage: 41,
    requestsPerHour: 1567,
    lastActive: "1 minute ago",
    version: "v2.1.4",
    model: "GPT-4",
    tokensUsed: 43210,
    costToday: 11.89,
  },
  {
    id: "shandry",
    name: "Shandry",
    role: "Operations Manager",
    department: "Operations",
    status: "maintenance",
    uptime: 98.9,
    responseTime: 220,
    errorRate: 0.8,
    memoryUsage: 78,
    cpuUsage: 62,
    requestsPerHour: 1234,
    lastActive: "10 minutes ago",
    version: "v2.1.3",
    model: "GPT-4",
    tokensUsed: 35670,
    costToday: 9.45,
  },
]

const mockSystemMetrics = {
  totalAgents: 7,
  healthyAgents: 5,
  warningAgents: 1,
  maintenanceAgents: 1,
  avgResponseTime: 147,
  totalRequests: 11146,
  totalCost: 84.39,
  systemUptime: 99.2,
}

const mockAlerts = [
  {
    id: "alert-1",
    agent: "Bob",
    type: "performance",
    severity: "warning",
    message: "High memory usage detected (92%)",
    timestamp: "5 minutes ago",
  },
  {
    id: "alert-2",
    agent: "Shandry",
    type: "maintenance",
    severity: "info",
    message: "Scheduled maintenance in progress",
    timestamp: "10 minutes ago",
  },
]

function AgentCard({ agent }: { agent: (typeof mockAgents)[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "maintenance":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "error":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "maintenance":
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={`/${agent.id}-avatar.png`}
                alt={`${agent.name} avatar`}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.nextElementSibling?.classList.remove("hidden")
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {agent.name[0]}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <CardDescription>{agent.role}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(agent.status)}>
            {getStatusIcon(agent.status)}
            <span className="ml-1 capitalize">{agent.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span className="font-medium">{agent.uptime}%</span>
            </div>
            <Progress value={agent.uptime} className="h-2 mt-1" />
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Memory</span>
              <span className="font-medium">{agent.memoryUsage}%</span>
            </div>
            <Progress value={agent.memoryUsage} className="h-2 mt-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response Time</span>
            <span className="font-medium">{agent.responseTime}ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Error Rate</span>
            <span className="font-medium">{agent.errorRate}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Requests/hr</span>
            <span className="font-medium">{agent.requestsPerHour.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cost Today</span>
            <span className="font-medium">${agent.costToday}</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Active</span>
            <span className="font-medium">{agent.lastActive}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SystemOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockSystemMetrics.totalAgents}</div>
          <p className="text-xs text-muted-foreground">
            {mockSystemMetrics.healthyAgents} healthy, {mockSystemMetrics.warningAgents} warning
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockSystemMetrics.avgResponseTime}ms</div>
          <p className="text-xs text-muted-foreground">Across all agents</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockSystemMetrics.totalRequests.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Cost</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${mockSystemMetrics.totalCost}</div>
          <p className="text-xs text-muted-foreground">Today's total</p>
        </CardContent>
      </Card>
    </div>
  )
}

function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mockAlerts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No active alerts</p>
        ) : (
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  {alert.severity === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {alert.severity === "info" && <Clock className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.agent}</p>
                    <Badge variant="outline" className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function AgentMonitoringPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || agent.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Agent Monitoring</h1>
        <p className="text-muted-foreground">Monitor the health, performance, and activity of all AI agents</p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "healthy" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("healthy")}
              >
                Healthy
              </Button>
              <Button
                variant={statusFilter === "warning" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("warning")}
              >
                Warning
              </Button>
            </div>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No agents found matching your criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts">
          <AlertsPanel />
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>System Uptime</span>
                      <span className="font-medium">{mockSystemMetrics.systemUptime}%</span>
                    </div>
                    <Progress value={mockSystemMetrics.systemUptime} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Average Response Time</span>
                      <span className="font-medium">{mockSystemMetrics.avgResponseTime}ms</span>
                    </div>
                    <Progress
                      value={Math.min(100, (300 - mockSystemMetrics.avgResponseTime) / 3)}
                      className="h-2 mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">${mockSystemMetrics.totalCost}</div>
                  <p className="text-sm text-muted-foreground">Total cost today</p>
                  <div className="space-y-2">
                    {mockAgents.slice(0, 3).map((agent) => (
                      <div key={agent.id} className="flex justify-between text-sm">
                        <span>{agent.name}</span>
                        <span className="font-medium">${agent.costToday}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
