"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, TrendingUp, Users, Info, CheckCircle, Calculator, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HoursCapturedPanel() {
  console.log("Loaded: HoursCapturedPanel")

  // Mock hourly rates by role
  const hourlyRates = {
    Analyst: 85,
    Engineer: 110,
    Planner: 95,
    Executive: 150,
    Legal: 175,
    Security: 120,
    Compliance: 130,
  }

  // Mock hours captured data by agent
  const hoursData = [
    {
      agent: "Ephrya",
      role: "Executive",
      hoursThisMonth: 45.5,
      workflows: [
        { name: "Strategic Planning Review", hoursSaved: 18.0, frequency: "Weekly" },
        { name: "Executive Decision Support", hoursSaved: 15.5, frequency: "Daily" },
        { name: "Cross-Department Coordination", hoursSaved: 12.0, frequency: "Daily" },
      ],
    },
    {
      agent: "Ada",
      role: "Analyst",
      hoursThisMonth: 38.2,
      workflows: [
        { name: "Data Analysis & Reporting", hoursSaved: 22.0, frequency: "Daily" },
        { name: "Market Research Compilation", hoursSaved: 10.2, frequency: "Weekly" },
        { name: "Performance Metrics Review", hoursSaved: 6.0, frequency: "Weekly" },
      ],
    },
    {
      agent: "Bob",
      role: "Engineer",
      hoursThisMonth: 42.8,
      workflows: [
        { name: "Code Review & Analysis", hoursSaved: 25.0, frequency: "Daily" },
        { name: "Technical Documentation", hoursSaved: 12.8, frequency: "Weekly" },
        { name: "System Architecture Planning", hoursSaved: 5.0, frequency: "Monthly" },
      ],
    },
    {
      agent: "Max",
      role: "Planner",
      hoursThisMonth: 35.6,
      workflows: [
        { name: "Project Planning & Scheduling", hoursSaved: 20.0, frequency: "Weekly" },
        { name: "Resource Allocation Analysis", hoursSaved: 10.6, frequency: "Weekly" },
        { name: "Timeline Optimization", hoursSaved: 5.0, frequency: "Monthly" },
      ],
    },
    {
      agent: "Lexi",
      role: "Compliance",
      hoursThisMonth: 28.4,
      workflows: [
        { name: "Compliance Audit Preparation", hoursSaved: 15.0, frequency: "Weekly" },
        { name: "Regulatory Review Process", hoursSaved: 8.4, frequency: "Weekly" },
        { name: "Policy Documentation", hoursSaved: 5.0, frequency: "Monthly" },
      ],
    },
    {
      agent: "Erik",
      role: "Security",
      hoursThisMonth: 31.2,
      workflows: [
        { name: "Security Threat Analysis", hoursSaved: 18.0, frequency: "Daily" },
        { name: "Vulnerability Assessment", hoursSaved: 8.2, frequency: "Weekly" },
        { name: "Security Policy Review", hoursSaved: 5.0, frequency: "Monthly" },
      ],
    },
    {
      agent: "OpenAI Legal",
      role: "Legal",
      hoursThisMonth: 22.8,
      workflows: [
        { name: "Contract Review & Analysis", hoursSaved: 12.0, frequency: "Weekly" },
        { name: "Legal Research & Documentation", hoursSaved: 7.8, frequency: "Weekly" },
        { name: "Compliance Legal Review", hoursSaved: 3.0, frequency: "Monthly" },
      ],
    },
    {
      agent: "Eve",
      role: "Analyst",
      hoursThisMonth: 26.5,
      workflows: [
        { name: "Performance Monitoring", hoursSaved: 15.0, frequency: "Daily" },
        { name: "Optimization Recommendations", hoursSaved: 8.5, frequency: "Weekly" },
        { name: "System Health Analysis", hoursSaved: 3.0, frequency: "Monthly" },
      ],
    },
  ]

  // Calculate totals
  const totalHours = hoursData.reduce((sum, agent) => sum + agent.hoursThisMonth, 0)
  const totalCostSavings = hoursData.reduce(
    (sum, agent) => sum + agent.hoursThisMonth * hourlyRates[agent.role as keyof typeof hourlyRates],
    0,
  )

  // Top contributors
  const topContributors = [...hoursData].sort((a, b) => b.hoursThisMonth - a.hoursThisMonth).slice(0, 3)

  // Most efficient (highest cost savings)
  const mostEfficient = [...hoursData]
    .sort(
      (a, b) =>
        b.hoursThisMonth * hourlyRates[b.role as keyof typeof hourlyRates] -
        a.hoursThisMonth * hourlyRates[a.role as keyof typeof hourlyRates],
    )
    .slice(0, 3)

  return (
    <Card className="bg-slate-800/50 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-cyan-400">
          <Clock className="h-5 w-5" />
          <span>Hours Captured Summary</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-blue-400 hover:text-blue-300" />
              </TooltipTrigger>
              <TooltipContent className="max-w-md p-4 bg-slate-900 border border-cyan-500/20">
                <div className="space-y-2">
                  <p className="font-medium text-cyan-300">Hours Captured Calculation</p>
                  <p className="text-sm text-slate-300">
                    Hours Captured is a calculated metric estimating how much manual labor has been offset by agent
                    automation. It uses average hourly rates for roles and common-sense estimates of time saved per
                    task.
                  </p>
                  <div className="mt-3 p-2 bg-slate-800 rounded text-xs font-mono">
                    <div className="text-cyan-400">Hours Captured = ∑ (Manual Time Estimate - AI Execution Time)</div>
                    <div className="text-green-400">Cost Savings = Hours Captured × Avg Hourly Rate</div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription className="text-blue-300">
          Time and labor cost savings through agent automation vs. traditional manual effort
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-cyan-500" />
              <span className="text-slate-300 font-medium">Total Hours Captured</span>
            </div>
            <div className="text-3xl font-bold text-white">{totalHours.toFixed(1)}</div>
            <div className="text-sm text-cyan-400">This month</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="text-slate-300 font-medium">Cost Savings</span>
            </div>
            <div className="text-3xl font-bold text-green-400">${totalCostSavings.toLocaleString()}</div>
            <div className="text-sm text-green-400">Estimated labor cost offset</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="h-5 w-5 text-amber-500" />
              <span className="text-slate-300 font-medium">Avg Rate</span>
            </div>
            <div className="text-3xl font-bold text-white">${Math.round(totalCostSavings / totalHours)}</div>
            <div className="text-sm text-amber-400">Per hour captured</div>
          </div>
        </div>

        {/* Hourly Rates Reference */}
        <div className="bg-slate-900/40 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Average Hourly Rates by Role</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(hourlyRates).map(([role, rate]) => (
              <div key={role} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{role}</span>
                <span className="text-slate-200 font-medium">${rate}/hr</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Breakdown Table */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-slate-300 flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Hours Captured by Agent</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Agent</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Role</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Hours Captured</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Cost Savings</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Top Workflow</th>
                </tr>
              </thead>
              <tbody>
                {hoursData.map((agent, index) => {
                  const costSavings = agent.hoursThisMonth * hourlyRates[agent.role as keyof typeof hourlyRates]
                  const topWorkflow = agent.workflows.reduce((max, workflow) =>
                    workflow.hoursSaved > max.hoursSaved ? workflow : max,
                  )
                  return (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-3 px-4">
                        <span className="text-slate-200 font-medium">{agent.agent}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {agent.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-200 font-medium">
                        {agent.hoursThisMonth.toFixed(1)}h
                      </td>
                      <td className="py-3 px-4 text-right text-green-400 font-medium">
                        ${costSavings.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-300 text-sm">{topWorkflow.name}</div>
                        <div className="text-slate-500 text-xs">{topWorkflow.hoursSaved.toFixed(1)}h saved</div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Contributors and Most Efficient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Top Contributors (Hours)</span>
            </h4>
            <div className="space-y-2">
              {topContributors.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center text-xs text-cyan-400 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-slate-200 font-medium">{agent.agent}</div>
                      <div className="text-slate-400 text-xs">{agent.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-200 font-medium">{agent.hoursThisMonth.toFixed(1)}h</div>
                    <div className="text-slate-400 text-xs">captured</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-300 flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Most Efficient (Cost Savings)</span>
            </h4>
            <div className="space-y-2">
              {mostEfficient.map((agent, index) => {
                const costSavings = agent.hoursThisMonth * hourlyRates[agent.role as keyof typeof hourlyRates]
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-900/40 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-slate-200 font-medium">{agent.agent}</div>
                        <div className="text-slate-400 text-xs">{agent.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">${costSavings.toLocaleString()}</div>
                      <div className="text-slate-400 text-xs">saved</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Total Savings Summary */}
        <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">Total Monthly Labor Cost Savings</h3>
                <p className="text-slate-300 text-sm">Through agent automation vs. traditional manual processes</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-400">${totalCostSavings.toLocaleString()}</div>
              <div className="text-slate-300 text-sm">{totalHours.toFixed(1)} hours captured</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
