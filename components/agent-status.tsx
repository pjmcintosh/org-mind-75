"use client"

import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  icon: string
  status: "healthy" | "idle" | "timeout"
  lastActive: string
  tokensUsed: number
}

export const AgentStatus = () => {
  const agents: Agent[] = [
    {
      id: "bob",
      name: "Bob",
      icon: "👤",
      status: "healthy",
      lastActive: "3 min ago",
      tokensUsed: 1250,
    },
    {
      id: "ada",
      name: "Ada",
      icon: "🔍",
      status: "healthy",
      lastActive: "2 min ago",
      tokensUsed: 2100,
    },
    {
      id: "max",
      name: "Max",
      icon: "⚡",
      status: "idle",
      lastActive: "15 min ago",
      tokensUsed: 850,
    },
    {
      id: "eve",
      name: "Eve",
      icon: "🧠",
      status: "healthy",
      lastActive: "1 min ago",
      tokensUsed: 1680,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Healthy</Badge>
      case "idle":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">🟡 Idle</Badge>
      case "timeout":
        return <Badge className="bg-red-100 text-red-800 border-red-200">🔴 Timeout</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {agents.map((agent) => (
        <div key={agent.id} className="border p-4 rounded-xl shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{agent.icon}</span>
              <span className="font-semibold">{agent.name}</span>
            </div>
            {getStatusBadge(agent.status)}
          </div>
          <div className="text-sm text-muted-foreground">Last Active: {agent.lastActive}</div>
          <div className="text-sm text-muted-foreground">Tokens Used: {agent.tokensUsed.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}

export default AgentStatus
