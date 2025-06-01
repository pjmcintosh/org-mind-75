"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Search, CheckCircle, AlertTriangle, XCircle, ExternalLink, Shield } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRole } from "@/lib/context/role-context"

export function AgentComplianceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStandard, setSelectedStandard] = useState("all")

  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  const isReadOnlyAdmin = normalizedRole === "admin"
  const isCEO = normalizedRole === "ceo"
  const canExecuteComplianceActions = !isReadOnlyAdmin && isCEO

  const agentCompliance = [
    {
      name: "Ephrya",
      type: "Internal",
      soc2: { score: 98, status: "compliant", lastAudit: "2024-01-15" },
      gdpr: { score: 96, status: "compliant", lastAudit: "2024-01-12" },
      euAiAct: { score: 94, status: "compliant", lastAudit: "2024-01-10" },
      iso27001: { score: 97, status: "compliant", lastAudit: "2024-01-14" },
      overall: 96,
      criticalIssues: 0,
      lastScan: "2 min ago",
    },
    {
      name: "Bob",
      type: "Internal",
      soc2: { score: 95, status: "compliant", lastAudit: "2024-01-15" },
      gdpr: { score: 89, status: "warning", lastAudit: "2024-01-12" },
      euAiAct: { score: 92, status: "compliant", lastAudit: "2024-01-10" },
      iso27001: { score: 94, status: "compliant", lastAudit: "2024-01-14" },
      overall: 93,
      criticalIssues: 1,
      lastScan: "5 min ago",
    },
    {
      name: "Ada",
      type: "Internal",
      soc2: { score: 97, status: "compliant", lastAudit: "2024-01-15" },
      gdpr: { score: 95, status: "compliant", lastAudit: "2024-01-12" },
      euAiAct: { score: 88, status: "warning", lastAudit: "2024-01-10" },
      iso27001: { score: 96, status: "compliant", lastAudit: "2024-01-14" },
      overall: 94,
      criticalIssues: 0,
      lastScan: "3 min ago",
    },
    {
      name: "Max",
      type: "Internal",
      soc2: { score: 91, status: "warning", lastAudit: "2024-01-15" },
      gdpr: { score: 94, status: "compliant", lastAudit: "2024-01-12" },
      euAiAct: { score: 90, status: "compliant", lastAudit: "2024-01-10" },
      iso27001: { score: 93, status: "compliant", lastAudit: "2024-01-14" },
      overall: 92,
      criticalIssues: 2,
      lastScan: "1 min ago",
    },
    {
      name: "Lexi",
      type: "External (AWS)",
      soc2: { score: 99, status: "compliant", lastAudit: "2024-01-15" },
      gdpr: { score: 98, status: "compliant", lastAudit: "2024-01-12" },
      euAiAct: { score: 96, status: "compliant", lastAudit: "2024-01-10" },
      iso27001: { score: 99, status: "compliant", lastAudit: "2024-01-14" },
      overall: 98,
      criticalIssues: 0,
      lastScan: "4 min ago",
    },
    {
      name: "OpenAI Legal",
      type: "External (OpenAI)",
      soc2: { score: 94, status: "compliant", lastAudit: "2024-01-15" },
      gdpr: { score: 92, status: "compliant", lastAudit: "2024-01-12" },
      euAiAct: { score: 87, status: "warning", lastAudit: "2024-01-10" },
      iso27001: { score: 95, status: "compliant", lastAudit: "2024-01-14" },
      overall: 92,
      criticalIssues: 1,
      lastScan: "8 min ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "non-compliant":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs"
    switch (status) {
      case "compliant":
        return <Badge className={`${baseClasses} bg-green-500/20 text-green-400 border-green-500/30`}>Compliant</Badge>
      case "warning":
        return <Badge className={`${baseClasses} bg-yellow-500/20 text-yellow-400 border-yellow-500/30`}>Warning</Badge>
      case "non-compliant":
        return <Badge className={`${baseClasses} bg-red-500/20 text-red-400 border-red-500/30`}>Non-Compliant</Badge>
      default:
        return <Badge className={`${baseClasses} bg-green-500/20 text-green-400 border-green-500/30`}>Compliant</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Agent Compliance Status
          </CardTitle>
          <CardDescription className="text-blue-300">
            Detailed compliance status for all agents across regulatory standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#0a1220]/50 border-cyan-500/20 text-white placeholder-blue-300"
                />
              </div>
            </div>
            <Select value={selectedStandard} onValueChange={setSelectedStandard}>
              <SelectTrigger className="w-48 bg-[#0a1220]/50 border-cyan-500/20 text-white">
                <SelectValue placeholder="Filter by standard" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1a2c] border-cyan-500/20">
                <SelectItem value="all">All Standards</SelectItem>
                <SelectItem value="soc2">SOC2 Type II</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
                <SelectItem value="euAiAct">EU AI Act</SelectItem>
                <SelectItem value="iso27001">ISO 27001</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agent Compliance Table */}
          <div className="space-y-4">
            {agentCompliance.map((agent, index) => (
              <div key={index} className="p-4 bg-[#0a1220]/50 rounded-lg border border-cyan-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-lg">{agent.name}</span>
                      {agent.type.includes("External") && <ExternalLink className="w-4 h-4 text-blue-300" />}
                    </div>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {agent.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white font-medium">{agent.overall}%</div>
                      <div className="text-blue-300 text-xs">Overall Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 font-medium">{agent.criticalIssues}</div>
                      <div className="text-blue-300 text-xs">Critical Issues</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-300 text-sm">{agent.lastScan}</div>
                      <div className="text-blue-300 text-xs">Last Scan</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 text-sm">SOC2 Type II</span>
                      {getStatusIcon(agent.soc2.status)}
                    </div>
                    <Progress value={agent.soc2.score} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{agent.soc2.score}%</span>
                      {getStatusBadge(agent.soc2.status)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 text-sm">GDPR</span>
                      {getStatusIcon(agent.gdpr.status)}
                    </div>
                    <Progress value={agent.gdpr.score} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{agent.gdpr.score}%</span>
                      {getStatusBadge(agent.gdpr.status)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 text-sm">EU AI Act</span>
                      {getStatusIcon(agent.euAiAct.status)}
                    </div>
                    <Progress value={agent.euAiAct.score} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{agent.euAiAct.score}%</span>
                      {getStatusBadge(agent.euAiAct.status)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-300 text-sm">ISO 27001</span>
                      {getStatusIcon(agent.iso27001.status)}
                    </div>
                    <Progress value={agent.iso27001.score} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{agent.iso27001.score}%</span>
                      {getStatusBadge(agent.iso27001.status)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                            disabled={!canExecuteComplianceActions}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {!canExecuteComplianceActions && (
                        <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                          <p className="text-cyan-300">
                            Only Lexi (Compliance Agent) or the CEO may access detailed compliance data.
                          </p>
                          <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
