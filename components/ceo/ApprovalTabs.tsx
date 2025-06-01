"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, FileText, Lightbulb, Building, Calendar, User, Eye } from "lucide-react"
import type { UnifiedApproval } from "@/mock/unified-approvals"
import { getApprovalStats, filterApprovalsByType } from "@/mock/unified-approvals"

interface ApprovalTabsProps {
  approvals: UnifiedApproval[]
  onApprovalUpdate: (id: string, status: "approved" | "rejected") => void
  onEphryaMessage: (message: string) => void
  readOnlyMode?: boolean
  className?: string
}

export function ApprovalTabs({
  approvals,
  onApprovalUpdate,
  onEphryaMessage,
  readOnlyMode,
  className,
}: ApprovalTabsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [pendingOnly, setPendingOnly] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<UnifiedApproval | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredApprovals = filterApprovalsByType(activeTab, approvals)
  const displayApprovals = pendingOnly ? filteredApprovals.filter((a) => a.status === "pending") : filteredApprovals

  const stats = getApprovalStats(displayApprovals)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "plan":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "poc":
        return <Lightbulb className="h-4 w-4 text-purple-500" />
      case "departmental":
        return <Building className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100/20 border border-green-500/30 text-green-500"
      case "rejected":
        return "bg-red-100/20 border border-red-500/30 text-red-500"
      case "pending":
        return "bg-yellow-100/20 border border-yellow-500/30 text-yellow-500"
      default:
        return "bg-gray-100/20 border border-gray-500/30 text-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100/20 border border-red-500/30 text-red-500"
      case "medium":
        return "bg-yellow-100/20 border border-yellow-500/30 text-yellow-500"
      case "low":
        return "bg-green-100/20 border border-green-500/30 text-green-500"
      default:
        return "bg-gray-100/20 border border-gray-500/30 text-gray-500"
    }
  }

  const handleApprove = (approval: UnifiedApproval) => {
    onApprovalUpdate(approval.id, "approved")
    const itemType =
      approval.type === "plan" ? "project plan" : approval.type === "poc" ? "POC prompt" : "departmental item"
    onEphryaMessage(`You approved ${approval.agent}'s ${itemType} for ${approval.title}.`)
    console.log(`CEO approved ${approval.agent}'s ${itemType} for ${approval.title}`)
  }

  const handleReject = (approval: UnifiedApproval) => {
    onApprovalUpdate(approval.id, "rejected")
    const itemType =
      approval.type === "plan" ? "project plan" : approval.type === "poc" ? "POC prompt" : "departmental item"
    onEphryaMessage(`You rejected ${approval.agent}'s ${itemType} for ${approval.title}.`)
    console.log(`CEO rejected ${approval.agent}'s ${itemType} for ${approval.title}`)
  }

  const handlePreview = (approval: UnifiedApproval) => {
    setSelectedApproval(approval)
    setIsPreviewOpen(true)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const tabNames = {
      all: "All Approvals",
      plans: "Project Plans",
      poc: "POC Prompts",
      departmental: "Departmental Items",
    }
    console.log(`CEO Dashboard filtered to: ${tabNames[value as keyof typeof tabNames]}`)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-blue-300">
            <span>{stats.pending} Items Pending</span>
            <span>·</span>
            <span>{stats.approved} Approved</span>
            <span>·</span>
            <span>{stats.rejected} Rejected</span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="pending-only" className="text-sm font-medium text-blue-300">
              Pending Only
            </label>
            <Switch id="pending-only" checked={pendingOnly} onCheckedChange={setPendingOnly} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Approvals</TabsTrigger>
            <TabsTrigger value="plans">Project Plans</TabsTrigger>
            <TabsTrigger value="poc">POC Prompts</TabsTrigger>
            <TabsTrigger value="departmental">Departmental</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {displayApprovals.map((approval) => (
                <div key={approval.id} className="rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeIcon(approval.type)}
                        <h3 className="font-semibold text-white truncate">{approval.title}</h3>
                        <Badge className={getPriorityColor(approval.priority)} variant="outline">
                          {approval.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mb-2 text-sm text-blue-300">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{approval.agent}</span>
                          {approval.department && (
                            <>
                              <span>·</span>
                              <span>{approval.department}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(approval.date).toLocaleDateString()}</span>
                        </div>
                        <Badge className={getStatusColor(approval.status)}>{approval.status}</Badge>
                      </div>

                      <p className="text-sm text-blue-300 mb-3">{approval.description}</p>

                      {approval.metadata && (
                        <div className="flex gap-4 text-xs text-blue-200 mb-3">
                          {approval.metadata.estimatedDuration && (
                            <span>Duration: {approval.metadata.estimatedDuration}</span>
                          )}
                          {approval.metadata.budget && <span>Budget: {approval.metadata.budget}</span>}
                          {approval.metadata.complexity && <span>Complexity: {approval.metadata.complexity}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" onClick={() => handlePreview(approval)}>
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    {approval.status === "pending" && !readOnlyMode && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(approval)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleReject(approval)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {displayApprovals.length === 0 && (
                <div className="text-center py-8 text-blue-200">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No {pendingOnly ? "pending " : ""}approvals found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedApproval && getTypeIcon(selectedApproval.type)}
                {selectedApproval?.title}
              </DialogTitle>
            </DialogHeader>

            {selectedApproval && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Agent:</span>
                    <Badge variant="outline">{selectedApproval.agent}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Date:</span>
                    <span>{new Date(selectedApproval.date).toLocaleDateString()}</span>
                  </div>
                  <Badge className={getStatusColor(selectedApproval.status)}>{selectedApproval.status}</Badge>
                </div>

                {selectedApproval.sourceInputs && (
                  <div>
                    <h4 className="font-medium mb-2">Source Inputs:</h4>
                    <ul className="list-disc list-inside text-sm text-blue-300 space-y-1">
                      {selectedApproval.sourceInputs.map((input, index) => (
                        <li key={index}>{input}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedApproval.content && (
                  <div>
                    <h4 className="font-medium mb-2">Content:</h4>
                    <ScrollArea className="h-96 w-full border rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm">{selectedApproval.content}</pre>
                    </ScrollArea>
                  </div>
                )}

                {selectedApproval.status === "pending" && !readOnlyMode && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={() => {
                        handleApprove(selectedApproval)
                        setIsPreviewOpen(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleReject(selectedApproval)
                        setIsPreviewOpen(false)
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
