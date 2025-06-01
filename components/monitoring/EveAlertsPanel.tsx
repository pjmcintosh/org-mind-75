"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, Clock, AlertTriangle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"

interface EveAlert {
  id: string
  projectId: string
  message: string
  createdAt: string
  severity: "high" | "medium" | "low"
}

const mockAlerts: EveAlert[] = [
  {
    id: "alert-001",
    projectId: "PRJ-1023",
    message: "Project planning overdue by 4 hours",
    createdAt: "May 27, 9:42 AM",
    severity: "high",
  },
  {
    id: "alert-002",
    projectId: "PRJ-1087",
    message: "Missing client approval for 2 days",
    createdAt: "May 27, 8:15 AM",
    severity: "medium",
  },
  {
    id: "alert-003",
    projectId: "PRJ-1156",
    message: "Budget threshold exceeded by 15%",
    createdAt: "May 27, 7:33 AM",
    severity: "high",
  },
  {
    id: "alert-004",
    projectId: "PRJ-1201",
    message: "Resource allocation needs review",
    createdAt: "May 26, 4:22 PM",
    severity: "low",
  },
]

export function EveAlertsPanel() {
  const [isOpen, setIsOpen] = useState(false)

  console.log("Loaded: EveAlertsPanel")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <Eye className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <CardTitle className="text-lg">Eve's System Alerts</CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {mockAlerts.length} active
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-3">
            {mockAlerts.map((alert) => (
              <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.projectId}
                        </Badge>
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                      <p className="text-xs text-muted-foreground">{alert.createdAt}</p>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}

            {mockAlerts.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No active alerts</p>
                <p className="text-xs">Eve is monitoring all systems</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
