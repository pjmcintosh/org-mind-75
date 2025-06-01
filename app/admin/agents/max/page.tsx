"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Code2, MessageSquareCode, Clock, Zap, CheckCircle, FileText, TrendingUp } from "lucide-react"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"

export default function MaxAgentProfilePage() {
  console.log("Loaded: MaxProfilePage with standardized header")

  const mockInsights = [
    {
      id: 1,
      type: "optimization",
      message: "Optimized prompt efficiency for client intake process - 40% improvement",
      timestamp: "2024-01-26 15:20",
      priority: "high",
    },
    {
      id: 2,
      type: "prototype",
      message: "Created new v0.dev prototype for dashboard enhancement",
      timestamp: "2024-01-26 12:45",
      priority: "medium",
    },
    {
      id: 3,
      type: "implementation",
      message: "Deployed AI optimization for agent response times",
      timestamp: "2024-01-26 10:30",
      priority: "low",
    },
  ]

  const responsibilities = [
    "AI prompt generation and optimization",
    "Prototype development with v0.dev",
    "Technical implementation support",
    "AI system performance tuning",
    "Creative problem-solving solutions",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10">
      {/* Top Panel - Agent Identity */}
      <AgentProfileHeader
        name="Max"
        role="Prompt Engineer"
        avatarSrc="/max-avatar.png"
        fallbackInitials="M"
        description="Responsible for AI prompt generation, optimization, and system integrity. Develops prototypes that enhance system performance and user experience."
        statusBadges={["Active", "Internal Only", "Engineering"]}
      />

      {/* Core Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm">
          <div className="flex items-center space-x-2 text-cyan-400 mb-2">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">Current Tasks</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">4</div>
          <div className="text-blue-300">Active prompt engineering tasks</div>
        </Card>
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm">
          <div className="flex items-center space-x-2 text-cyan-400 mb-2">
            <CheckCircle className="h-5 w-5" />
            <h3 className="font-semibold">Successful Builds</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12</div>
          <div className="text-blue-300">Completed prompt optimizations</div>
        </Card>
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm">
          <div className="flex items-center space-x-2 text-cyan-400 mb-2">
            <Code2 className="h-5 w-5" />
            <h3 className="font-semibold">Failed Builds</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1</div>
          <div className="text-blue-300">Prompts requiring refinement</div>
        </Card>
      </div>

      {/* Agent Summary */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm mb-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <Zap className="h-5 w-5" />
            <span>Agent Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-0 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-cyan-400">Assigned Responsibilities</h4>
              <ul className="space-y-1 text-sm">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-white">Last Activity: 2024-01-26 15:20</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-white">Department: Engineering</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-300" />
                <span className="text-sm text-white">Access Level: Development Team</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Performance */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm mb-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center justify-between text-cyan-400">
            <div className="flex items-center space-x-2">
              <MessageSquareCode className="h-5 w-5" />
              <span>Prompt Performance</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              View Details
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                <div className="text-sm text-blue-300 mb-1">Prompt Efficiency</div>
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% this month
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                <div className="text-sm text-blue-300 mb-1">Response Quality</div>
                <div className="text-2xl font-bold text-white">4.8/5</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 this month
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-700/50 border border-cyan-500/20">
                <div className="text-sm text-blue-300 mb-1">Iteration Cycles</div>
                <div className="text-2xl font-bold text-white">1.3</div>
                <div className="text-xs text-green-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -0.5 this month
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Insights */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm mb-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center justify-between text-cyan-400">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Recent Insights & Activities</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2">
          <div className="space-y-4">
            {mockInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start space-x-3 p-3 border border-cyan-500/20 rounded-lg bg-slate-700/50"
              >
                <div className="flex-shrink-0">
                  {insight.type === "optimization" && <Zap className="h-5 w-5 text-cyan-400" />}
                  {insight.type === "prototype" && <Code2 className="h-5 w-5 text-blue-400" />}
                  {insight.type === "implementation" && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{insight.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-blue-300">{insight.timestamp}</span>
                    <Badge
                      variant="outline"
                      className={
                        insight.priority === "high"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : insight.priority === "medium"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-green-500/20 text-green-300 border-green-500/30"
                      }
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 shadow-cyan-500/10 shadow-sm">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Prompt
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              <Code2 className="h-4 w-4 mr-2" />
              Create Prototype
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              <Zap className="h-4 w-4 mr-2" />
              Optimize Performance
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-700/50 text-cyan-300 hover:bg-slate-600 border-cyan-500/30"
            >
              <FileText className="h-4 w-4 mr-2" />
              Technical Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
