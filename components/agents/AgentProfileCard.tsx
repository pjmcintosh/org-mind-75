import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Eye, Link, Network, Star } from "lucide-react"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"
import { humanLabels } from "@/lib/constants/humanLabels"

interface AgentProfileCardProps {
  agent: {
    id: string
    name: string
    type: EntityType
    role: string
    description: string
    status: "active" | "inactive" | "pending"
    avatar?: string
  }
}

export function AgentProfileCard({ agent }: AgentProfileCardProps) {
  const entityType = entityTypes[agent.type]

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case "AGENT":
        return <Users className="h-4 w-4" />
      case "OBSERVER":
        return <Eye className="h-4 w-4" />
      case "PARTNER":
        return <Link className="h-4 w-4" />
      case "ORCHESTRATOR":
        return <Network className="h-4 w-4" />
      case "SPECIALIST":
        return <Star className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getEntityBadgeColor = (type: EntityType) => {
    const color = entityTypes[type].color
    switch (color) {
      case "cyan":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "yellow":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "green":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "purple":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "blue":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  // Get avatar path
  const getAvatarPath = (agentId: string) => {
    return `/${agentId}-avatar.png`
  }

  return (
    <Card className="bg-slate-800/50 border-slate-600 hover:border-cyan-500/50 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-700 relative">
              <img
                src={getAvatarPath(agent.id) || "/placeholder.svg"}
                alt={`${agent.name} avatar`}
                className="w-full h-full object-cover object-center"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `
          <div class="w-full h-full bg-slate-700 flex items-center justify-center">
            <span class="text-slate-400 text-lg font-semibold">${agent.name.charAt(0)}</span>
          </div>
        `
                  }
                }}
              />
            </div>
            <div>
              <CardTitle className="text-lg text-cyan-400">{agent.name}</CardTitle>
              <CardDescription className="text-blue-300 text-sm">{agent.role}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusBadgeColor(agent.status)}>
            {humanLabels.getLabel(`status.${agent.status}`) || agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className={getEntityBadgeColor(agent.type)}>
            {getEntityIcon(agent.type)}
            <span className="ml-1">{entityType.label}</span>
          </Badge>
        </div>
        <p className="text-sm text-gray-400">{entityType.description}</p>
        <p className="text-sm text-gray-300">{agent.description}</p>
      </CardContent>
    </Card>
  )
}
