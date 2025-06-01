"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AgentModelAccessCard } from "./AgentModelAccessCard"
import { allAgents } from "@/config/agents-config"

console.log("Loaded: ModelAccessGrid")

interface ModelAccess {
  internetAccess: boolean
  internalModels: boolean
  externalModels: boolean
  externalModel: string
}

export function ModelAccessGrid() {
  const [agentAccess, setAgentAccess] = useState<Record<string, ModelAccess>>(() => {
    const initialAccess: Record<string, ModelAccess> = {}
    allAgents.forEach((agent) => {
      initialAccess[agent.id] = {
        internetAccess: agent.id === "max" || agent.id === "eve", // Default some agents to have internet
        internalModels: true, // All agents have internal access by default
        externalModels: agent.id === "ada" || agent.id === "max", // Only some have external by default
        externalModel: "chatgpt",
      }
    })
    return initialAccess
  })

  const updateAgentAccess = (agentId: string, field: keyof ModelAccess, value: boolean | string) => {
    setAgentAccess((prev) => ({
      ...prev,
      [agentId]: {
        ...prev[agentId],
        [field]: value,
      },
    }))

    const agent = allAgents.find((a) => a.id === agentId)
    if (field === "externalModel") {
      console.log(`Agent [${agent?.name}] External Model: ${value}`)
    } else {
      const status = value ? "Enabled" : "Disabled"
      const fieldName =
        field === "internetAccess"
          ? "Internet Access"
          : field === "internalModels"
            ? "Internal Models"
            : "External Models"
      console.log(`Agent [${agent?.name}] ${fieldName}: ${status}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🧠 AI Access Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allAgents.map((agent) => (
            <AgentModelAccessCard
              key={agent.id}
              agent={agent}
              access={agentAccess[agent.id]}
              onUpdateAccess={(field, value) => updateAgentAccess(agent.id, field, value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
