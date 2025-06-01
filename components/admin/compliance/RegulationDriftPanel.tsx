"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingDown, Clock, Shield, ExternalLink, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRole } from "@/lib/context/role-context"

export function RegulationDriftPanel() {
  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  const isReadOnlyAdmin = normalizedRole === "admin"
  const isCEO = normalizedRole === "ceo"
  const canExecuteComplianceActions = !isReadOnlyAdmin && isCEO

  const driftAlerts = [
    {
      agent: "Max",
      issue: "Prompt injection vulnerability patterns detected",
      severity: "high",
      standard: "SOC2",
      driftScore: 15,
      timeDetected: "2 hours ago",
      trend: "increasing",
      description: "Agent showing increased susceptibility to prompt injection attacks",
      recommendation: "Update prompt filtering rules and retrain model",
    },
    {
      agent: "Bob",
      issue: "PII data retention exceeding policy limits",
      severity: "medium",
      standard: "GDPR",
      driftScore: 8,
      timeDetected: "4 hours ago",
      trend: "stable",
      description: "Client data being retained beyond approved 30-day window",
      recommendation: "Implement automated data purging for client intake records",
    },
    {
      agent: "OpenAI Legal",
      issue: "Decision transparency requirements not met",
      severity: "medium",
      standard: "EU AI Act",
      driftScore: 12,
      timeDetected: "6 hours ago",
      trend: "increasing",
      description: "Legal recommendations lack required explainability metrics",
      recommendation: "Enable detailed reasoning logs for all legal advice outputs",
    },
    {
      agent: "Ada",
      issue: "Bias detection thresholds exceeded",
      severity: "low",
      standard: "EU AI Act",
      driftScore: 5,
      timeDetected: "8 hours ago",
      trend: "decreasing",
      description: "Strategic planning showing slight bias in resource allocation",
      recommendation: "Review training data for demographic representation",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      case "decreasing":
        return <TrendingDown className="w-4 h-4 text-green-400 rotate-180" />
      case "stable":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Drift Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0f1a2c]/80 border-red-500/20 shadow-lg shadow-red-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-400 text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              High Priority Drifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400 mb-2">
              {driftAlerts.filter((alert) => alert.severity === "high").length}
            </div>
            <p className="text-blue-300 text-sm">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-yellow-500/20 shadow-lg shadow-yellow-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-yellow-400 text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Medium Priority Drifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {driftAlerts.filter((alert) => alert.severity === "medium").length}
            </div>
            <p className="text-blue-300 text-sm">Monitor and plan remediation</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Overall Drift Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">
              {Math.round(driftAlerts.reduce((sum, alert) => sum + alert.driftScore, 0) / driftAlerts.length)}
            </div>
            <p className="text-blue-300 text-sm">Average across all agents</p>
          </CardContent>
        </Card>
      </div>

      {/* Drift Alerts */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Regulatory Drift Detection
              </CardTitle>
              <CardDescription className="text-blue-300">
                Agents showing deviation from approved compliance posture
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      disabled={!canExecuteComplianceActions}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Scan
                    </Button>
                  </div>
                </TooltipTrigger>
                {!canExecuteComplianceActions && (
                  <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                    <p className="text-cyan-300">
                      Only Lexi (Compliance Agent) or the CEO may refresh compliance scans.
                    </p>
                    <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {driftAlerts.map((alert, index) => (
              <div key={index} className="p-4 bg-[#0a1220]/50 rounded-lg border border-cyan-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-lg">{alert.agent}</span>
                      {alert.agent.includes("OpenAI") && <ExternalLink className="w-4 h-4 text-blue-300" />}
                    </div>
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity} priority</Badge>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {alert.standard}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    {getTrendIcon(alert.trend)}
                    <div className="text-right">
                      <div className="text-white font-medium">{alert.driftScore}</div>
                      <div className="text-blue-300 text-xs">Drift Score</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">{alert.issue}</h4>
                    <p className="text-blue-300 text-sm">{alert.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-blue-300 text-sm">Drift Progress:</span>
                    <Progress value={alert.driftScore * 5} className="flex-1 max-w-xs" />
                    <span className="text-blue-300 text-sm">Detected: {alert.timeDetected}</span>
                  </div>

                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-cyan-400 mt-0.5" />
                      <div>
                        <span className="text-cyan-400 text-sm font-medium">Recommendation: </span>
                        <span className="text-white text-sm">{alert.recommendation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    >
                      View Details
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Button
                              size="sm"
                              className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30"
                              disabled={!canExecuteComplianceActions}
                            >
                              Apply Fix
                            </Button>
                          </div>
                        </TooltipTrigger>
                        {!canExecuteComplianceActions && (
                          <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                            <p className="text-cyan-300">
                              Only Lexi (Compliance Agent) or the CEO may apply compliance fixes.
                            </p>
                            <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
