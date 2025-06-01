"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Clock, User, Briefcase } from "lucide-react"
import type { DepartmentSummaryType } from "@/lib/data/mockData"

interface CollapsibleDepartmentSummaryProps {
  departments?: DepartmentSummaryType[]
  readOnlyMode?: boolean
  className?: string
}

export function CollapsibleDepartmentSummary({
  departments = [],
  readOnlyMode,
  className,
}: CollapsibleDepartmentSummaryProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle undefined or empty departments array
  if (!departments || !Array.isArray(departments)) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-blue-300">Department Summaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-400 py-8">No department data available</div>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
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

  const totalAlerts = departments.reduce((sum, dept) => sum + (dept.alerts?.length || 0), 0)
  const totalPending = departments.reduce((sum, dept) => sum + (dept.pendingItems || 0), 0)

  return (
    <Card className={className}>
      <CardHeader
        className="cursor-pointer hover:bg-slate-800/30 transition-colors pb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-blue-300">
          <div className="flex items-center gap-2 text-sm font-normal">
            <span>({totalPending} pending</span>
            {totalAlerts > 0 && <span>· {totalAlerts} alerts</span>}
            <span>)</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Card key={dept.department} className="border border-cyan-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getDepartmentIcon(dept.department)}</span>
                      <div>
                        <h3 className="font-semibold text-sm text-white">{dept.department}</h3>
                        <div className="flex items-center gap-1 text-xs text-blue-300">
                          <User className="h-3 w-3" />
                          {dept.agent}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">{getStatusIcon(dept.status)}</div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <Badge className={getStatusColor(dept.status)} variant="outline">
                    {dept.status}
                  </Badge>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-blue-500" />
                      <div>
                        <p className="text-blue-300">Active</p>
                        <p className="font-semibold text-white">{dept.activeProjects || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <div>
                        <p className="text-blue-300">Pending</p>
                        <p className="font-semibold text-white">{dept.pendingItems || 0}</p>
                      </div>
                    </div>
                  </div>

                  {dept.alerts && dept.alerts.length > 0 && (
                    <div>
                      <h4 className="font-medium text-xs text-cyan-400 mb-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Alerts ({dept.alerts.length})
                      </h4>
                      <div className="space-y-1">
                        {dept.alerts.slice(0, 2).map((alert, index) => (
                          <div
                            key={index}
                            className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-1 rounded"
                          >
                            {alert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
