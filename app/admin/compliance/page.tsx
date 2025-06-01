"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, XCircle, Filter, Download } from "lucide-react"
import { DASOverview } from "@/components/admin/compliance/DASOverview"
import { AgentComplianceTable } from "@/components/admin/compliance/AgentComplianceTable"
import { RegulationDriftPanel } from "@/components/admin/compliance/RegulationDriftPanel"
import { AuditTimeline } from "@/components/admin/compliance/AuditTimeline"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRole } from "@/lib/context/role-context"
import { humanLabels } from "@/lib/humanLabels"

export default function ComplianceDashboard() {
  console.log("Loaded: ComplianceDashboard")

  const [selectedStandard, setSelectedStandard] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  // RBAC Logic for Lexi-controlled Compliance
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isLexiOwner = false // Lexi is an agent, not a user role
  const isCEO = normalizedRole === "ceo"
  const canExecuteComplianceActions = !isReadOnlyAdmin && isCEO

  // Mock compliance metrics
  const complianceMetrics = {
    overall: 94,
    soc2: 96,
    nist: 92,
    euAiAct: 89,
    iso27001: 95,
  }

  const criticalAlerts = [
    {
      id: 1,
      agent: "Max",
      issue: "Prompt injection vulnerability detected",
      severity: "high",
      standard: "SOC2",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      agent: "Bob",
      issue: "PII retention policy drift",
      severity: "medium",
      standard: "GDPR",
      timestamp: "4 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">
              {humanLabels?.navigation?.complianceDashboard || "Compliance Dashboard"}
            </h1>
            <p className="text-blue-300">
              {humanLabels?.descriptions?.complianceDashboard ||
                "Regulatory posture, audit readiness, and Dynamic Audit System monitoring"}
            </p>
            <div className="mt-2 text-sm text-blue-200">
              {humanLabels?.onboarding?.lexi ||
                "Lexi is your compliance ally. She watches for things that might get us into trouble."}
            </div>
          </div>
          <div className="flex gap-3">
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
                      {humanLabels?.actions?.exportReport || "Export Report"}
                    </Button>
                  </div>
                </TooltipTrigger>
                {!canExecuteComplianceActions && (
                  <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                    <p className="text-cyan-300">Only Lexi (Compliance Agent) or the CEO may perform this action.</p>
                    <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Compliance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 text-sm font-medium">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{complianceMetrics.overall}%</span>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <Progress value={complianceMetrics.overall} className="mt-2" />
              <p className="text-blue-300 text-xs mt-2">+2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 text-sm font-medium">SOC2 Type II</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{complianceMetrics.soc2}%</span>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <Progress value={complianceMetrics.soc2} className="mt-2" />
              <p className="text-blue-300 text-xs mt-2">Audit ready</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 text-sm font-medium">EU AI Act</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{complianceMetrics.euAiAct}%</span>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
              <Progress value={complianceMetrics.euAiAct} className="mt-2" />
              <p className="text-blue-300 text-xs mt-2">3 items pending</p>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-cyan-400 text-sm font-medium">Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-400">{criticalAlerts.length}</span>
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-blue-300 text-xs mt-2">Requires immediate attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#0f1a2c]/80 border-cyan-500/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              DAS Overview
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Agent Compliance
            </TabsTrigger>
            <TabsTrigger value="drift" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              Regulatory Drift
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Audit Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DASOverview />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentComplianceTable />
          </TabsContent>

          <TabsContent value="drift" className="space-y-6">
            <RegulationDriftPanel />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <AuditTimeline />
          </TabsContent>
        </Tabs>

        {/* Critical Alerts Panel */}
        <Card className="bg-[#0f1a2c]/80 border-red-500/20 shadow-lg shadow-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Critical Compliance Alerts
            </CardTitle>
            <CardDescription className="text-blue-300">Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <div>
                      <p className="text-white font-medium">{alert.issue}</p>
                      <p className="text-blue-300 text-sm">
                        Agent: {alert.agent} • Standard: {alert.standard}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                      {alert.severity}
                    </Badge>
                    <span className="text-blue-300 text-sm">{alert.timestamp}</span>
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
                              Investigate
                            </Button>
                          </div>
                        </TooltipTrigger>
                        {!canExecuteComplianceActions && (
                          <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                            <p className="text-cyan-300">
                              Only Lexi (Compliance Agent) or the CEO may investigate compliance issues.
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
    </div>
  )
}
