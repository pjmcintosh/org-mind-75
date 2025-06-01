// PATCH: components/agents/AgentOverviewShell.tsx

"use client"

import { Badge } from "@/components/ui/badge"

interface AgentOverviewShellProps {
  title: string
  subtitle: string
  emoji: string
  status?: "Active" | "Inactive" | "Maintenance"
  helpToggle?: React.ReactNode
  children: React.ReactNode
}

export default function AgentOverviewShell({
  title,
  subtitle,
  emoji,
  status = "Active",
  helpToggle,
  children,
}: AgentOverviewShellProps) {
  console.log("Loaded: AgentOverviewShell")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "Inactive":
        return "bg-red-500/20 text-red-300 border border-red-500/30"
      case "Maintenance":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      default:
        return "bg-slate-600/20 text-white border border-slate-500/30"
    }
  }

  return (
    <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl px-6 py-8 space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{emoji}</div>
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">{title}</h1>
            <p className="text-blue-300 text-sm mt-1">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className={getStatusColor(status)}>{status}</Badge>
          {helpToggle}
        </div>
      </div>

      {/* Main Content */}
      {children}
    </div>
  )
}
