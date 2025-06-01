"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Agent {
  id: string
  name: string
  status: string
  lastActive: string
  tokensUsed: number
  requests: number
}

const agents: Agent[] = [
  {
    id: "bob",
    name: "Bob",
    status: "healthy",
    lastActive: "3 min ago",
    tokensUsed: 1250,
    requests: 45,
  },
  {
    id: "ada",
    name: "Ada",
    status: "healthy",
    lastActive: "2 min ago",
    tokensUsed: 2100,
    requests: 32,
  },
  {
    id: "max",
    name: "Max",
    status: "idle",
    lastActive: "15 min ago",
    tokensUsed: 850,
    requests: 18,
  },
  {
    id: "eve",
    name: "Eve",
    status: "healthy",
    lastActive: "1 min ago",
    tokensUsed: 1680,
    requests: 28,
  },
]

export const AgentsTable = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Healthy</Badge>
      case "idle":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Idle</Badge>
      case "timeout":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Timeout</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAgentIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "bob":
        return "👤"
      case "ada":
        return "🔍"
      case "max":
        return "⚡"
      case "eve":
        return "🧠"
      default:
        return "🤖"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Tokens Used</TableHead>
          <TableHead>Requests</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getAgentIcon(agent.name)}</span>
                <span className="font-medium">{agent.name}</span>
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(agent.status)}</TableCell>
            <TableCell>{agent.lastActive}</TableCell>
            <TableCell>{agent.tokensUsed.toLocaleString()}</TableCell>
            <TableCell>{agent.requests}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AgentsTable
