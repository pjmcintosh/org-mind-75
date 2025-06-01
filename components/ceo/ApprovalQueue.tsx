"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, AlertCircle } from "lucide-react"
import type { ApprovalItem } from "@/mock/ceo-briefing"

interface ApprovalQueueProps {
  approvals: ApprovalItem[]
  className?: string
}

export function ApprovalQueue({ approvals, className }: ApprovalQueueProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Legal":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      case "Finance":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "HR":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
    }
  }

  const handleApprove = (id: string) => {
    console.log(`Approved item: ${id}`)
  }

  const handleReject = (id: string) => {
    console.log(`Rejected item: ${id}`)
  }

  const handleReview = (id: string) => {
    console.log(`Reviewing item: ${id}`)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <AlertCircle className="h-5 w-5" />
          Approval Queue ({approvals.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvals.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getDepartmentColor(item.department)}>{item.department}</Badge>
                    <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                    <span className="text-sm text-blue-300 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.agent}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-blue-300 text-sm mb-2">{item.description}</p>

                  <div className="flex items-center gap-1 text-xs text-blue-300">
                    <Clock className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-700/40">
                <Button
                  size="sm"
                  onClick={() => handleApprove(item.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleReject(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReview(item.id)}
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  Review Details
                </Button>
              </div>
            </div>
          ))}

          {approvals.length === 0 && (
            <div className="text-center py-8 text-blue-300">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-cyan-400/50" />
              <p>No pending approvals</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
