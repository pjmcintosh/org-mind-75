"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GraduationCap, Play, Edit, Plus, Users, Clock, CheckCircle } from "lucide-react"

interface TrainingModule {
  id: string
  name: string
  description: string
  targetRoles: string[]
  duration: string
  status: "not_started" | "in_progress" | "complete"
  completionRate: number
  enrolledUsers: number
  totalUsers: number
  priority: "high" | "medium" | "low"
}

interface TrainingModuleListProps {
  canExecuteActions: boolean
}

export function TrainingModuleList({ canExecuteActions }: TrainingModuleListProps) {
  const [modules] = useState<TrainingModule[]>([
    {
      id: "ai-fundamentals",
      name: "AI Fundamentals for Business",
      description: "Core concepts of AI, machine learning, and their business applications",
      targetRoles: ["All Roles"],
      duration: "4 hours",
      status: "complete",
      completionRate: 89,
      enrolledUsers: 42,
      totalUsers: 47,
      priority: "high",
    },
    {
      id: "prompt-engineering",
      name: "Prompt Engineering Mastery",
      description: "Advanced techniques for effective AI communication and prompt optimization",
      targetRoles: ["Analyst", "Developer", "Manager"],
      duration: "6 hours",
      status: "in_progress",
      completionRate: 67,
      enrolledUsers: 28,
      totalUsers: 35,
      priority: "high",
    },
    {
      id: "ai-ethics",
      name: "AI Ethics & Compliance",
      description: "Responsible AI usage, bias detection, and regulatory compliance",
      targetRoles: ["All Roles"],
      duration: "3 hours",
      status: "in_progress",
      completionRate: 45,
      enrolledUsers: 21,
      totalUsers: 47,
      priority: "medium",
    },
    {
      id: "automation-workflows",
      name: "AI-Powered Automation",
      description: "Building and managing automated workflows with AI integration",
      targetRoles: ["Developer", "Operations", "Manager"],
      duration: "8 hours",
      status: "not_started",
      completionRate: 12,
      enrolledUsers: 4,
      totalUsers: 25,
      priority: "medium",
    },
    {
      id: "ai-leadership",
      name: "Leading AI Transformation",
      description: "Strategic leadership in AI adoption and organizational change management",
      targetRoles: ["CEO", "Manager", "Team Lead"],
      duration: "5 hours",
      status: "not_started",
      completionRate: 8,
      enrolledUsers: 2,
      totalUsers: 12,
      priority: "low",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "not_started":
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "medium":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "complete":
        return "Complete"
      case "in_progress":
        return "In Progress"
      case "not_started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <div>
              <CardTitle className="text-cyan-400">AI Training Curriculum</CardTitle>
              <p className="text-sm text-blue-300">Organizational learning modules and completion tracking</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700" disabled={!canExecuteActions}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
              </TooltipTrigger>
              {!canExecuteActions && (
                <TooltipContent>
                  <p>Only the HR Agent (Shandry) or CEO may modify training modules. Admins have view-only access.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="p-4 rounded-lg border border-cyan-500/20 bg-slate-800/30">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white">{module.name}</h3>
                  <Badge className={getStatusColor(module.status)}>{getStatusLabel(module.status)}</Badge>
                  <Badge className={getPriorityColor(module.priority)}>{module.priority} priority</Badge>
                </div>
                <p className="text-sm text-slate-300 mb-2">{module.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {module.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {module.enrolledUsers}/{module.totalUsers} enrolled
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {module.completionRate}% complete
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-500/30 text-cyan-300"
                        disabled={!canExecuteActions}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    {!canExecuteActions && (
                      <TooltipContent>
                        <p>
                          Only the HR Agent (Shandry) or CEO may launch training modules. Admins have view-only access.
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-500/30 text-cyan-300"
                        disabled={!canExecuteActions}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    {!canExecuteActions && (
                      <TooltipContent>
                        <p>
                          Only the HR Agent (Shandry) or CEO may edit training modules. Admins have view-only access.
                        </p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Completion Progress</span>
                <span className="text-cyan-400">{module.completionRate}%</span>
              </div>
              <Progress value={module.completionRate} className="h-2" />
            </div>

            {/* Target Roles */}
            <div className="mt-3">
              <p className="text-xs text-slate-400 mb-1">Target Roles:</p>
              <div className="flex flex-wrap gap-1">
                {module.targetRoles.map((role) => (
                  <Badge key={role} variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
