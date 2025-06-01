"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Zap,
  RefreshCw,
  Search,
  AlertCircle,
  FileText,
  Trash2,
  Shield,
  Info,
  History,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"

export default function EphryaAgentPage() {
  const [autonomyLevel, setAutonomyLevel] = useState("Full Autonomy")
  const [actionFilter, setActionFilter] = useState("All")

  useEffect(() => {
    console.log("Loaded: EphryaProfilePage with standardized header")
    console.log("Loaded: EphryaQuickActions")
    console.log("Loaded: EphryaAutonomyMeter")
    console.log("Loaded: EphryaActionHistory")
    console.log("Loaded: EphryaVisualProfile")
  }, [])

  const mockInsights = [
    {
      id: 1,
      type: "risk",
      title: "3 projects at risk",
      description: "Budget overruns detected in Q4 initiatives",
      severity: "high",
      icon: AlertTriangle,
    },
    {
      id: 2,
      type: "alert",
      title: "Janet flagged budget overrun",
      description: "Project Alpha exceeding allocated resources by 15%",
      severity: "medium",
      icon: TrendingUp,
    },
    {
      id: 3,
      type: "optimization",
      title: "Agent efficiency up 12%",
      description: "Cross-department collaboration improved this week",
      severity: "low",
      icon: Users,
    },
    {
      id: 4,
      type: "workflow",
      title: "New workflow pattern detected",
      description: "Ada-Bob handoffs increased 40% - potential bottleneck",
      severity: "medium",
      icon: Activity,
    },
  ]

  const mockActivity = [
    {
      id: 1,
      timestamp: "2 mins ago",
      type: "handoff",
      description: "Facilitated Ada → Bob project handoff",
      agents: ["Ada", "Bob"],
    },
    {
      id: 2,
      timestamp: "5 mins ago",
      type: "escalation",
      description: "Escalated budget concern to CEO approval queue",
      agents: ["Janet", "CEO"],
    },
    {
      id: 3,
      timestamp: "8 mins ago",
      type: "sync",
      description: "Synchronized agent workloads across departments",
      agents: ["All Agents"],
    },
    {
      id: 4,
      timestamp: "12 mins ago",
      type: "analysis",
      description: "Completed cross-project dependency analysis",
      agents: ["Max", "Shandry"],
    },
    {
      id: 5,
      timestamp: "15 mins ago",
      type: "optimization",
      description: "Optimized workflow routing for legal reviews",
      agents: ["OpenAI Legal", "Ada"],
    },
  ]

  const mockActionLog = [
    {
      id: 1,
      timestamp: "10:04 AM",
      action: "Sync All Agents",
      context: "System-wide",
      status: "Executed",
      triggerType: "Auto",
    },
    {
      id: 2,
      timestamp: "9:48 AM",
      action: "Escalate Alert",
      context: "PR3-008",
      status: "Suggested",
      triggerType: "Manual",
    },
    {
      id: 3,
      timestamp: "9:22 AM",
      action: "Flag Confidence Drift",
      context: "Bob",
      status: "Executed",
      triggerType: "Auto",
    },
    {
      id: 4,
      timestamp: "8:55 AM",
      action: "Generate Org Summary",
      context: "Weekly Report",
      status: "Executed",
      triggerType: "Manual",
    },
    {
      id: 5,
      timestamp: "8:31 AM",
      action: "Purge Idle Tokens",
      context: "System Cleanup",
      status: "Suggested",
      triggerType: "Auto",
    },
    {
      id: 6,
      timestamp: "8:15 AM",
      action: "Reassign Workflow",
      context: "Ada → Max",
      status: "Executed",
      triggerType: "Auto",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "handoff":
        return Users
      case "escalation":
        return AlertTriangle
      case "sync":
        return RefreshCw
      case "analysis":
        return Search
      case "optimization":
        return Zap
      default:
        return Activity
    }
  }

  const getAutonomyBadgeVariant = (level: string) => {
    switch (level) {
      case "Suggestion Only":
        return "secondary"
      case "Semi-Autonomous":
        return "default"
      case "Full Autonomy":
        return "default"
      default:
        return "secondary"
    }
  }

  const getAutonomyBadgeColor = (level: string) => {
    switch (level) {
      case "Suggestion Only":
        return "text-gray-600 border-gray-200"
      case "Semi-Autonomous":
        return "text-amber-600 border-amber-200"
      case "Full Autonomy":
        return "text-cyan-400 border-cyan-300"
      default:
        return "text-gray-600 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Executed":
        return "text-cyan-400 border-cyan-300"
      case "Suggested":
        return "text-gray-400 border-gray-300"
      default:
        return "text-gray-400 border-gray-300"
    }
  }

  const getTriggerBadgeColor = (triggerType: string) => {
    switch (triggerType) {
      case "Auto":
        return "text-cyan-400 border-cyan-300"
      case "Manual":
        return "text-violet-400 border-violet-300"
      default:
        return "text-gray-400 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <TooltipProvider>
        <div className="container mx-auto p-6 space-y-6">
          {/* Cinematic Header with Avatar */}
          <AgentProfileHeader
            name="Tilo"
            role="Organizational Mind"
            avatarSrc="/tilo-static-avatar.png"
            fallbackInitials="T"
            description="Central intelligence and coordination system orchestrating seamless collaboration across all organizational agents and workflows."
            statusBadges={["Online", "System Core"]}
          />

          <Separator className="bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <Clock className="h-4 w-4" />
                  Last Sync
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3 mins ago</div>
                <p className="text-xs text-slate-400">All agents synchronized</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <Users className="h-4 w-4" />
                  Active Agents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">7/7</div>
                <p className="text-xs text-slate-400">All systems operational</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyan-400">
                  <TrendingUp className="h-4 w-4" />
                  Efficiency Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">94%</div>
                <p className="text-xs text-slate-400">+12% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">
                System-wide orchestration and organizational controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-auto p-4 bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                      onClick={() => console.log("Triggered: Sync All Agents")}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">Sync All Agents</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Force synchronization across all agent systems</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-auto p-4 bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                      onClick={() => console.log("Triggered: Run Full System Audit")}
                    >
                      <Search className="h-4 w-4" />
                      <span className="text-sm">Run Full System Audit</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Perform comprehensive system-wide audit and health check</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-auto p-4 bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                      onClick={() => console.log("Triggered: Escalate Unresolved Alerts")}
                    >
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Escalate Unresolved Alerts</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Escalate all unresolved system alerts to appropriate personnel</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-auto p-4 bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                      onClick={() => console.log("Triggered: Generate Org Summary")}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">Generate Org Summary</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate comprehensive organizational intelligence report</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-auto p-4 bg-slate-700/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
                      onClick={() => console.log("Triggered: Purge Idle Tokens")}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm">Purge Idle Tokens</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clean up unused tokens and optimize system resources</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* Autonomy Level */}
          <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Shield className="h-5 w-5" />
                Autonomy Level
              </CardTitle>
              <CardDescription className="text-slate-300">
                Configure Ephrya's operational trust and decision-making authority
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="autonomy-select" className="text-sm font-medium text-cyan-300">
                    Current Trust Level
                  </Label>
                  <Select value={autonomyLevel} onValueChange={setAutonomyLevel}>
                    <SelectTrigger
                      id="autonomy-select"
                      className="w-full mt-1 bg-slate-700/50 border-cyan-500/30 text-white"
                    >
                      <SelectValue placeholder="Select autonomy level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-cyan-500/30">
                      <SelectItem value="Suggestion Only">Suggestion Only</SelectItem>
                      <SelectItem value="Semi-Autonomous">Semi-Autonomous</SelectItem>
                      <SelectItem value="Full Autonomy">Full Autonomy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={getAutonomyBadgeVariant(autonomyLevel)}
                    className={getAutonomyBadgeColor(autonomyLevel)}
                  >
                    {autonomyLevel}
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Autonomy level determines what Ephrya is allowed to trigger without human approval.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                <p className="text-sm text-slate-300">
                  {autonomyLevel === "Suggestion Only" &&
                    "At Suggestion Only level, Ephrya provides recommendations but requires approval for all actions."}
                  {autonomyLevel === "Semi-Autonomous" &&
                    "At Semi-Autonomous level, Ephrya can perform routine tasks but requires approval for critical decisions."}
                  {autonomyLevel === "Full Autonomy" &&
                    "At Full Autonomy, Ephrya may initiate escalation, assign agents, or trigger workflows without approval."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ephrya Action Log */}
          <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <History className="h-5 w-5" />
                Ephrya Action Log
              </CardTitle>
              <CardDescription className="text-slate-300">
                Transparent audit trail of Ephrya's actions and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Label htmlFor="action-filter" className="text-sm font-medium text-cyan-300">
                  Show:
                </Label>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger id="action-filter" className="w-32 bg-slate-700/50 border-cyan-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-cyan-500/30">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Auto">Auto</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Log Table */}
              <div className="rounded-md border border-cyan-500/20 overflow-x-auto bg-slate-700/20">
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyan-500/20">
                      <TableHead className="w-24 text-cyan-300">Timestamp</TableHead>
                      <TableHead className="text-cyan-300">Action</TableHead>
                      <TableHead className="text-cyan-300">Context / Target</TableHead>
                      <TableHead className="w-24 text-cyan-300">Status</TableHead>
                      <TableHead className="w-24 text-cyan-300">Trigger Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActionLog.map((action) => (
                      <TableRow key={action.id} className="border-cyan-500/10 hover:bg-cyan-500/5">
                        <TableCell className="font-mono text-sm text-slate-300">{action.timestamp}</TableCell>
                        <TableCell className="font-medium text-white">{action.action}</TableCell>
                        <TableCell className="text-slate-400">{action.context}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadgeColor(action.status)}>
                            {action.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getTriggerBadgeColor(action.triggerType)}>
                            {action.triggerType}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Insights and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Insights */}
            <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Brain className="h-5 w-5" />
                  Top Insights
                </CardTitle>
                <CardDescription className="text-slate-300">AI-driven organizational intelligence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInsights.map((insight) => {
                  const IconComponent = insight.icon
                  return (
                    <div
                      key={insight.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20"
                    >
                      <div className="p-1.5 bg-cyan-500/20 rounded">
                        <IconComponent className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm text-white">{insight.title}</h4>
                          <Badge variant={getSeverityColor(insight.severity)} className="text-xs">
                            {insight.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">{insight.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Activity className="h-5 w-5" />
                  Recent Agent Activity
                </CardTitle>
                <CardDescription className="text-slate-300">Cross-agent coordination and handoffs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-cyan-500/5 transition-colors border border-transparent hover:border-cyan-500/20"
                    >
                      <div className="p-1 bg-cyan-500/20 rounded">
                        <IconComponent className="h-3 w-3 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">{activity.timestamp}</span>
                          <div className="flex gap-1">
                            {activity.agents.map((agent, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs px-1.5 py-0 text-cyan-300 border-cyan-500/30"
                              >
                                {agent}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="bg-slate-800/50 border-violet-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Zap className="h-5 w-5" />
                System Health Overview
              </CardTitle>
              <CardDescription className="text-slate-300">Real-time organizational metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20">
                  <div className="text-lg font-bold text-cyan-400">98.7%</div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20">
                  <div className="text-lg font-bold text-violet-400">142ms</div>
                  <div className="text-xs text-slate-400">Avg Response</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20">
                  <div className="text-lg font-bold text-cyan-400">23</div>
                  <div className="text-xs text-slate-400">Active Workflows</div>
                </div>
                <div className="text-center p-3 rounded-lg border border-cyan-500/20 bg-slate-700/20">
                  <div className="text-lg font-bold text-violet-400">5.2k</div>
                  <div className="text-xs text-slate-400">Daily Operations</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    </div>
  )
}
