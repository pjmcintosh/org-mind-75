"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ModelAccess {
  internetAccess: boolean
  internalModels: boolean
  externalModels: boolean
  externalModel: string
}

interface Agent {
  id: string
  name: string
  role: string
  avatar?: string
  department: string
}

interface AgentModelAccessCardProps {
  agent: Agent
  access: ModelAccess
  onUpdateAccess: (field: keyof ModelAccess, value: boolean | string) => void
}

const externalModels = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "gemini", label: "Gemini" },
]

export function AgentModelAccessCard({ agent, access, onUpdateAccess }: AgentModelAccessCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-base">{agent.name}</CardTitle>
            <Badge variant="outline" className="text-xs">
              {agent.role}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Internet Access */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Internet Access</label>
            <p className="text-xs text-muted-foreground">Web connectivity</p>
          </div>
          <Switch
            checked={access.internetAccess}
            onCheckedChange={(checked) => onUpdateAccess("internetAccess", checked)}
          />
        </div>

        {/* Internal Models */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Internal Models</label>
            <p className="text-xs text-muted-foreground">Company AI models</p>
          </div>
          <Switch
            checked={access.internalModels}
            onCheckedChange={(checked) => onUpdateAccess("internalModels", checked)}
          />
        </div>

        {/* External Models */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">External Models</label>
            <p className="text-xs text-muted-foreground">Third-party AI</p>
          </div>
          <Switch
            checked={access.externalModels}
            onCheckedChange={(checked) => onUpdateAccess("externalModels", checked)}
          />
        </div>

        {/* External Model Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium">External Model</label>
          <Select
            value={access.externalModel}
            onValueChange={(value) => onUpdateAccess("externalModel", value)}
            disabled={!access.externalModels}
          >
            <SelectTrigger className={!access.externalModels ? "opacity-50" : ""}>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {externalModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
