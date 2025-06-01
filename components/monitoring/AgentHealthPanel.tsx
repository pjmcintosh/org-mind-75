import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { agentMetrics, type AgentMetrics } from "@/mock/agent-performance"

const getStatusColor = (status: AgentMetrics["status"]) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "busy":
      return "bg-yellow-500"
    case "idle":
      return "bg-blue-500"
    case "offline":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusBadgeVariant = (status: AgentMetrics["status"]) => {
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

export function AgentHealthPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">🏥</span>
          Agent Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentMetrics.map((agent) => (
            <div key={agent.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{agent.avatar}</span>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                  <Badge variant={getStatusBadgeVariant(agent.status)} className="text-xs">
                    {agent.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Active:</span>
                  <span>{agent.lastActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tokens:</span>
                  <span>{agent.tokensUsed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requests:</span>
                  <span>{agent.requestsHandled}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency:</span>
                  <span className="font-medium">{agent.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="font-medium">{agent.uptime}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
