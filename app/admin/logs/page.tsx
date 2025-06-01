"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Search,
  Download,
  Filter,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Shield,
  Bot,
} from "lucide-react"
import { useRole } from "@/lib/context/role-context"
import { redirect } from "next/navigation"

// Mock log data
const mockLogs = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:15Z",
    level: "info",
    category: "authentication",
    message: "User sarah.chen@company.com logged in successfully",
    source: "auth-service",
    userId: "user_123",
    details: { ip: "192.168.1.100", userAgent: "Mozilla/5.0..." },
  },
  {
    id: "2",
    timestamp: "2024-01-15T10:28:42Z",
    level: "warning",
    category: "agent",
    message: "Agent Ada response time exceeded threshold (2.3s)",
    source: "agent-monitor",
    agentId: "ada",
    details: { responseTime: 2300, threshold: 2000 },
  },
  {
    id: "3",
    timestamp: "2024-01-15T10:25:33Z",
    level: "error",
    category: "system",
    message: "Database connection pool exhausted",
    source: "db-service",
    details: { poolSize: 20, activeConnections: 20 },
  },
  {
    id: "4",
    timestamp: "2024-01-15T10:22:18Z",
    level: "info",
    category: "agent",
    message: "Agent Bob completed project analysis for Project-456",
    source: "agent-orchestrator",
    agentId: "bob",
    projectId: "project_456",
  },
  {
    id: "5",
    timestamp: "2024-01-15T10:20:05Z",
    level: "success",
    category: "security",
    message: "Security scan completed - no threats detected",
    source: "security-agent",
    details: { scannedFiles: 1247, threatsFound: 0 },
  },
]

export default function SystemLogsPage() {
  const { currentRole } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  // Check authorization
  if (!["admin", "ceo", "developer"].includes(currentRole.toLowerCase())) {
    redirect("/unauthorized")
  }

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Info className="h-4 w-4 text-slate-400" />
    }
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <Shield className="h-4 w-4" />
      case "agent":
        return <Bot className="h-4 w-4" />
      case "system":
        return <Database className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const logCounts = {
    total: mockLogs.length,
    error: mockLogs.filter((l) => l.level === "error").length,
    warning: mockLogs.filter((l) => l.level === "warning").length,
    info: mockLogs.filter((l) => l.level === "info").length,
    success: mockLogs.filter((l) => l.level === "success").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">System Logs</h1>
            <p className="text-slate-400 mt-2">Monitor system activity and troubleshoot issues</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Logs</p>
                  <p className="text-2xl font-bold text-white">{logCounts.total}</p>
                </div>
                <FileText className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Errors</p>
                  <p className="text-2xl font-bold text-red-400">{logCounts.error}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-400">{logCounts.warning}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Info</p>
                  <p className="text-2xl font-bold text-blue-400">{logCounts.info}</p>
                </div>
                <Info className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Success</p>
                  <p className="text-2xl font-bold text-green-400">{logCounts.success}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search logs by message or source..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">All Levels</option>
                  <option value="error">Error</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="authentication">Authentication</option>
                  <option value="agent">Agent</option>
                  <option value="system">System</option>
                  <option value="security">Security</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Logs ({filteredLogs.length})</CardTitle>
            <CardDescription className="text-slate-400">Real-time system activity and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getLevelIcon(log.level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getLevelBadgeColor(log.level)}>{log.level}</Badge>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {getCategoryIcon(log.category)}
                            <span className="ml-1">{log.category}</span>
                          </Badge>
                          <span className="text-xs text-slate-500">{log.source}</span>
                        </div>
                        <p className="text-white font-medium">{log.message}</p>
                        {log.details && (
                          <pre className="text-xs text-slate-400 mt-2 bg-slate-800 p-2 rounded overflow-x-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-400 ml-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
