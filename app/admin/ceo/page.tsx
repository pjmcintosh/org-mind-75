"use client"

import { useEffect, useState } from "react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { CeoDashboardHeader } from "@/components/ceo/CeoDashboardHeader"
import { ApprovalTabs } from "@/components/ceo/ApprovalTabs"
import { CollapsibleDepartmentSummary } from "@/components/ceo/CollapsibleDepartmentSummary"
import { CollapsibleSignatureLog } from "@/components/ceo/CollapsibleSignatureLog"
import { mockCeoBriefing, mockDepartmentSummaries, mockSignatureLog } from "@/lib/data/mockData"
import { mockUnifiedApprovals } from "@/lib/data/mockData"
import type { UnifiedApproval } from "@/mock/unified-approvals"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Shield, ChevronDown, ChevronRight } from "lucide-react"
import AgentOverviewShell from "@/components/agents/AgentOverviewShell"
import HelpToggle from "@/components/overlays/help-toggle"
import PlanApprovalCard from "@/components/ceo/PlanApprovalCard"
import SignatureLog, { type SignatureEntry } from "@/components/ceo/SignatureLog"
import { signoffQueue } from "@/lib/data/signoffs"

export default function CeoDashboardPage() {
  console.log("Loaded: CEODashboardPage")

  const { currentRole } = useRole()
  const normalizedRole = currentRole?.toLowerCase() || ""
  const isCEO = normalizedRole === "ceo"
  const isAdmin = normalizedRole === "admin"
  const canAccessCeoPage = isCEO || isAdmin
  const canExecuteActions = isCEO // Only CEO can execute actions
  const isViewOnlyMode = isAdmin // Admin has view-only access
  const [approvals, setApprovals] = useState<UnifiedApproval[]>(mockUnifiedApprovals || [])
  const [ephryaMessages, setEphryaMessages] = useState<string[]>([])
  const [decisionLog, setDecisionLog] = useState<SignatureEntry[]>([])

  // Collapsible state management
  const [briefingOpen, setBriefingOpen] = useState(true)
  const [approvalsOpen, setApprovalsOpen] = useState(true)
  const [departmentsOpen, setDepartmentsOpen] = useState(true)
  const [signatureLogOpen, setSignatureLogOpen] = useState(true)
  const [submissionsOpen, setSubmissionsOpen] = useState(true)
  const [decisionLogOpen, setDecisionLogOpen] = useState(true)

  const handleDecision = (type: SignatureEntry["action"], item: any) => {
    if (!canExecuteActions) return // Only CEO can execute
    const newEntry: SignatureEntry = {
      action: type,
      agent: item.agent,
      title: item.title,
      timestamp: new Date().toLocaleString(),
    }
    setDecisionLog((prev) => [newEntry, ...prev])
  }

  const handleApprovalUpdate = (id: string, status: "approved" | "rejected") => {
    if (!canExecuteActions) return // Only CEO can execute
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const handleEphryaMessage = (message: string) => {
    if (!canExecuteActions) return
    setEphryaMessages((prev) => [...prev, message])
  }

  useEffect(() => {
    if (canAccessCeoPage) {
      const pending = approvals.filter((a) => a.status === "pending").length
      console.log(`CEO Dashboard loaded with ${pending} pending approvals`)
    }
  }, [currentRole, approvals, canAccessCeoPage])

  if (!canAccessCeoPage) {
    const roleInfo = getRoleInfo(currentRole)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{roleInfo.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-cyan-400">CEO Dashboard</h1>
                <p className="text-blue-300">Executive oversight and approvals</p>
              </div>
            </div>
            <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Viewing as: {roleInfo.label}
            </Badge>
          </div>
          <Alert className="bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
            <AlertDescription className="text-red-200">
              Access Denied: Only CEO and Admin roles may view this dashboard. Current role: {normalizedRole}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <AgentOverviewShell
          title="CEO Overview – Executive Sign-Off Panel"
          subtitle="Review project plans, POCs, and legal documents submitted by agents."
          helpOverlay={
            <HelpToggle
              title="CEO Overview Help"
              content={
                <ul className="list-disc ml-4">
                  <li>Review outputs from Ada, Max, Jason, and others</li>
                  <li>Approve, request changes, or reject items</li>
                  <li>Triggers agent workflow responses (mock only)</li>
                </ul>
              }
            />
          }
        >
          <div className="space-y-6">
            {isAdmin && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm px-4 py-2 rounded-lg mb-6 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  You are viewing the CEO Dashboard in read-only mode. Only the CEO may perform executive actions.
                </div>
              </div>
            )}

            {/* Daily Briefing Section */}
            <Collapsible open={briefingOpen} onOpenChange={setBriefingOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                  {briefingOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  Daily Briefing from Tilo
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4">
                  <CeoDashboardHeader briefing={mockCeoBriefing} className="bg-transparent border-0" />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Executive Approvals Section */}
            <Collapsible open={approvalsOpen} onOpenChange={setApprovalsOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                  {approvalsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  Executive Approvals
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4">
                  <ApprovalTabs
                    approvals={approvals}
                    onApprovalUpdate={handleApprovalUpdate}
                    onEphryaMessage={handleEphryaMessage}
                    readOnlyMode={!canExecuteActions}
                    className="bg-transparent border-0"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Department Summaries Section */}
            <Collapsible open={departmentsOpen} onOpenChange={setDepartmentsOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                  {departmentsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  Department Summaries
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4">
                  <CollapsibleDepartmentSummary
                    departments={mockDepartmentSummaries || []}
                    readOnlyMode={!canExecuteActions}
                    className="bg-transparent border-0"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Signature Log Section */}
            {canExecuteActions && (
              <Collapsible open={signatureLogOpen} onOpenChange={setSignatureLogOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                    {signatureLogOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    Signature Log
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4">
                    <CollapsibleSignatureLog signatures={mockSignatureLog || []} className="bg-transparent border-0" />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Admin Access Restriction Notice */}
            {isViewOnlyMode && (
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-orange-300">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Admin access: financial and signature tools are restricted to the CEO role.
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pending Agent Submissions Section */}
            <Collapsible open={submissionsOpen} onOpenChange={setSubmissionsOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                  {submissionsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  Pending Agent Submissions
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4 space-y-4">
                  <div className="grid gap-4">
                    {(signoffQueue || []).map((item, index) => (
                      <PlanApprovalCard
                        key={index}
                        {...item}
                        onApprove={() => handleDecision("Approved", item)}
                        onReject={() => handleDecision("Rejected", item)}
                        onNeedsChanges={() => handleDecision("Requested Changes", item)}
                        readOnlyMode={!canExecuteActions}
                        className="bg-slate-800/50 border border-cyan-500/20"
                      />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* CEO Decision Log Section */}
            <Collapsible open={decisionLogOpen} onOpenChange={setDecisionLogOpen}>
              <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
                  {decisionLogOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                  CEO Decision Log
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm text-white rounded-xl p-4">
                  <SignatureLog log={decisionLog} className="bg-transparent border-0" />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </AgentOverviewShell>
      </div>
    </div>
  )
}
