"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Home, Plus, User, Calendar, FileText } from "lucide-react"

interface AgentStatus {
  name: string
  role: string
  status: "completed" | "in-progress" | "pending"
  description: string
}

export default function ClientConfirmationPage() {
  console.log("Loaded: ClientConfirmationPage")
  const [projectId] = useState("PRJ-" + Math.random().toString(36).substring(2, 8).toUpperCase())

  const [agentStatuses] = useState<AgentStatus[]>([
    {
      name: "Bob",
      role: "Requirements Analyst",
      status: "completed",
      description: "Intake completed successfully",
    },
    {
      name: "Ada",
      role: "Project Planner",
      status: "in-progress",
      description: "Creating implementation plan",
    },
    {
      name: "Max",
      role: "Deliverables Manager",
      status: "pending",
      description: "Awaiting plan completion",
    },
  ])

  const getStatusIcon = (status: AgentStatus["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />
      case "pending":
        return <Clock className="h-5 w-5 text-slate-400" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: AgentStatus["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 animate-pulse">In Progress</Badge>
      case "pending":
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-600/20">Pending</Badge>
      default:
        return null
    }
  }

  const getAgentIcon = (name: string) => {
    switch (name) {
      case "Bob":
        return <User className="h-6 w-6 text-blue-600" />
      case "Ada":
        return <Calendar className="h-6 w-6 text-purple-600" />
      case "Max":
        return <FileText className="h-6 w-6 text-green-600" />
      default:
        return <User className="h-6 w-6 text-slate-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10">
      <div className="w-full max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-6 sm:mb-8 px-4">
          <div className="mx-auto mb-4 sm:mb-6 p-3 sm:p-4 bg-cyan-500/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border border-cyan-500/30 shadow-cyan-500/20 shadow-lg">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-cyan-400" />
          </div>
          <h1 className="text-cyan-400 text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
            Your project has been submitted!
          </h1>
          <p className="text-blue-300 text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            Thank you. Our agent team (Bob, Ada, and Max) will begin processing it shortly.
          </p>
          <Badge className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-3 sm:px-4 py-2">
            Project ID: {projectId}
          </Badge>
        </div>

        {/* Agent Status Timeline */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6 mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-xl font-semibold text-center">Processing Status</CardTitle>
            <CardDescription className="text-blue-300 text-center">
              Track your project as it moves through our AI agent workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200"></div>

                {/* Agent cards */}
                <div className="space-y-6">
                  {agentStatuses.map((agent, index) => (
                    <div key={agent.name} className="relative flex items-start gap-4">
                      {/* Timeline dot */}
                      <div
                        className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                          agent.status === "completed"
                            ? "bg-green-100 border-green-200"
                            : agent.status === "in-progress"
                              ? "bg-blue-100 border-blue-200"
                              : "bg-slate-100 border-slate-200"
                        }`}
                      >
                        {getAgentIcon(agent.name)}
                      </div>

                      {/* Agent info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                            <p className="text-sm text-blue-300">{agent.role}</p>
                          </div>
                          {getStatusBadge(agent.status)}
                        </div>
                        <p className="text-sm text-white">{agent.description}</p>

                        {/* Progress indicator for in-progress */}
                        {agent.status === "in-progress" && (
                          <div className="mt-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-slate-600">Processing...</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div className="bg-blue-600 h-1.5 rounded-full w-1/3 animate-pulse"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6 mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="text-cyan-400 text-xl font-semibold">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 sm:p-4">
                <div className="mx-auto mb-3 p-3 bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-white mb-2">Ada Creates Plan</h4>
                <p className="text-sm text-blue-300">
                  Ada will analyze your requirements and create a detailed implementation plan
                </p>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto mb-3 p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-white mb-2">Max Generates Deliverables</h4>
                <p className="text-sm text-blue-300">
                  Max will create documentation, reports, and implementation guides
                </p>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto mb-3 p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-white mb-2">Project Complete</h4>
                <p className="text-sm text-blue-300">
                  You'll receive a comprehensive organizational assessment and action plan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white">
              <Home className="h-4 w-4 mr-2" />
              Return to Home
            </Button>
          </Link>

          <Link href="/client/intake">
            <Button
              size="lg"
              className="w-full sm:w-auto border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Another Project
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-xs sm:text-sm text-blue-300">
            Questions about your submission? Contact us at{" "}
            <a href="mailto:support@organizationalmind.com" className="text-cyan-300 hover:text-cyan-400 underline">
              support@organizationalmind.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
