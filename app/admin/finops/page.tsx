"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  PieChart,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Users,
  Activity,
  BarChart3,
  Download,
} from "lucide-react"
import Link from "next/link"
import HoursCapturedPanel from "@/components/admin/finops/HoursCapturedPanel"
import { useRole } from "@/lib/context/role-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { humanLabels } from "@/lib/humanLabels"

export default function FinOpsDashboard() {
  console.log("Loaded: FinOpsDashboard")

  const mockCostOverview = {
    totalMonthly: 24750,
    totalAnnual: 297000,
    monthlyChange: 8.5,
    breakdown: {
      agentTokens: 18500,
      thirdPartyLeases: 4200,
      infrastructure: 1800,
      storage: 250,
    },
  }

  const mockAgentLeases = [
    {
      agent: "Ephrya",
      type: "Internal",
      monthlyCost: 6500,
      tokenUsage: 2500000,
      efficiency: 92,
      trend: "stable",
    },
    {
      agent: "Lexi",
      type: "AWS Lease",
      monthlyCost: 2800,
      tokenUsage: 850000,
      efficiency: 88,
      trend: "up",
      provider: "AWS",
    },
    {
      agent: "OpenAI Legal",
      type: "Third-Party",
      monthlyCost: 1400,
      tokenUsage: 425000,
      efficiency: 85,
      trend: "down",
      provider: "OpenAI",
    },
    {
      agent: "Max",
      type: "Internal",
      monthlyCost: 4200,
      tokenUsage: 1750000,
      efficiency: 94,
      trend: "stable",
    },
    {
      agent: "Ada",
      type: "Internal",
      monthlyCost: 3800,
      tokenUsage: 1250000,
      efficiency: 91,
      trend: "up",
    },
    {
      agent: "Bob",
      type: "Internal",
      monthlyCost: 2100,
      tokenUsage: 650000,
      efficiency: 89,
      trend: "stable",
    },
    {
      agent: "Eve",
      type: "Internal",
      monthlyCost: 1950,
      tokenUsage: 450000,
      efficiency: 96,
      trend: "down",
    },
    {
      agent: "Erik",
      type: "Internal",
      monthlyCost: 1500,
      tokenUsage: 325000,
      efficiency: 93,
      trend: "stable",
    },
  ]

  const mockWorkflowCosts = [
    {
      workflow: "Client Intake Processing",
      estimatedCost: 125,
      actualCost: 118,
      variance: -5.6,
      frequency: "Daily",
    },
    {
      workflow: "Strategic Planning Review",
      estimatedCost: 450,
      actualCost: 478,
      variance: 6.2,
      frequency: "Weekly",
    },
    {
      workflow: "Compliance Audit Scan",
      estimatedCost: 280,
      actualCost: 265,
      variance: -5.4,
      frequency: "Daily",
    },
    {
      workflow: "Security Threat Analysis",
      estimatedCost: 320,
      actualCost: 342,
      variance: 6.9,
      frequency: "Continuous",
    },
  ]

  const mockSpendTrends = [
    { month: "Jul", total: 22500, agents: 17200, leases: 3800, infrastructure: 1500 },
    { month: "Aug", total: 23200, agents: 17800, leases: 3900, infrastructure: 1500 },
    { month: "Sep", total: 23800, agents: 18200, leases: 4100, infrastructure: 1500 },
    { month: "Oct", total: 24100, agents: 18400, leases: 4200, infrastructure: 1500 },
    { month: "Nov", total: 24750, agents: 18500, leases: 4200, infrastructure: 2050 },
  ]

  const { currentRole } = useRole()
  const normalizedRole = currentRole.toLowerCase()

  // RBAC Logic for Janet-controlled FinOps
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isJanetOwner = false // Janet is an agent, not a user role
  const isCEO = normalizedRole === "ceo"
  const canExecuteFinOpsActions = !isReadOnlyAdmin && isCEO

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              {humanLabels?.navigation?.finOpsDashboard || "FinOps Dashboard"}
            </h1>
            <p className="text-blue-300 text-lg">
              {humanLabels?.descriptions?.finopsDashboard || "Financial operations and cost management"}
            </p>
          </div>
        </div>

        {/* Janet Ownership Banner */}
        <Card className="bg-green-500/10 border border-green-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-green-300 font-medium">
                    {humanLabels?.onboarding?.janet ||
                      "This space helps Janet keep tabs on how we're using our resources wisely."}
                  </p>
                </div>
              </div>
              <Link href="/admin/agents/janet">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Visit Janet
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Overview Panel */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <PieChart className="h-5 w-5" />
            <span>Cost Overview</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Monthly and annual cost breakdown with trend analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Monthly Total</span>
                <span className="text-2xl font-bold text-white">${mockCostOverview.totalMonthly.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-400">+{mockCostOverview.monthlyChange}% vs last month</span>
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Annual Projection</span>
                <span className="text-2xl font-bold text-white">${mockCostOverview.totalAnnual.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-blue-400">Based on current trends</span>
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Agent Tokens</span>
                <span className="text-2xl font-bold text-white">
                  ${mockCostOverview.breakdown.agentTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-cyan-500" />
                <span className="text-sm text-cyan-400">
                  {Math.round((mockCostOverview.breakdown.agentTokens / mockCostOverview.totalMonthly) * 100)}% of total
                </span>
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Third-Party Leases</span>
                <span className="text-2xl font-bold text-white">
                  ${mockCostOverview.breakdown.thirdPartyLeases.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-amber-400">
                  {Math.round((mockCostOverview.breakdown.thirdPartyLeases / mockCostOverview.totalMonthly) * 100)}% of
                  total
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300">Cost Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Agent Tokens</span>
                <span className="text-sm text-slate-300">
                  ${mockCostOverview.breakdown.agentTokens.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(mockCostOverview.breakdown.agentTokens / mockCostOverview.totalMonthly) * 100}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-cyan-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Third-Party Leases</span>
                <span className="text-sm text-slate-300">
                  ${mockCostOverview.breakdown.thirdPartyLeases.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(mockCostOverview.breakdown.thirdPartyLeases / mockCostOverview.totalMonthly) * 100}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-amber-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Infrastructure</span>
                <span className="text-sm text-slate-300">
                  ${mockCostOverview.breakdown.infrastructure.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(mockCostOverview.breakdown.infrastructure / mockCostOverview.totalMonthly) * 100}
                className="h-2 bg-slate-700"
                indicatorClassName="bg-green-500"
              />
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                    disabled={!canExecuteFinOpsActions}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {humanLabels?.actions?.exportReport || "Export Financial Report"}
                  </Button>
                </div>
              </TooltipTrigger>
              {!canExecuteFinOpsActions && (
                <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                  <p className="text-cyan-300">Only Janet (FinOps Agent) or the CEO may perform this action.</p>
                  <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Agent Lease Breakdown */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <Users className="h-5 w-5" />
            <span>Agent Lease Breakdown</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Individual agent costs, token usage, and efficiency metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Agent</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Monthly Cost</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Token Usage</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Efficiency</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {mockAgentLeases.map((agent, index) => (
                  <tr key={index} className="border-b border-slate-700/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-200 font-medium">{agent.agent}</span>
                        {agent.provider && (
                          <Badge variant="outline" className="text-xs">
                            {agent.provider}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={agent.type === "Internal" ? "default" : "secondary"}
                        className={
                          agent.type === "Internal" ? "bg-blue-500/20 text-blue-300" : "bg-amber-500/20 text-amber-300"
                        }
                      >
                        {agent.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-200 font-medium">
                      ${agent.monthlyCost.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-200">{agent.tokenUsage.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <span className="text-slate-200">{agent.efficiency}%</span>
                        {agent.efficiency >= 90 && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {agent.efficiency < 90 && agent.efficiency >= 85 && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {agent.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500 inline" />}
                      {agent.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500 inline" />}
                      {agent.trend === "stable" && <TrendingUp className="h-4 w-4 text-blue-500 inline rotate-90" />}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-600">
                  <td className="py-3 px-4 font-medium text-slate-200" colSpan={2}>
                    Total
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-200">
                    ${mockAgentLeases.reduce((sum, agent) => sum + agent.monthlyCost, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-200">
                    {mockAgentLeases.reduce((sum, agent) => sum + agent.tokenUsage, 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-slate-200">
                    {Math.round(
                      mockAgentLeases.reduce((sum, agent) => sum + agent.efficiency, 0) / mockAgentLeases.length,
                    )}
                    %
                  </td>
                  <td className="py-3 px-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Cost Estimator */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <Calculator className="h-5 w-5" />
            <span>Workflow Cost Estimator</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Estimated vs actual costs for key organizational workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWorkflowCosts.map((workflow, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-slate-100 font-medium">{workflow.workflow}</h4>
                    <Badge variant="outline" className="text-xs">
                      {workflow.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-400">
                      Estimated: <span className="text-slate-200">${workflow.estimatedCost}</span>
                    </span>
                    <span className="text-slate-400">
                      Actual: <span className="text-slate-200">${workflow.actualCost}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${workflow.variance < 0 ? "text-green-400" : "text-red-400"}`}>
                    {workflow.variance > 0 ? "+" : ""}
                    {workflow.variance.toFixed(1)}%
                  </span>
                  {workflow.variance < 0 ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spend Trends Chart */}
      <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <BarChart3 className="h-5 w-5" />
            <span>Spend Trends Chart</span>
          </CardTitle>
          <CardDescription className="text-blue-300">
            Monthly spending trends across all cost categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Agent Costs</span>
                </div>
                <span className="text-lg font-bold text-white">$18,500</span>
                <div className="text-xs text-green-400">+1.6% vs last month</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Third-Party Leases</span>
                </div>
                <span className="text-lg font-bold text-white">$4,200</span>
                <div className="text-xs text-blue-400">Stable</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Infrastructure</span>
                </div>
                <span className="text-lg font-bold text-white">$2,050</span>
                <div className="text-xs text-amber-400">+36.7% vs last month</div>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Total Monthly</span>
                </div>
                <span className="text-lg font-bold text-white">$24,750</span>
                <div className="text-xs text-green-400">+2.7% vs last month</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-300">5-Month Trend Analysis</h4>
              <div className="space-y-3">
                {mockSpendTrends.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-300">{month.month}</span>
                      <span className="text-sm text-slate-300">${month.total.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-1 h-2">
                      <div
                        className="bg-cyan-500 rounded-sm"
                        style={{ width: `${(month.agents / month.total) * 100}%` }}
                      ></div>
                      <div
                        className="bg-amber-500 rounded-sm"
                        style={{ width: `${(month.leases / month.total) * 100}%` }}
                      ></div>
                      <div
                        className="bg-green-500 rounded-sm"
                        style={{ width: `${(month.infrastructure / month.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours Captured Panel */}
      <HoursCapturedPanel />
    </div>
  )
}
