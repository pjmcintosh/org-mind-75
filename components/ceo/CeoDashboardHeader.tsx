"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, CheckCircle, Users } from "lucide-react"
import type { CeoBriefing } from "@/mock/ceo-briefing"

interface CeoDashboardHeaderProps {
  briefing: CeoBriefing
  className?: string
}

export function CeoDashboardHeader({ briefing, className }: CeoDashboardHeaderProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      default:
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
    }
  }

  return (
    <Card className={className}>
      <CardContent className="py-6 px-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-lg mb-4">{briefing.briefingSummary}</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(briefing.systemHealth)}
                <div>
                  <p className="text-sm font-medium">System Health</p>
                  <Badge className={getStatusColor(briefing.systemHealth)}>{briefing.systemHealth}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Agents Online</p>
                  <p className="text-lg font-semibold">{briefing.totalAgentsOnline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Pending Approvals</p>
                  <p className="text-lg font-semibold">{briefing.pendingApprovals}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Critical Alerts</p>
                  <p className="text-lg font-semibold">{briefing.criticalAlerts}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
