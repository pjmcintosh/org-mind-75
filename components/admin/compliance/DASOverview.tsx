"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Globe, Shield, CheckCircle, AlertTriangle, TrendingUp, FileText, Activity } from "lucide-react"
import { useRole } from "@/lib/context/role-context"

export function DASOverview() {
  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  // RBAC Logic for Lexi-controlled compliance actions
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isCEO = normalizedRole === "ceo"
  const canExecuteComplianceActions = !isReadOnlyAdmin && isCEO

  const regulationTokens = [
    { region: "US", standard: "SOC2 Type II", tokens: 847, passed: 812, failed: 35, compliance: 96 },
    { region: "EU", standard: "GDPR", tokens: 623, passed: 598, failed: 25, compliance: 96 },
    { region: "EU", standard: "AI Act", tokens: 445, passed: 396, failed: 49, compliance: 89 },
    { region: "Global", standard: "ISO 27001", tokens: 734, passed: 697, failed: 37, compliance: 95 },
    { region: "US", standard: "NIST CSF", tokens: 512, passed: 471, failed: 41, compliance: 92 },
  ]

  const dasMetrics = {
    totalScans: 1247,
    activeRules: 3161,
    lastScan: "12 minutes ago",
    avgScanTime: "2.3s",
    falsePositives: 0.8,
  }

  return (
    <div className="space-y-6">
      {/* DAS System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              DAS System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">System Health</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Optimal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Last Scan</span>
                <span className="text-white text-sm">{dasMetrics.lastScan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Active Rules</span>
                <span className="text-white text-sm">{dasMetrics.activeRules.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Avg Scan Time</span>
                <span className="text-white text-sm">{dasMetrics.avgScanTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Scan Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Total Scans (24h)</span>
                <span className="text-white text-sm">{dasMetrics.totalScans.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">False Positive Rate</span>
                <span className="text-green-400 text-sm">{dasMetrics.falsePositives}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Detection Accuracy</span>
                <span className="text-green-400 text-sm">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Coverage</span>
                <span className="text-white text-sm">100%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Audit Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">SOC2 Readiness</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ready</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">ISO 27001</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ready</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">EU AI Act</span>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300 text-sm">Next Audit</span>
                <span className="text-white text-sm">Q2 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulation Tokens Breakdown */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Regulation Tokens by Standard
          </CardTitle>
          <CardDescription className="text-blue-300">
            Breakdown of compliance criteria across all regulatory frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {regulationTokens.map((regulation, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {regulation.region}
                    </Badge>
                    <span className="text-white font-medium">{regulation.standard}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {regulation.passed} passed
                    </span>
                    <span className="text-red-400 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {regulation.failed} failed
                    </span>
                    <span className="text-cyan-400 font-medium">{regulation.compliance}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={regulation.compliance} className="flex-1" />
                  <span className="text-blue-300 text-sm min-w-0">{regulation.tokens} total tokens</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitoring */}
      <Card className="bg-[#0f1a2c]/80 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Real-time Compliance Monitoring
          </CardTitle>
          <CardDescription className="text-blue-300">
            Live feed of DAS compliance checks and validations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "14:23:45",
                agent: "Ephrya",
                check: "PII data handling validation",
                status: "passed",
                standard: "GDPR",
              },
              {
                time: "14:23:42",
                agent: "Max",
                check: "Prompt injection detection",
                status: "flagged",
                standard: "SOC2",
              },
              {
                time: "14:23:38",
                agent: "Ada",
                check: "Decision transparency audit",
                status: "passed",
                standard: "EU AI Act",
              },
              {
                time: "14:23:35",
                agent: "Bob",
                check: "Data retention policy check",
                status: "passed",
                standard: "ISO 27001",
              },
              {
                time: "14:23:31",
                agent: "Lexi",
                check: "Access control validation",
                status: "passed",
                standard: "SOC2",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#0a1220]/50 rounded-lg border border-cyan-500/10"
              >
                <div className="flex items-center gap-4">
                  <span className="text-blue-300 text-sm font-mono">{event.time}</span>
                  <span className="text-white">{event.agent}</span>
                  <span className="text-blue-300">{event.check}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    {event.standard}
                  </Badge>
                  <Badge
                    className={
                      event.status === "passed"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
