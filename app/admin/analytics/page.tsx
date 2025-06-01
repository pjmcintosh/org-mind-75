"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Clock, DollarSign, Activity, Download, RefreshCw } from "lucide-react"
import { useRole } from "@/lib/context/role-context"
import { redirect } from "next/navigation"

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalProjects: 156,
    activeUsers: 89,
    avgResponseTime: 1.2,
    costSavings: 45000,
  },
  agentPerformance: [
    { name: "Ada", tasks: 45, successRate: 98, avgTime: 1.1 },
    { name: "Bob", tasks: 38, successRate: 95, avgTime: 1.4 },
    { name: "Eve", tasks: 42, successRate: 97, avgTime: 0.9 },
    { name: "Max", tasks: 35, successRate: 94, avgTime: 1.6 },
    { name: "Janet", tasks: 29, successRate: 96, avgTime: 1.3 },
  ],
  userActivity: [
    { date: "2024-01-08", logins: 45, projects: 12 },
    { date: "2024-01-09", logins: 52, projects: 15 },
    { date: "2024-01-10", logins: 48, projects: 11 },
    { date: "2024-01-11", logins: 61, projects: 18 },
    { date: "2024-01-12", logins: 55, projects: 14 },
    { date: "2024-01-13", logins: 49, projects: 13 },
    { date: "2024-01-14", logins: 58, projects: 16 },
  ],
  costAnalysis: {
    totalCost: 12500,
    costPerProject: 80,
    savings: 45000,
    efficiency: 78,
  },
}

export default function AnalyticsPage() {
  const { currentRole } = useRole()
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  // Check authorization
  if (!["admin", "ceo", "analyst"].includes(currentRole.toLowerCase())) {
    redirect("/unauthorized")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400 mt-2">Performance insights and business intelligence</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{mockAnalytics.overview.totalProjects}</p>
                  <p className="text-green-400 text-sm">+12% from last week</p>
                </div>
                <BarChart3 className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">{mockAnalytics.overview.activeUsers}</p>
                  <p className="text-green-400 text-sm">+8% from last week</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Avg Response Time</p>
                  <p className="text-2xl font-bold text-white">{mockAnalytics.overview.avgResponseTime}s</p>
                  <p className="text-green-400 text-sm">-5% from last week</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Cost Savings</p>
                  <p className="text-2xl font-bold text-white">
                    ${mockAnalytics.overview.costSavings.toLocaleString()}
                  </p>
                  <p className="text-green-400 text-sm">+15% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">
              Agent Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700">
              User Activity
            </TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-slate-700">
              Cost Analysis
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Performance Chart */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Agent Task Completion</CardTitle>
                  <CardDescription className="text-slate-400">Tasks completed by each agent this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.agentPerformance.map((agent) => (
                      <div key={agent.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{agent.name}</span>
                          <span className="text-slate-400">{agent.tasks} tasks</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-cyan-400 h-2 rounded-full"
                            style={{ width: `${(agent.tasks / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Success Rates */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Success Rates</CardTitle>
                  <CardDescription className="text-slate-400">
                    Agent task success rates and average response times
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.agentPerformance.map((agent) => (
                      <div key={agent.name} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{agent.name}</p>
                          <p className="text-slate-400 text-sm">{agent.avgTime}s avg time</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">{agent.successRate}%</p>
                          <p className="text-slate-400 text-sm">success rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Activity Trends</CardTitle>
                <CardDescription className="text-slate-400">Daily user logins and project submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.userActivity.map((day) => (
                    <div key={day.date} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{new Date(day.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-6">
                        <div className="text-center">
                          <p className="text-blue-400 font-bold">{day.logins}</p>
                          <p className="text-slate-400 text-sm">logins</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-400 font-bold">{day.projects}</p>
                          <p className="text-slate-400 text-sm">projects</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Cost Breakdown</CardTitle>
                  <CardDescription className="text-slate-400">Monthly operational costs and savings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-white">Total Monthly Cost</span>
                    <span className="text-red-400 font-bold">
                      ${mockAnalytics.costAnalysis.totalCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-white">Cost per Project</span>
                    <span className="text-yellow-400 font-bold">${mockAnalytics.costAnalysis.costPerProject}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-white">Total Savings</span>
                    <span className="text-green-400 font-bold">
                      ${mockAnalytics.costAnalysis.savings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                    <span className="text-white">Efficiency Score</span>
                    <span className="text-cyan-400 font-bold">{mockAnalytics.costAnalysis.efficiency}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">ROI Analysis</CardTitle>
                  <CardDescription className="text-slate-400">Return on investment metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-4xl font-bold text-green-400">360%</p>
                      <p className="text-slate-400">ROI This Quarter</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-white">$57.5K</p>
                        <p className="text-slate-400 text-sm">Revenue Generated</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">$12.5K</p>
                        <p className="text-slate-400 text-sm">Investment</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
                <CardDescription className="text-slate-400">Key performance indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">+23%</p>
                    <p className="text-slate-400">Project Completion Rate</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <Activity className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">-15%</p>
                    <p className="text-slate-400">Average Response Time</p>
                  </div>
                  <div className="text-center p-4 bg-slate-700 rounded-lg">
                    <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">+31%</p>
                    <p className="text-slate-400">User Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
