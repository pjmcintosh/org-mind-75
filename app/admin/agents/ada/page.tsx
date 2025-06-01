"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Target, AlertTriangle, CheckCircle, FileText, Users, BarChart3, Calendar, Sparkles } from "lucide-react"
import { useUserRole } from "@/hooks/use-user-role"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"
import { humanLabels } from "@/lib/humanLabels"

export default function AdaAgentProfilePage() {
  console.log("Loaded: AdaProfilePage with standardized header")
  const { role } = useUserRole()
  const isAdmin = role === "admin"

  const mockInsights = [
    {
      id: 1,
      type: "analysis",
      message: "Flagged project PRJ-104 for potential delay - resource allocation concerns",
      timestamp: "2024-01-26 14:30",
      priority: "high",
    },
    {
      id: 2,
      type: "recommendation",
      message: "Recommended strategic pivot for Q2 planning based on market analysis",
      timestamp: "2024-01-26 11:15",
      priority: "medium",
    },
    {
      id: 3,
      type: "completion",
      message: "Completed comprehensive risk assessment for Project Alpha",
      timestamp: "2024-01-26 09:45",
      priority: "low",
    },
  ]

  const projectPlans = [
    {
      id: "PRJ-105",
      title: "Q2 Strategic Initiative",
      status: "In Progress",
      completion: 75,
      deadline: "2024-03-15",
    },
    {
      id: "PRJ-106",
      title: "Resource Optimization Plan",
      status: "Review",
      completion: 90,
      deadline: "2024-02-28",
    },
    {
      id: "PRJ-107",
      title: "Risk Mitigation Framework",
      status: "Planning",
      completion: 25,
      deadline: "2024-04-10",
    },
  ]

  const collaborations = [
    {
      agent: "Bob",
      task: "Technical feasibility analysis for Project Alpha",
      status: "Active",
      lastUpdate: "2 hours ago",
    },
    {
      agent: "Max",
      task: "Deliverable formatting for strategic reports",
      status: "Completed",
      lastUpdate: "1 day ago",
    },
    {
      agent: "Ephrya",
      task: "Decision validation for resource allocation",
      status: "Pending",
      lastUpdate: "3 hours ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      {/* Top Panel - Agent Identity */}
      <AgentProfileHeader
        name="Ada"
        role="Strategic Planner"
        avatarSrc="/ada-avatar.png"
        fallbackInitials="A"
        description={
          humanLabels?.onboarding?.ada ||
          "Ada specializes in strategic project analysis, long-term planning, and risk assessment. She transforms complex business requirements into actionable strategic frameworks."
        }
        statusBadges={[humanLabels?.status?.active || "Active", "Internal Only", "Strategy"]}
      />

      {/* Latest Project Plans */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <FileText className="h-5 w-5" />
            <span>Latest Project Plans</span>
          </CardTitle>
          <p className="text-blue-300">Strategic initiatives and planning documents</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-cyan-400 font-mono text-sm">{plan.id}</span>
                    <h4 className="text-white font-medium">{plan.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge
                      variant={
                        plan.status === "In Progress" ? "default" : plan.status === "Review" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {plan.status}
                    </Badge>
                    <span className="text-slate-400">Due: {plan.deadline}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{plan.completion}%</div>
                  <div className="w-20 h-2 bg-slate-700 rounded-full mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                      style={{ width: `${plan.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task History */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-cyan-400">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Task History & Insights</span>
            </div>
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-cyan-400 hover:bg-slate-600/50 border-cyan-500/30"
              >
                {humanLabels?.actions?.viewDetails || "View All"}
              </Button>
            )}
          </CardTitle>
          <p className="text-blue-300">Recent strategic analysis and recommendations</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInsights.map((insight) => (
              <div
                key={insight.id}
                className="flex items-start space-x-3 p-4 border border-slate-700 rounded-lg bg-slate-800/30"
              >
                <div className="flex-shrink-0">
                  {insight.type === "analysis" && <AlertTriangle className="h-5 w-5 text-orange-400" />}
                  {insight.type === "recommendation" && <Target className="h-5 w-5 text-violet-400" />}
                  {insight.type === "completion" && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium">{insight.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-slate-400 text-sm">{insight.timestamp}</span>
                    <Badge
                      variant={
                        insight.priority === "high"
                          ? "destructive"
                          : insight.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
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

      {/* Collaboration with Bob / Max */}
      <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <Users className="h-5 w-5" />
            <span>{humanLabels?.navigation?.orchestration || "Collaboration with Bob / Max"}</span>
          </CardTitle>
          <p className="text-blue-300">Cross-agent coordination and task handoffs</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collaborations.map((collab, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-slate-700 rounded-lg bg-slate-800/30"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 border border-cyan-400/30">
                    <AvatarImage src={`/${collab.agent.toLowerCase()}-avatar.png`} alt={collab.agent} />
                    <AvatarFallback className="bg-slate-700 text-cyan-400">{collab.agent[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-white font-medium">{collab.agent}</h4>
                    <p className="text-slate-300 text-sm">{collab.task}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      collab.status === "Active" ? "default" : collab.status === "Completed" ? "secondary" : "outline"
                    }
                    className="mb-1"
                  >
                    {collab.status}
                  </Badge>
                  <p className="text-slate-400 text-xs">{collab.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {isAdmin && (
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
            <p className="text-blue-300">Administrative controls and strategic tools</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-cyan-400 hover:bg-slate-600/50 border-cyan-500/30"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {humanLabels?.actions?.generateReport || "Generate Strategic Report"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-violet-400 hover:bg-slate-600/50 border-violet-500/30"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Review Project Plans
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-orange-400 hover:bg-slate-600/50 border-orange-500/30"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Risk Assessment
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-green-400 hover:bg-slate-600/50 border-green-500/30"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Resource Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
