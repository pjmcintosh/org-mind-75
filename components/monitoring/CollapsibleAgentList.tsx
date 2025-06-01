"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { AgentMetrics } from "@/mock/agent-performance"

interface CollapsibleAgentListProps {
  filteredAgents: AgentMetrics[]
}

export function CollapsibleAgentList({ filteredAgents }: CollapsibleAgentListProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "online":
        return "default"
      case "busy":
        return "secondary"
      case "idle":
        return "outline"
      case "offline":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    console.log(`Agent List ${isExpanded ? "collapsed" : "expanded"}`)
  }

  const activeAgents = filteredAgents.filter((agent) => agent.status !== "offline")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            Agent List
            <Badge variant="outline" className="text-xs">
              {activeAgents.length} active
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleToggle} className="flex items-center gap-1">
            {isExpanded ? "Hide Details" : "Show All Agents"}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="transition-all duration-300 ease-in-out">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Tokens Used</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Uptime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.avatar}</span>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-muted-foreground">{agent.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(agent.status)}>{agent.status}</Badge>
                  </TableCell>
                  <TableCell>{agent.lastActive}</TableCell>
                  <TableCell>{agent.tokensUsed.toLocaleString()}</TableCell>
                  <TableCell>{agent.requestsHandled}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{agent.efficiency}%</span>
                      {agent.efficiency >= 90 && <span className="text-green-500">↗</span>}
                      {agent.efficiency < 90 && agent.efficiency >= 80 && <span className="text-yellow-500">→</span>}
                      {agent.efficiency < 80 && <span className="text-red-500">↘</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        agent.uptime >= 99 ? "text-green-600" : agent.uptime >= 95 ? "text-yellow-600" : "text-red-600"
                      }
                    >
                      {agent.uptime}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  )
}
