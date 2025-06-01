"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanApprovalCardProps {
  title: string
  agent: string
  type: "Project Plan" | "POC" | "Contract"
  confidence: number
  submitted: string
  onApprove?: () => void
  onReject?: () => void
  onNeedsChanges?: () => void
  readOnlyMode?: boolean
  className?: string
}

export default function PlanApprovalCard({
  title,
  agent,
  type,
  confidence,
  submitted,
  onApprove,
  onReject,
  onNeedsChanges,
  readOnlyMode = false,
  className,
}: PlanApprovalCardProps) {
  console.log("Loaded: PlanApprovalCard")

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Project Plan":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "POC":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "Contract":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400"
    if (confidence >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-white mb-2">{title}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTypeColor(type)}>{type}</Badge>
              <Badge className="bg-slate-700/50 text-blue-300 border border-slate-600/40">{agent}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-blue-300">
            <Calendar className="h-4 w-4" />
            <span>{submitted}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-300">Confidence:</span>
            <span className={`font-semibold ${getConfidenceColor(confidence)}`}>{confidence}%</span>
          </div>
        </div>

        <p className="text-xs text-blue-200">
          This submission is awaiting CEO approval. Review the deliverable and take action.
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t border-slate-700/40">
        {readOnlyMode ? (
          <div className="flex items-center justify-between w-full">
            <Button size="sm" variant="outline" className="border-slate-600/40 text-slate-300 cursor-default">
              <Eye className="h-4 w-4 mr-2" />
              Review
            </Button>
            <span className="text-xs text-slate-400">CEO-only actions</span>
          </div>
        ) : (
          <>
            <Button size="sm" onClick={onApprove} className="bg-green-600 hover:bg-green-700 text-white">
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onNeedsChanges}
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
            >
              Needs Changes
            </Button>
            <Button size="sm" variant="ghost" onClick={onReject} className="text-red-400 hover:bg-red-500/10">
              Reject
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

// Add named export for compatibility
export { PlanApprovalCard }
