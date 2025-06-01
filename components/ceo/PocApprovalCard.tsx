"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Clock, Lightbulb } from "lucide-react"
import type { ProjectApproval } from "@/mock/ceo-approvals"
import { cn } from "@/lib/utils"

interface PocApprovalCardProps {
  approval: ProjectApproval
  onPreview: (approval: ProjectApproval) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  className?: string
}

export function PocApprovalCard({ approval, onPreview, onApprove, onReject, className }: PocApprovalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "Awaiting Approval":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
    }
  }

  const isActionable = approval.status === "Awaiting Approval"

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-white mb-2">{approval.projectName}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Lightbulb className="h-3 w-3 mr-1" />
                Max - POC Prompt
              </Badge>
              <Badge className={getStatusColor(approval.status)}>{approval.status}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-blue-300">
            <Clock className="h-4 w-4" />
            <span>{approval.metadata.estimatedDuration}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <DollarSign className="h-4 w-4" />
            <span>{approval.metadata.budget}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Calendar className="h-4 w-4" />
            <span>{new Date(approval.generatedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-300">
            <Lightbulb className="h-4 w-4" />
            <span>{approval.metadata.complexity} Complexity</span>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <p className="text-sm font-medium text-cyan-400 mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-1">
            {approval.metadata.technologies?.slice(0, 3).map((tech) => (
              <Badge key={tech} className="bg-slate-700/50 text-blue-300 border border-slate-600/40 text-xs">
                {tech}
              </Badge>
            ))}
            {approval.metadata.technologies && approval.metadata.technologies.length > 3 && (
              <Badge className="bg-slate-700/50 text-blue-300 border border-slate-600/40 text-xs">
                +{approval.metadata.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-slate-700/40">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPreview(approval)}
            className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            Preview Prompt
          </Button>
          {isActionable && (
            <>
              <Button size="sm" onClick={() => onApprove(approval.id)} className="bg-green-600 hover:bg-green-700">
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject(approval.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
