"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, UserPlus, Building2, Calendar, MessageSquare } from "lucide-react"
import { useUserRole } from "@/hooks/use-user-role"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"

export default function ShandryAgentProfilePage() {
  console.log("Loaded: ShandryProfilePage with standardized header")

  const { role } = useUserRole()
  const canEdit = role === "admin"

  const mockHRDocuments = [
    {
      id: 1,
      title: "Employee Handbook Update",
      type: "Policy",
      status: "Draft",
      lastModified: "2024-01-26 14:30",
      priority: "medium",
    },
    {
      id: 2,
      title: "Q1 Performance Review Template",
      type: "Template",
      status: "Approved",
      lastModified: "2024-01-26 11:15",
      priority: "high",
    },
    {
      id: 3,
      title: "Remote Work Guidelines",
      type: "Policy",
      status: "Under Review",
      lastModified: "2024-01-25 16:45",
      priority: "low",
    },
  ]

  const onboardingActivities = [
    {
      id: 1,
      activity: "New hire orientation for Engineering team",
      candidate: "Sarah Chen",
      stage: "Documentation Review",
      timestamp: "2024-01-26 13:00",
    },
    {
      id: 2,
      activity: "Benefits enrollment session",
      candidate: "Marcus Rodriguez",
      stage: "Completed",
      timestamp: "2024-01-26 10:30",
    },
    {
      id: 3,
      activity: "Department introduction meeting",
      candidate: "Lisa Park",
      stage: "Scheduled",
      timestamp: "2024-01-27 09:00",
    },
  ]

  const collaborationInsights = [
    {
      agent: "Jason",
      type: "Legal Compliance",
      message: "Reviewed employment contract templates",
      timestamp: "2024-01-26 15:45",
    },
    {
      agent: "Janet",
      type: "Finance Coordination",
      message: "Aligned on salary band adjustments",
      timestamp: "2024-01-26 12:20",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      {/* Header Panel */}
      <AgentProfileHeader
        name="Shandry"
        role="HR Advisor"
        avatarSrc="/shandry-avatar.png"
        fallbackInitials="S"
        description="Specializing in employee relations, talent acquisition, and organizational development. Ensuring smooth onboarding processes and maintaining positive workplace culture."
        statusBadges={["Active", "Internal Only", "HR Department"]}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent HR Documents */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyan-400">
              <FileText className="h-5 w-5" />
              <span>Recent HR Documents</span>
            </CardTitle>
            <p className="text-blue-300">Latest policy updates and templates</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHRDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start space-x-3 p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                >
                  <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium">{doc.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-slate-400">{doc.type}</span>
                      <Badge
                        variant={
                          doc.status === "Approved" ? "default" : doc.status === "Draft" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{doc.lastModified}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Activity */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyan-400">
              <UserPlus className="h-5 w-5" />
              <span>Onboarding Activity</span>
            </CardTitle>
            <p className="text-blue-300">Current new hire processes</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onboardingActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                >
                  <div className="flex-shrink-0">
                    <Calendar className="h-5 w-5 text-pink-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium">{activity.activity}</h4>
                    <p className="text-cyan-300 text-sm">{activity.candidate}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={
                          activity.stage === "Completed"
                            ? "default"
                            : activity.stage === "Scheduled"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {activity.stage}
                      </Badge>
                      <span className="text-xs text-slate-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Collaboration with Jason & Janet */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyan-400">
              <MessageSquare className="h-5 w-5" />
              <span>Collaboration with Jason & Janet</span>
            </CardTitle>
            <p className="text-blue-300">Cross-departmental coordination and insights</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collaborationInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 border border-slate-700 rounded-lg bg-slate-800/30"
                >
                  <div className="flex-shrink-0">
                    <Building2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-medium">{insight.agent}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm">{insight.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{insight.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-cyan-400">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-white hover:bg-slate-600/50 border-slate-600"
                disabled={!canEdit}
              >
                Review Applications
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-white hover:bg-slate-600/50 border-slate-600"
                disabled={!canEdit}
              >
                Schedule Interviews
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-white hover:bg-slate-600/50 border-slate-600"
              >
                Team Assessment
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-white hover:bg-slate-600/50 border-slate-600"
              >
                Culture Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700/50 text-white hover:bg-slate-600/50 border-slate-600"
                disabled={!canEdit}
              >
                Update Policies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
