"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { activityTimeline, type ActivityEvent } from "@/mock/agent-performance"
import { useState } from "react"

const getEventIcon = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "output":
      return "📄"
    case "approval":
      return "✅"
    case "escalation":
      return "⚠️"
    case "system":
      return "⚙️"
    case "error":
      return "❌"
    default:
      return "📋"
  }
}

const getEventColor = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "output":
      return "default"
    case "approval":
      return "default"
    case "escalation":
      return "destructive"
    case "system":
      return "secondary"
    case "error":
      return "destructive"
    default:
      return "outline"
  }
}

export function AgentActivityTimeline() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          Ephrya's Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityTimeline.map((event) => (
            <div key={event.id} className="border-l-2 border-muted pl-4 pb-4 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-background border-2 border-muted rounded-full flex items-center justify-center">
                <span className="text-xs">{getEventIcon(event.type)}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={getEventColor(event.type)} className="text-xs">
                      {event.type}
                    </Badge>
                    <span className="font-medium">{event.agent}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatTimestamp(event.timestamp)}</span>
                </div>

                <p className="text-sm">{event.description}</p>

                {event.details && (
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="text-xs p-0 h-auto"
                    >
                      {expandedEvent === event.id ? "Hide Details" : "Show Details"}
                    </Button>

                    {expandedEvent === event.id && (
                      <div className="mt-2 p-3 bg-muted rounded-md">
                        <p className="text-sm text-muted-foreground">{event.details}</p>
                        {event.projectId && (
                          <p className="text-xs text-muted-foreground mt-1">Project ID: {event.projectId}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
