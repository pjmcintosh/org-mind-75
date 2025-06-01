"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, User, Briefcase } from "lucide-react"
import type { DepartmentSummaryType } from "@/mock/ceo-briefing"

interface DepartmentSummaryProps {
  departments: DepartmentSummaryType[]
  className?: string
}

export function DepartmentSummary({ departments, className }: DepartmentSummaryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return <CheckCircle className="h-5 w-5 text-cyan-400" />
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

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "Legal":
        return "⚖️"
      case "Finance":
        return "💰"
      case "HR":
        return "👥"
      default:
        return "📋"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400">Department Summaries</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.department} className={className}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getDepartmentIcon(dept.department)}</span>
                  <div>
                    <h3 className="font-semibold">{dept.department}</h3>
                    <div className="flex items-center gap-1 text-sm text-blue-300">
                      <User className="h-3 w-3" />
                      {dept.agent}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">{getStatusIcon(dept.status)}</div>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className={getStatusColor(dept.status)}>{dept.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-blue-300">Active Projects</p>
                    <p className="font-semibold">{dept.activeProjects}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="text-blue-300">Pending Items</p>
                    <p className="font-semibold">{dept.pendingItems}</p>
                  </div>
                </div>
              </div>

              {dept.alerts.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-cyan-400 mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Alerts
                  </h4>
                  <ul className="space-y-1">
                    {dept.alerts.map((alert, index) => (
                      <li
                        key={index}
                        className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded"
                      >
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-medium text-sm text-cyan-400 mb-2">Upcoming Tasks</h4>
                <ul className="space-y-1">
                  {dept.upcomingTasks.slice(0, 2).map((task, index) => (
                    <li
                      key={index}
                      className="text-xs text-blue-300 bg-slate-800/50 border border-slate-700/40 p-2 rounded"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
