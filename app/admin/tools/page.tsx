"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wrench,
  Database,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Terminal,
  FileText,
  Settings,
  HardDrive,
} from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"

interface SystemInfo {
  version: string
  uptime: string
  memory: string
  storage: string
  lastBackup: string
}

interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
  source: string
}

export default function AdminToolsPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const normalizedRole = currentRole.toLowerCase()

  const [systemInfo] = useState<SystemInfo>({
    version: "1.2.3",
    uptime: "7 days, 14 hours",
    memory: "2.4 GB / 8 GB",
    storage: "45 GB / 100 GB",
    lastBackup: "2024-01-22T02:00:00Z",
  })

  const [logs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-22T15:30:00Z",
      level: "info",
      message: "System backup completed successfully",
      source: "backup-service",
    },
    {
      id: "2",
      timestamp: "2024-01-22T14:45:00Z",
      level: "warning",
      message: "High memory usage detected: 85%",
      source: "system-monitor",
    },
    {
      id: "3",
      timestamp: "2024-01-22T13:20:00Z",
      level: "error",
      message: "Failed to connect to external API endpoint",
      source: "integration-service",
    },
    {
      id: "4",
      timestamp: "2024-01-22T12:15:00Z",
      level: "info",
      message: "Database optimization completed",
      source: "database-service",
    },
    {
      id: "5",
      timestamp: "2024-01-22T11:30:00Z",
      level: "info",
      message: "Agent configuration updated successfully",
      source: "agent-manager",
    },
  ])

  const [commandOutput, setCommandOutput] = useState<string>("")
  const [isExecuting, setIsExecuting] = useState(false)

  // Redirect non-admin users
  if (normalizedRole !== "admin") {
    router.push("/unauthorized")
    return null
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "warning":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
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

  const executeCommand = async (command: string) => {
    setIsExecuting(true)
    setCommandOutput("Executing command...\n")

    // Simulate command execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockOutputs: Record<string, string> = {
      "system status":
        "System Status: HEALTHY\nUptime: 7 days, 14 hours\nMemory: 2.4GB/8GB (30%)\nCPU: 15%\nDisk: 45GB/100GB (45%)",
      "backup create":
        "Creating system backup...\nBackup ID: backup_20240122_153000\nStatus: SUCCESS\nSize: 2.3GB\nLocation: /backups/backup_20240122_153000.tar.gz",
      "cache clear":
        "Clearing application cache...\nCleared 1,247 cache entries\nFreed 156MB of memory\nCache clear completed successfully",
      "logs tail":
        "Tailing system logs...\n[INFO] Agent Bob processed 23 requests\n[INFO] Database connection pool healthy\n[WARN] Memory usage at 85%\n[INFO] Backup scheduled for 02:00 UTC",
    }

    const output =
      mockOutputs[command.toLowerCase()] ||
      `Command '${command}' executed successfully.\nOutput would appear here in a real system.`
    setCommandOutput(output)
    setIsExecuting(false)
  }

  const handleBackup = () => {
    executeCommand("backup create")
  }

  const handleClearCache = () => {
    executeCommand("cache clear")
  }

  const handleSystemStatus = () => {
    executeCommand("system status")
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
                  <Wrench className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">Basic Admin Tools</CardTitle>
                  <CardDescription className="text-blue-300">
                    System utilities and configuration management
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

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="system">System Info</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Version
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{systemInfo.version}</div>
                  <p className="text-xs text-slate-400">Current system version</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{systemInfo.uptime}</div>
                  <p className="text-xs text-slate-400">System uptime</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Memory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{systemInfo.memory}</div>
                  <p className="text-xs text-slate-400">Memory usage</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{systemInfo.storage}</div>
                  <p className="text-xs text-slate-400">Disk usage</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">System Health</CardTitle>
                <CardDescription className="text-blue-300">
                  Overall system performance and health metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">CPU Usage</span>
                      <span className="text-slate-300">15%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-slate-300">30%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Disk Usage</span>
                      <span className="text-slate-300">45%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSystemStatus} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Status
                  </Button>
                  <Button variant="outline" className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Cache Management</CardTitle>
                  <CardDescription className="text-blue-300">Clear system cache and temporary files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-slate-300">
                      Clearing cache may temporarily slow down the system while it rebuilds.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={handleClearCache} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Cache
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Database Maintenance</CardTitle>
                  <CardDescription className="text-blue-300">Optimize database performance and cleanup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10">
                      <Database className="h-4 w-4 mr-2" />
                      Optimize Tables
                    </Button>
                    <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rebuild Indexes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  System Logs
                </CardTitle>
                <CardDescription className="text-blue-300">Recent system events and error logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="p-3 rounded-lg border border-cyan-500/20 bg-slate-800/30">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getLevelColor(log.level)}>
                              {getLevelIcon(log.level)}
                              <span className="ml-1">{log.level.toUpperCase()}</span>
                            </Badge>
                            <span className="text-xs text-slate-500">{formatDate(log.timestamp)}</span>
                          </div>
                          <p className="text-sm text-white mb-1">{log.message}</p>
                          <p className="text-xs text-slate-400">Source: {log.source}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Backup Management</CardTitle>
                <CardDescription className="text-blue-300">Create and manage system backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-cyan-500/20 bg-slate-800/30">
                      <h3 className="font-medium text-white mb-2">Last Backup</h3>
                      <p className="text-sm text-slate-400">{formatDate(systemInfo.lastBackup)}</p>
                      <p className="text-xs text-slate-500 mt-1">Size: 2.3 GB</p>
                    </div>

                    <Button onClick={handleBackup} className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-cyan-300">Backup Schedule</Label>
                      <div className="p-3 rounded border border-cyan-500/20 bg-slate-800/50">
                        <p className="text-sm text-white">Daily at 2:00 AM UTC</p>
                        <p className="text-xs text-slate-400">Retention: 30 days</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terminal" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  System Terminal
                </CardTitle>
                <CardDescription className="text-blue-300">Execute system commands and view output</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-cyan-300">Command</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter system command..."
                      className="bg-slate-800/50 border-cyan-500/30 font-mono"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          executeCommand((e.target as HTMLInputElement).value)
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.querySelector(
                          'input[placeholder="Enter system command..."]',
                        ) as HTMLInputElement
                        if (input) executeCommand(input.value)
                      }}
                      disabled={isExecuting}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                    >
                      {isExecuting ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Execute"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-cyan-300">Output</Label>
                  <Textarea
                    value={commandOutput}
                    readOnly
                    className="bg-black/50 border-cyan-500/30 font-mono text-green-400 min-h-[200px]"
                    placeholder="Command output will appear here..."
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => executeCommand("system status")}
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    system status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => executeCommand("logs tail")}
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    logs tail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => executeCommand("cache clear")}
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  >
                    cache clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
