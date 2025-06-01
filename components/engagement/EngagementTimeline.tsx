"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, User, Bot, FileText, CheckCircle, AlertCircle } from "lucide-react"
import type { SystemLog } from "@/mock/engagement-logs"

interface EngagementTimelineProps {
  logs: SystemLog[]
  className?: string
  title?: string
  headerClassName?: string
  contentClassName?: string
}

export function EngagementTimeline({
  logs,
  className = "",
  title = "Activity Timeline",
  headerClassName = "p-6 pb-3",
  contentClassName = "px-6 pb-6",
}: EngagementTimelineProps) {
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "intake_started":
      case "document_intake":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "approval_granted":
      case "approval_rejected":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "analysis_started":
      case "technical_review_started":
      case "legal_review_started":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-cyan-400" />
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

  const getAgentAvatar = (actor: string) => {
    const avatarMap: Record<string, string> = {
      Bob: "B",
      Ada: "A",
      Max: "M",
      Jason: "J",
      Janet: "Ja",
      Shandry: "S",
      CEO: "C",
      Admin: "Ad",
      Eve: "E",
    }
    return avatarMap[actor] || actor.charAt(0)
  }

  // Defensive check for logs array
  if (!Array.isArray(logs)) {
    return (
      <div className={className}>
        <div className={headerClassName}>
          <h3 className="text-cyan-400 flex items-center space-x-2 font-semibold">
            <Clock className="h-5 w-5" />
            <span>{title}</span>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">0 events</Badge>
          </h3>
        </div>
        <div className={contentClassName}>
          <div className="text-center py-8 text-blue-200">No activity logs available</div>
        </div>
      </div>
    )
  }

  const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className={className}>
      <div className={headerClassName}>
        <h3 className="text-cyan-400 flex items-center space-x-2 font-semibold">
          <Clock className="h-5 w-5" />
          <span>{title}</span>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{logs.length} events</Badge>
        </h3>
      </div>
      <div className={contentClassName}>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedLogs.map((log, index) => {
              // Defensive checks for log object
              if (!log || !log.id) {
                return null
              }

              // Safe metadata handling
              const metadata = log.metadata || {}
              const metadataKeys = metadata && typeof metadata === "object" ? Object.keys(metadata) : []

              return (
                <div key={log.id} className="flex items-start space-x-3 relative">
                  <div className="flex-shrink-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-slate-700 text-cyan-400">
                        {getAgentAvatar(log.actor || "U")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-cyan-400">{log.actor || "Unknown"}</span>
                      <div className="flex items-center space-x-1">
                        {log.actorType === "agent" ? (
                          <Bot className="h-3 w-3 text-blue-400" />
                        ) : (
                          <User className="h-3 w-3 text-green-400" />
                        )}
                        <span className="text-xs text-blue-300">{log.actorType || "unknown"}</span>
                      </div>
                      <Badge className={getStatusColor(log.status || "unknown")} variant="outline">
                        {log.status || "unknown"}
                      </Badge>
                    </div>

                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-0.5">{getActionIcon(log.actionType || "")}</div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{log.notes || "No description available"}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-blue-300">
                          <span>{log.timestamp ? new Date(log.timestamp).toLocaleString() : "Unknown time"}</span>
                          <span>
                            Target: {log.targetType || "unknown"} ({log.targetId || "unknown"})
                          </span>
                          <span>Action: {log.actionType || "unknown"}</span>
                        </div>

                        {metadataKeys.length > 0 && (
                          <div className="mt-2 p-2 bg-[#0f1a2c]/60 border border-cyan-500/20 rounded text-xs">
                            <span className="font-medium text-cyan-400">Metadata: </span>
                            {metadataKeys.map((key) => (
                              <span key={key} className="mr-3 text-blue-200">
                                {key}: {String(metadata[key] || "N/A")}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {index < sortedLogs.length - 1 && <div className="absolute left-4 top-10 w-px h-6 bg-cyan-500/30" />}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
