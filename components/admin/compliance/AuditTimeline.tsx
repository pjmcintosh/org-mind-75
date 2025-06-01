"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Shield,
  RefreshCw,
  Download,
  ExternalLink,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRole } from "@/lib/context/role-context"

export function AuditTimeline() {
  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  const isReadOnlyAdmin = normalizedRole === "admin"
  const isCEO = normalizedRole === "ceo"
  const canExecuteComplianceActions = !isReadOnlyAdmin && isCEO

  const auditEvents = [
    {
      id: 1,
      timestamp: "2024-01-15 14:23:45",
      type: "compliance_check",
      agent: "Ephrya",
      event: "SOC2 automated audit completed",
      status: "passed",
      standard: "SOC2",
      details: "All 847 control points validated successfully",
      severity: "info",
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:20:12",
      type: "violation",
      agent: "Max",
      event: "Prompt injection vulnerability detected",
      status: "flagged",
      standard: "SOC2",
      details: "Potential security bypass in prompt processing pipeline",
      severity: "high",
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:15:33",
      type: "remediation",
      agent: "Bob",
      event: "PII data retention policy updated",
      status: "resolved",
      standard: "GDPR",
      details: "Automated data purging implemented for client intake records",
      severity: "medium",
    },
    {
      id: 4,
      timestamp: "2024-01-15 14:10:21",
      type: "audit_replay",
      agent: "Ada",
      event: "EU AI Act compliance replay initiated",
      status: "in_progress",
      standard: "EU AI Act",
      details: "Re-evaluating decision transparency requirements",
      severity: "info",
    },
    {
      id: 5,
      timestamp: "2024-01-15 14:05:44",
      type: "compliance_check",
      agent: "Lexi",
      event: "ISO 27001 access control validation",
      status: "passed",
      standard: "ISO 27001",
      details: "All access controls verified and documented",
      severity: "info",
    },
    {
      id: 6,
      timestamp: "2024-01-15 14:00:15",
      type: "violation",
      agent: "OpenAI Legal",
      event: "Decision explainability threshold exceeded",
      status: "flagged",
      standard: "EU AI Act",
      details: "Legal advice outputs lack required transparency metrics",
      severity: "medium",
    },
    {
      id: 7,
      timestamp: "2024-01-15 13:55:32",
      type: "compliance_check",
      agent: "Janet",
      event: "Financial data handling audit",
      status: "passed",
      standard: "SOC2",
      details: "All financial data processing controls validated",
      severity: "info",
    },
    {
      id: 8,
      timestamp: "2024-01-15 13:50:18",
      type: "remediation",
      agent: "Eve",
      event: "System monitoring compliance updated",
      status: "resolved",
      standard: "ISO 27001",
      details: "Enhanced logging and monitoring controls implemented",
      severity: "low",
    },
  ]

  const getEventIcon = (type: string, status: string) => {
    switch (type) {
      case "compliance_check":
        return status === "passed" ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )
      case "violation":
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case "remediation":
        return <Shield className="w-5 h-5 text-cyan-400" />
      case "audit_replay":
        return <RefreshCw className="w-5 h-5 text-blue-400" />
      default:
        return <Clock className="w-5 h-5 text-blue-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Passed</Badge>
      case "flagged":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Flagged</Badge>
      case "resolved":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500/20"
      case "medium":
        return "border-yellow-500/20"
      case "low":
        return "border-blue-500/20"
      default:
        return "border-cyan-500/10"
    }
  }

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                DAS Activity Timeline
              </CardTitle>
              <CardDescription className="text-blue-300">
                Real-time compliance events, violations, and audit activities
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        disabled={!canExecuteComplianceActions}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Log
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canExecuteComplianceActions && (
                    <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                      <p className="text-cyan-300">Only Lexi (Compliance Agent) or the CEO may export audit logs.</p>
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
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        disabled={!canExecuteComplianceActions}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!canExecuteComplianceActions && (
                    <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                      <p className="text-cyan-300">Only Lexi (Compliance Agent) or the CEO may refresh audit data.</p>
                      <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Timeline Events */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardContent className="p-6">
          <div className="space-y-4">
            {auditEvents.map((event, index) => (
              <div
                key={event.id}
                className={`p-4 bg-[#0a1220]/50 rounded-lg border ${getSeverityColor(event.severity)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getEventIcon(event.type, event.status)}</div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">{event.event}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300">{event.agent}</span>
                          {event.agent.includes("OpenAI") && <ExternalLink className="w-3 h-3 text-blue-300" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                          {event.standard}
                        </Badge>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>

                    <p className="text-blue-300 text-sm">{event.details}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-blue-300 text-sm font-mono">{event.timestamp}</span>
                        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-xs">
                          {event.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              Load More Events
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#0f1a2c]/80 border-green-500/20 shadow-lg shadow-green-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Passed Audits</p>
                <p className="text-2xl font-bold text-white">
                  {auditEvents.filter((e) => e.status === "passed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-red-500/20 shadow-lg shadow-red-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm font-medium">Violations</p>
                <p className="text-2xl font-bold text-white">
                  {auditEvents.filter((e) => e.status === "flagged").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-400 text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold text-white">
                  {auditEvents.filter((e) => e.status === "resolved").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-yellow-500/20 shadow-lg shadow-yellow-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-white">
                  {auditEvents.filter((e) => e.status === "in_progress").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
