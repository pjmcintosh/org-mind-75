"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink, Brain } from "lucide-react"
import { activityTimeline, type ActivityEvent } from "@/mock/agent-performance"
import { sampleEphryaDecisions } from "@/mock/ephrya-decisions"
import { EphryaDecisionCard } from "@/components/ephrya/EphryaDecisionCard"
import Link from "next/link"

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "default"
    case "pending":
      return "secondary"
    case "rejected":
      return "destructive"
    default:
      return "outline"
  }
}

export function CollapsibleActivityTimeline() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [showAllEvents, setShowAllEvents] = useState(false)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    console.log(`Ephrya's Activity Timeline ${isExpanded ? "collapsed" : "expanded"}`)
  }

  // Combine regular events with Ephrya decisions
  const allEvents = [
    ...activityTimeline,
    ...sampleEphryaDecisions.map((decision) => ({
      id: `ephrya-${decision.id}`,
      timestamp: decision.timestamp,
      agent: "Ephrya",
      type: "system" as const,
      description: `Ephrya assigned ${decision.recommendedAgent} based on ${decision.reasoning.toLowerCase()}`,
      details: `Decision factors: ${decision.decisionFactors.join(", ")}. Confidence: ${Math.round(decision.confidence * 100)}%`,
      actor: "Ephrya",
      actionType: "ai_decision",
      linkedProjectId: decision.id,
      status: decision.status as "pending" | "completed" | "rejected",
      agentInvolved: [decision.recommendedAgent],
      isEphryaDecision: true,
      ephryaDecision: decision,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const recentEvents = allEvents.slice(0, 3)
  const eventsToShow = showAllEvents ? allEvents : recentEvents

  if (!isExpanded) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg">📋</span>
              Ephrya's Activity Timeline
              <Badge variant="outline" className="text-xs">
                {allEvents.length} events
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {sampleEphryaDecisions.filter((d) => d.status === "pending").length} AI decisions pending
              </Badge>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={handleToggle} className="flex items-center gap-1">
              Show Timeline
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            Ephrya's Activity Timeline
            <Badge variant="outline" className="text-xs">
              {allEvents.length} events
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {sampleEphryaDecisions.filter((d) => d.status === "pending").length} AI decisions pending
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleToggle} className="flex items-center gap-1">
            Hide Timeline
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="transition-all duration-300 ease-in-out">
        <div className="space-y-4">
          {eventsToShow.map((event) => (
            <div key={event.id}>
              {(event as any).isEphryaDecision ? (
                <EphryaDecisionCard
                  decision={(event as any).ephryaDecision}
                  onDecisionUpdate={() => {
                    console.log("Decision updated, refreshing timeline")
                  }}
                />
              ) : (
                <div className="border-l-2 border-muted pl-4 pb-4 relative">
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
                        <Badge variant={getStatusColor(event.status)} className="text-xs">
                          {event.status}
                        </Badge>
                        {event.actionType === "ai_decision" && (
                          <Badge variant="secondary" className="text-xs">
                            <Brain className="h-3 w-3 mr-1" />
                            AI Decision
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{formatTimestamp(event.timestamp)}</span>
                    </div>

                    <p className="text-sm">{event.description}</p>

                    <div className="flex items-center gap-2">
                      {event.linkedProjectId && (
                        <Link href={`/admin/engagement-log/${event.linkedProjectId}`}>
                          <Button variant="ghost" size="sm" className="text-xs p-0 h-auto flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            View Full Engagement Flow
                          </Button>
                        </Link>
                      )}

                      {event.details && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                          className="text-xs p-0 h-auto"
                        >
                          {expandedEvent === event.id ? "Hide Details" : "Show Details"}
                        </Button>
                      )}
                    </div>

                    {expandedEvent === event.id && event.details && (
                      <div className="mt-2 p-3 bg-muted rounded-md">
                        <p className="text-sm text-muted-foreground">{event.details}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <strong>Actor:</strong> {event.actor}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <strong>Action Type:</strong> {event.actionType}
                          </p>
                          {event.agentInvolved.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              <strong>Agents Involved:</strong> {event.agentInvolved.join(", ")}
                            </p>
                          )}
                          {event.linkedProjectId && (
                            <p className="text-xs text-muted-foreground">
                              <strong>Project ID:</strong> {event.linkedProjectId}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showAllEvents && allEvents.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" onClick={() => setShowAllEvents(true)}>
              Show All Activity ({allEvents.length - 3} more events)
            </Button>
          </div>
        )}

        {showAllEvents && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" onClick={() => setShowAllEvents(false)}>
              Show Less
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
