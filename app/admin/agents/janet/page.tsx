"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calculator,
  PieChart,
  Activity,
  ExternalLink,
  BarChart3,
} from "lucide-react"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"
import Link from "next/link"

export default function JanetAgentProfilePage() {
  console.log("Loaded: JanetAgentPage")

  const mockCostFindings = [
    {
      id: 1,
      finding: "Agent token efficiency improved by 12% this quarter",
      impact: "Saved $3,200 monthly",
      timestamp: "2024-01-26 14:30",
      type: "optimization",
    },
    {
      id: 2,
      finding: "Third-party lease costs trending 8% above forecast",
      impact: "Additional $340 monthly",
      timestamp: "2024-01-26 09:15",
      type: "alert",
    },
    {
      id: 3,
      finding: "Workflow cost variance reduced to 3.2% average",
      impact: "Budget accuracy improved",
      timestamp: "2024-01-25 16:45",
      type: "improvement",
    },
  ]

  const mockKeyWorkflows = [
    {
      name: "Client Intake Processing",
      monthlyCost: 3750,
      efficiency: 94,
      frequency: "Daily",
      status: "optimized",
    },
    {
      name: "Strategic Planning Review",
      monthlyCost: 1800,
      efficiency: 87,
      frequency: "Weekly",
      status: "monitoring",
    },
    {
      name: "Compliance Audit Scan",
      monthlyCost: 8400,
      efficiency: 91,
      frequency: "Daily",
      status: "optimized",
    },
    {
      name: "Security Threat Analysis",
      monthlyCost: 9600,
      efficiency: 89,
      frequency: "Continuous",
      status: "review",
    },
  ]

  const mockFinOpsScope = [
    {
      area: "Cost Monitoring",
      description: "Real-time tracking of all platform operational costs",
      status: "active",
      coverage: "100%",
    },
    {
      area: "Agent Lease Analysis",
      description: "Optimization of internal and third-party agent costs",
      status: "active",
      coverage: "8 agents",
    },
    {
      area: "Budget Integrity",
      description: "Variance analysis and forecast accuracy maintenance",
      status: "active",
      coverage: "95%",
    },
    {
      area: "Workflow Economics",
      description: "Cost-per-execution analysis for organizational workflows",
      status: "active",
      coverage: "24 workflows",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      <AgentProfileHeader
        name="Janet"
        role="Financial Operations Agent"
        avatarSrc="/janet-avatar.png"
        fallbackInitials="J"
        description="Janet oversees the financial operations of the platform. She is responsible for cost monitoring, agent lease analysis, and budget integrity via the FinOps Dashboard."
        statusBadges={["Active", "Internal Only", "FinOps"]}
        avatarClassName="ring-yellow-400/50"
        nameClassName="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"
      />

      {/* FinOps Operations Center */}
      <Card className="bg-yellow-500/10 border border-yellow-500/30 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-400">
            <DollarSign className="h-5 w-5" />
            <span>FinOps Operations Center</span>
          </CardTitle>
          <CardDescription className="text-yellow-300">
            Janet manages all financial operations and cost optimization through her dedicated dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-900/60 p-4 rounded-lg">
            <p className="text-yellow-300 mb-4">
              Janet oversees the financial operations of the platform. She is responsible for cost monitoring, agent
              lease analysis, and budget integrity via the FinOps Dashboard. All operational cost insights, token usage
              trends, and third-party lease metrics are monitored and maintained through her dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-yellow-300">Dashboard Capabilities</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Cost Overview & Trend Analysis</li>
                  <li>• Agent Lease Breakdown & Optimization</li>
                  <li>• Workflow Cost Estimation</li>
                  <li>• Third-Party Spend Management</li>
                  <li>• Budget Variance Tracking</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-yellow-300">Current Status</h4>
                <div className="text-sm text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Platform Coverage:</span>
                    <span className="text-white font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Agents Monitored:</span>
                    <span className="text-yellow-400 font-medium">8 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget Accuracy:</span>
                    <span className="text-green-400 font-medium">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost Optimization:</span>
                    <span className="text-green-400 font-medium">+12%</span>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/admin/finops">
              <Button className="w-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/30">
                <DollarSign className="h-4 w-4 mr-2" />
                Access FinOps Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* FinOps Scope */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <PieChart className="h-5 w-5" />
            <span>FinOps Scope</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Janet's areas of financial responsibility and operational coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockFinOpsScope.map((scope, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 border border-slate-700 rounded-lg bg-slate-800/50"
              >
                <div className="flex-shrink-0">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Calculator className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-slate-100">{scope.area}</h4>
                    <Badge
                      variant={scope.status === "active" ? "default" : "secondary"}
                      className="bg-green-500/20 text-green-300 text-xs"
                    >
                      {scope.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{scope.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Coverage:</span>
                    <span className="text-xs text-yellow-400 font-medium">{scope.coverage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last 3 Cost Findings */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <TrendingUp className="h-5 w-5" />
            <span>Recent Cost Findings</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Latest financial insights and optimization discoveries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCostFindings.map((finding) => (
              <div
                key={finding.id}
                className="flex items-start space-x-3 p-3 border border-slate-700 rounded-lg bg-slate-800/50"
              >
                <div className="flex-shrink-0">
                  {finding.type === "optimization" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {finding.type === "alert" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  {finding.type === "improvement" && <TrendingUp className="h-5 w-5 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100">{finding.finding}</p>
                  <p className="text-sm text-slate-400 mt-1">{finding.impact}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-slate-500">{finding.timestamp}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        finding.type === "optimization"
                          ? "border-green-500/30 text-green-400"
                          : finding.type === "alert"
                            ? "border-amber-500/30 text-amber-400"
                            : "border-blue-500/30 text-blue-400"
                      }`}
                    >
                      {finding.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Workflows */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <BarChart3 className="h-5 w-5" />
            <span>Key Workflows</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            High-impact workflows under Janet's financial monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockKeyWorkflows.map((workflow, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-slate-100 font-medium">{workflow.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {workflow.frequency}
                    </Badge>
                    <Badge
                      variant={
                        workflow.status === "optimized"
                          ? "default"
                          : workflow.status === "monitoring"
                            ? "secondary"
                            : "destructive"
                      }
                      className={`text-xs ${
                        workflow.status === "optimized"
                          ? "bg-green-500/20 text-green-300"
                          : workflow.status === "monitoring"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-400">
                      Monthly Cost: <span className="text-slate-200">${workflow.monthlyCost.toLocaleString()}</span>
                    </span>
                    <span className="text-slate-400">
                      Efficiency: <span className="text-slate-200">{workflow.efficiency}%</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {workflow.efficiency >= 90 && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {workflow.efficiency < 90 && workflow.efficiency >= 85 && (
                    <Activity className="h-4 w-4 text-amber-500" />
                  )}
                  {workflow.efficiency < 85 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Link href="/admin/finops">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800 text-slate-100 hover:bg-slate-700 border-slate-700"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View All in FinOps Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
