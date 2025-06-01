"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Layers3, CheckCircle } from "lucide-react"

interface AgentCapabilityPanelProps {
  capabilities: string[]
  systemsImpacted?: string[]
  collaborations?: string[]
}

export default function AgentCapabilityPanel({
  capabilities,
  systemsImpacted = [],
  collaborations = [],
}: AgentCapabilityPanelProps) {
  console.log("Loaded: AgentCapabilityPanel")

  const getSystemBadgeColor = (system: string) => {
    const colorMap: Record<string, string> = {
      Budget: "border-green-500/50 text-green-400",
      Finance: "border-green-500/50 text-green-400",
      Intake: "border-blue-500/50 text-blue-400",
      Legal: "border-purple-500/50 text-purple-400",
      HR: "border-emerald-500/50 text-emerald-400",
      "Approval Queue": "border-yellow-500/50 text-yellow-400",
      Monitoring: "border-red-500/50 text-red-400",
      Documentation: "border-indigo-500/50 text-indigo-400",
      Workflow: "border-orange-500/50 text-orange-400",
    }
    return colorMap[system] || "border-cyan-500/50 text-cyan-400"
  }

  const getCollaborationBadgeColor = (agent: string) => {
    const colorMap: Record<string, string> = {
      Ada: "border-violet-500/50 text-violet-400",
      Bob: "border-blue-500/50 text-blue-400",
      Ephrya: "border-cyan-500/50 text-cyan-400",
      Eve: "border-red-500/50 text-red-400",
      Janet: "border-green-500/50 text-green-400",
      Max: "border-orange-500/50 text-orange-400",
      Shandry: "border-pink-500/50 text-pink-400",
      "OpenAI Legal": "border-purple-500/50 text-purple-400",
      Jason: "border-teal-500/50 text-teal-400",
    }
    return colorMap[agent] || "border-gray-500/50 text-gray-400"
  }

  return (
    <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 text-lg font-semibold">Agent Capabilities & System Integration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Capabilities */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-cyan-400" />
            <h3 className="text-cyan-400 font-medium">Primary Capabilities</h3>
          </div>
          <ul className="space-y-2 ml-6">
            {capabilities.map((capability, index) => (
              <li key={index} className="text-white text-sm flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Systems Impacted */}
        {systemsImpacted.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-cyan-400" />
              <h3 className="text-cyan-400 font-medium">Systems Impacted</h3>
            </div>
            <div className="flex flex-wrap gap-2 ml-6">
              {systemsImpacted.map((system, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${getSystemBadgeColor(system)} bg-transparent border text-xs`}
                >
                  {system}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Collaborations */}
        {collaborations.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" />
              <h3 className="text-cyan-400 font-medium">Collaborates With</h3>
            </div>
            <div className="flex flex-wrap gap-2 ml-6">
              {collaborations.map((agent, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`${getCollaborationBadgeColor(agent)} bg-transparent border text-xs`}
                >
                  {agent}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
