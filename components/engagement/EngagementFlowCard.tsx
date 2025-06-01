"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { EngagementFlow } from "@/mock/engagement-logs"

interface EngagementFlowCardProps {
  engagement: EngagementFlow
  className?: string
  contentClassName?: string
  activityClassName?: string
}

export function EngagementFlowCard({
  engagement,
  className = "",
  contentClassName = "",
  activityClassName = "",
}: EngagementFlowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const getAgentAvatar = (agent: string) => {
    const avatarMap: Record<string, string> = {
      Bob: "B",
      Ada: "A",
      Max: "M",
      Jason: "J",
      Janet: "Ja",
      Shandry: "S",
      CEO: "C",
      System: "Sy",
    }
    return avatarMap[agent] || agent.charAt(0)
  }

  const completedStages = engagement.stages.filter((stage) => stage.status === "completed").length
  const totalStages = engagement.stages.length
  const progressPercentage = (completedStages / totalStages) * 100

  return (
    <div className={`w-full ${className}`}>
      {/* Header Section */}
      <div className={`space-y-4 ${contentClassName}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-auto text-cyan-400 hover:text-cyan-300 hover:bg-transparent"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400">{engagement.projectName}</h3>
              <p className="text-sm text-blue-300">
                {engagement.clientName} • {engagement.id}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(engagement.status)}>{engagement.status}</Badge>
            {getStatusIcon(engagement.status)}
          </div>
        </div>

        {/* Progress Section */}
        <div>
          <div className="flex items-center justify-between text-sm text-blue-200 mb-2">
            <span>
              Progress: {completedStages}/{totalStages} stages
            </span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-[#0f1a2c]/60 rounded-full h-2 border border-cyan-500/20">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={`space-y-4 mt-4 ${contentClassName}`}>
          {/* Engagement Flow Section */}
          <div>
            <h4 className="font-medium mb-3 text-cyan-400">Engagement Flow</h4>
            <div className="space-y-3">
              {engagement.stages.map((stage, index) => (
                <div key={stage.id} className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-cyan-500/30 bg-[#0f1a2c]/60">
                    <span className="text-xs font-medium text-cyan-400">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{stage.name}</span>
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-[#0f1a2c]/60 text-cyan-400 border border-cyan-500/20">
                            {getAgentAvatar(stage.agent)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-blue-300">{stage.agent}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(stage.status)} variant="outline">
                          {stage.status}
                        </Badge>
                        {getStatusIcon(stage.status)}
                      </div>
                    </div>
                    {stage.notes && <p className="text-sm text-blue-200 mt-1">{stage.notes}</p>}
                    {stage.startTime && (
                      <p className="text-xs text-blue-200 mt-1">
                        Started: {new Date(stage.startTime).toLocaleString()}
                        {stage.endTime && <> • Completed: {new Date(stage.endTime).toLocaleString()}</>}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h4 className="font-medium mb-3 text-cyan-400">Recent Activity</h4>
            <div className="space-y-2">
              {engagement.logs.slice(0, 3).map((log) => (
                <div
                  key={log.id}
                  className={`flex items-center space-x-3 p-2 bg-[#0f1a2c]/60 rounded border border-cyan-500/20 ${activityClassName}`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-[#0f1a2c]/60 text-cyan-400 border border-cyan-500/20">
                      {getAgentAvatar(log.actor)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-white">{log.notes}</p>
                    <p className="text-xs text-blue-200">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                  <Badge className={getStatusColor(log.status)} variant="outline">
                    {log.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
