"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import type { SignatureRequest } from "@/mock/signature-queue"

interface AgentStatusBadgeProps {
  item: SignatureRequest
  onRemindAgent?: (agentId: string) => void
  className?: string
}

export function AgentStatusBadge({ item, onRemindAgent, className }: AgentStatusBadgeProps) {
  const getAgentStatusInfo = () => {
    if (item.status === "pending") {
      return {
        icon: <Clock className="h-3 w-3" />,
        label: "Awaiting Decision",
        color: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
        emoji: "⏳",
      }
    }

    if (!item.followUpTriggered) {
      return {
        icon: <Clock className="h-3 w-3" />,
        label: "No Follow-up Needed",
        color: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        emoji: "ℹ️",
      }
    }

    if (item.agentAcknowledged) {
      const agentName = item.agent.split(" ")[0]
      return {
        icon: <CheckCircle className="h-3 w-3" />,
        label: `Acknowledged by ${agentName}`,
        color: "bg-green-500/20 text-green-400 border border-green-500/30",
        emoji: "🟢",
      }
    }

    // Check if follow-up is overdue (more than 24 hours)
    const followUpTime = item.followUpTimestamp ? new Date(item.followUpTimestamp) : new Date()
    const hoursAgo = (Date.now() - followUpTime.getTime()) / (1000 * 60 * 60)
    const isOverdue = hoursAgo > 24

    if (isOverdue) {
      return {
        icon: <AlertCircle className="h-3 w-3" />,
        label: "Follow-up Required",
        color: "bg-red-500/20 text-red-400 border border-red-500/30",
        emoji: "🔴",
      }
    }

    return {
      icon: <Clock className="h-3 w-3" />,
      label: "Awaiting Agent Response",
      color: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      emoji: "🟡",
    }
  }

  const statusInfo = getAgentStatusInfo()
  const agentName = item.agent.split(" ")[0]

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const handleRemindAgent = () => {
    if (onRemindAgent) {
      onRemindAgent(item.agent)
      console.log(`Reminder sent to ${item.agent} for ${item.document}`)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`${statusInfo.color} ${className}`}>
              <span className="mr-1">{statusInfo.emoji}</span>
              <span className="hidden sm:inline">{statusInfo.label}</span>
              <span className="sm:hidden">{agentName}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="border border-cyan-500/20 text-white">
            <div className="text-sm">
              <p className="font-medium">{statusInfo.label}</p>
              {item.followUpTimestamp && (
                <p className="text-xs text-blue-300 mt-1">Last update: {formatTimestamp(item.followUpTimestamp)}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {item.followUpMessage && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
            >
              <MessageSquare className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md border border-cyan-500/20 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-cyan-400">
                <span>{agentName}'s Response</span>
                {statusInfo.icon}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-cyan-400">Document:</p>
                <p className="text-sm text-blue-300">{item.document}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400">Agent Message:</p>
                <p className="text-sm bg-slate-800/50 border border-slate-700/40 p-3 rounded-md italic text-blue-300">
                  "{item.followUpMessage}"
                </p>
              </div>
              {item.followUpTimestamp && (
                <div>
                  <p className="text-sm font-medium text-cyan-400">Timestamp:</p>
                  <p className="text-xs text-blue-300">{formatTimestamp(item.followUpTimestamp)}</p>
                </div>
              )}
              {!item.agentAcknowledged && (
                <div className="pt-2 border-t border-slate-700/40">
                  <Button
                    onClick={handleRemindAgent}
                    variant="outline"
                    size="sm"
                    className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Send Reminder to {agentName}
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
