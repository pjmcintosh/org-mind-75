"use client"

import { useUserRole } from "@/hooks/use-user-role"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { humanLabels } from "@/lib/humanLabels"

export default function BoardBriefingPage() {
  const { role } = useUserRole()
  const normalizedRole = role?.toLowerCase()

  // Restrict access to CEO, BoardChair, and Observer roles
  const allowedRoles = ["ceo", "boardchair", "observer", "admin"]
  if (!allowedRoles.includes(normalizedRole || "")) {
    redirect("/unauthorized")
  }

  // Determine if user can execute actions (CEO, BoardChair only)
  const canExecuteActions = normalizedRole === "ceo" || normalizedRole === "boardchair"
  const isViewOnlyMode = normalizedRole === "admin" || normalizedRole === "observer"

  console.log("Loaded: BoardBriefingPage")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          {humanLabels?.headers?.boardBriefing || "Board Briefing"}
        </h1>
        <p className="text-blue-300">
          {humanLabels?.descriptions?.boardBriefing || "Executive AI governance and organizational readiness overview"}
        </p>
      </div>

      {isViewOnlyMode && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <span className="text-yellow-300">⚠️</span>
          <span>
            You are viewing the Board Briefing in read-only mode. Only the CEO and Board Chair can perform actions.
          </span>
        </div>
      )}

      <div className="grid gap-6">
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">AI Governance Summary</CardTitle>
            <CardDescription className="text-blue-300">How we're managing AI across the organization</CardDescription>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✔️</span>
              <span>83% of filings now include AI usage disclosures.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400">📘</span>
              <span>4 of 9 board members have logged learning milestones (internal + external).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">🧠</span>
              <span>Risk oversight gaps identified in board strength map.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Meeting Oversight</CardTitle>
            <CardDescription className="text-blue-300">Time spent on AI-related decisions this quarter</CardDescription>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">⏱</span>
              <span>22% of meeting time focused on AI readiness, risk, or compliance.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">📋</span>
              <span>Agenda templates now include mandatory "AI Risk & Opportunity" block.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Training & Documentation</CardTitle>
            <CardDescription className="text-blue-300">Board development and regulatory posture</CardDescription>
          </CardHeader>
          <CardContent className="text-white space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">📥</span>
              <span>Board members can submit certificates from LinkedIn Learning, Harvard Exec Ed, etc.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              <span>3 members currently lack coverage for fiduciary AI oversight responsibilities.</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400">Quarterly Metrics</CardTitle>
            <CardDescription className="text-blue-300">Key performance indicators for AI governance</CardDescription>
          </CardHeader>
          <CardContent className="text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="text-2xl font-bold text-cyan-400">83%</div>
                <div className="text-sm text-blue-300">Disclosure Compliance</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">22%</div>
                <div className="text-sm text-blue-300">Meeting Focus</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400">4/9</div>
                <div className="text-sm text-blue-300">Trained Members</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
