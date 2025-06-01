"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Clock, Zap } from "lucide-react"

interface Agent {
  id: string
  name: string
  status: string
  last_active: string
  health_check: string
}

interface HealthCheck {
  id: string
  agent_id: string
  timestamp: string
  status: string
  details: string
}

interface AgentHealthCheckCardProps {
  agent: Agent
  healthChecks: HealthCheck[]
  onHealthCheck: (agentId: string) => void
}

export const AgentHealthCheckCard = ({ agent, healthChecks, onHealthCheck }: AgentHealthCheckCardProps) => {
  const getAgentIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "bob":
      case "agent 1":
        return "👤"
      case "ada":
      case "agent 2":
        return "🔍"
      case "max":
      case "agent 3":
        return "⚡"
      case "eve":
      case "agent 4":
        return "🧠"
      default:
        return "🤖"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "healthy":
      case "online":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
      case "warning":
      case "idle":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Idle</Badge>
      case "unhealthy":
      case "offline":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overloaded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLastActivity = (timestamp: string) => {
    const now = new Date()
    const lastActive = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  const getTokensUsed = (agentName: string) => {
    const mockTokens = {
      "agent 1": 1250,
      "agent 2": 2100,
      "agent 3": 850,
      "agent 4": 1680,
      "agent 5": 920,
      bob: 1250,
      ada: 2100,
      max: 850,
      eve: 1680,
    }
    return mockTokens[agentName.toLowerCase()] || Math.floor(Math.random() * 2000) + 500
  }

  const latestHealthCheck = healthChecks[0]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getAgentIcon(agent.name)}</div>
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-slate-600">Agent ID: {agent.id}</p>
            </div>
          </div>
          {getStatusBadge(agent.health_check)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Last Activity</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{getLastActivity(agent.last_active)}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Tokens Today</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{getTokensUsed(agent.name).toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Status</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 capitalize">{agent.status}</span>
          </div>
        </div>

        {latestHealthCheck && (
          <div className="border-t pt-3">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Latest Health Check</h4>
            <p className="text-xs text-slate-600 mb-2">{latestHealthCheck.details}</p>
            <p className="text-xs text-slate-500">{getLastActivity(latestHealthCheck.timestamp)}</p>
          </div>
        )}

        <Button onClick={() => onHealthCheck(agent.id)} variant="outline" size="sm" className="w-full">
          <Activity className="h-4 w-4 mr-2" />
          Run Health Check
        </Button>
      </CardContent>
    </Card>
  )
}

export default AgentHealthCheckCard
