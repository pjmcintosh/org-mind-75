"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bot, Zap, Brain, MessageSquare, CheckCircle } from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"

interface AgentConfig {
  id: string
  name: string
  enabled: boolean
  temperature: number
  maxTokens: number
  systemPrompt: string
  tone: string
  permissions: string[]
  rateLimit: number
  priority: "low" | "medium" | "high"
  status: "active" | "inactive" | "maintenance"
}

export default function AgentSettingsPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const normalizedRole = currentRole.toLowerCase()

  const [agents, setAgents] = useState<AgentConfig[]>([
    {
      id: "bob",
      name: "Bob",
      enabled: true,
      temperature: 0.7,
      maxTokens: 2048,
      systemPrompt: "You are Bob, a strategic business analyst focused on organizational assessment and planning.",
      tone: "professional",
      permissions: ["read_projects", "create_plans", "analyze_data"],
      rateLimit: 100,
      priority: "high",
      status: "active",
    },
    {
      id: "ada",
      name: "Ada",
      enabled: true,
      temperature: 0.5,
      maxTokens: 1024,
      systemPrompt: "You are Ada, a technical implementation specialist focused on execution and delivery.",
      tone: "direct",
      permissions: ["read_projects", "execute_tasks", "generate_reports"],
      rateLimit: 150,
      priority: "high",
      status: "active",
    },
    {
      id: "max",
      name: "Max",
      enabled: true,
      temperature: 0.8,
      maxTokens: 1536,
      systemPrompt: "You are Max, a creative problem solver focused on innovation and optimization.",
      tone: "creative",
      permissions: ["read_projects", "suggest_improvements", "brainstorm"],
      rateLimit: 80,
      priority: "medium",
      status: "active",
    },
    {
      id: "eve",
      name: "Eve",
      enabled: true,
      temperature: 0.3,
      maxTokens: 512,
      systemPrompt: "You are Eve, a quality assurance specialist focused on validation and compliance.",
      tone: "analytical",
      permissions: ["read_projects", "validate_outputs", "audit_compliance"],
      rateLimit: 200,
      priority: "high",
      status: "active",
    },
    {
      id: "ephrya",
      name: "Ephrya",
      enabled: true,
      temperature: 0.6,
      maxTokens: 3072,
      systemPrompt: "You are Ephrya, the orchestration AI managing workflow coordination and decision-making.",
      tone: "balanced",
      permissions: ["full_access", "orchestrate_workflows", "make_decisions"],
      rateLimit: 50,
      priority: "high",
      status: "active",
    },
  ])

  const [selectedAgent, setSelectedAgent] = useState<string>("bob")
  const currentAgent = agents.find((a) => a.id === selectedAgent)

  const updateAgent = (id: string, updates: Partial<AgentConfig>) => {
    setAgents((prev) => prev.map((agent) => (agent.id === id ? { ...agent, ...updates } : agent)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "maintenance":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "medium":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  // Redirect non-admin users
  if (normalizedRole !== "admin") {
    router.push("/unauthorized")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <Settings className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">Agent Settings</CardTitle>
                  <CardDescription className="text-blue-300">
                    Configure agent behavior, permissions, and performance parameters
                  </CardDescription>
                </div>
              </div>
              <Badge className={`${roleInfo.color} flex items-center gap-2`}>
                <span>{roleInfo.icon}</span>
                {roleInfo.label}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Agent List */}
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAgent === agent.id
                      ? "border-cyan-500/50 bg-cyan-500/10"
                      : "border-cyan-500/20 hover:border-cyan-500/30"
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{agent.name}</span>
                    <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Badge className={getPriorityColor(agent.priority)}>{agent.priority}</Badge>
                    <span className="text-slate-400">{agent.rateLimit}/min</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Agent Configuration */}
          <div className="lg:col-span-3">
            {currentAgent && (
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    {currentAgent.name} Configuration
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    Adjust behavior, tone, and operational parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="general" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="behavior">Behavior</TabsTrigger>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-cyan-300">Agent Enabled</Label>
                            <Switch
                              checked={currentAgent.enabled}
                              onCheckedChange={(checked) => updateAgent(currentAgent.id, { enabled: checked })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-cyan-300">Status</Label>
                            <Select
                              value={currentAgent.status}
                              onValueChange={(value) => updateAgent(currentAgent.id, { status: value as any })}
                            >
                              <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-cyan-300">Priority</Label>
                            <Select
                              value={currentAgent.priority}
                              onValueChange={(value) => updateAgent(currentAgent.id, { priority: value as any })}
                            >
                              <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-cyan-300">Rate Limit (requests/min)</Label>
                            <Input
                              type="number"
                              value={currentAgent.rateLimit}
                              onChange={(e) =>
                                updateAgent(currentAgent.id, { rateLimit: Number.parseInt(e.target.value) })
                              }
                              className="bg-slate-800/50 border-cyan-500/30"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-cyan-300">Tone</Label>
                            <Select
                              value={currentAgent.tone}
                              onValueChange={(value) => updateAgent(currentAgent.id, { tone: value })}
                            >
                              <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="direct">Direct</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                                <SelectItem value="analytical">Analytical</SelectItem>
                                <SelectItem value="balanced">Balanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="behavior" className="space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-cyan-300">Temperature: {currentAgent.temperature}</Label>
                            <Slider
                              value={[currentAgent.temperature]}
                              onValueChange={([value]) => updateAgent(currentAgent.id, { temperature: value })}
                              max={1}
                              min={0}
                              step={0.1}
                              className="w-full"
                            />
                            <p className="text-xs text-slate-400">
                              Controls creativity vs consistency (0 = deterministic, 1 = creative)
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-cyan-300">Max Tokens: {currentAgent.maxTokens}</Label>
                            <Slider
                              value={[currentAgent.maxTokens]}
                              onValueChange={([value]) => updateAgent(currentAgent.id, { maxTokens: value })}
                              max={4096}
                              min={256}
                              step={256}
                              className="w-full"
                            />
                            <p className="text-xs text-slate-400">Maximum response length in tokens</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-cyan-300">System Prompt</Label>
                          <Textarea
                            value={currentAgent.systemPrompt}
                            onChange={(e) => updateAgent(currentAgent.id, { systemPrompt: e.target.value })}
                            className="bg-slate-800/50 border-cyan-500/30 min-h-[120px]"
                            placeholder="Define the agent's role and behavior..."
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="permissions" className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-cyan-300 font-medium">Available Permissions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "read_projects",
                            "create_plans",
                            "analyze_data",
                            "execute_tasks",
                            "generate_reports",
                            "suggest_improvements",
                            "brainstorm",
                            "validate_outputs",
                            "audit_compliance",
                            "full_access",
                            "orchestrate_workflows",
                            "make_decisions",
                          ].map((permission) => (
                            <div
                              key={permission}
                              className="flex items-center justify-between p-3 rounded-lg border border-cyan-500/20"
                            >
                              <span className="text-white capitalize">{permission.replace("_", " ")}</span>
                              <Switch
                                checked={currentAgent.permissions.includes(permission)}
                                onCheckedChange={(checked) => {
                                  const newPermissions = checked
                                    ? [...currentAgent.permissions, permission]
                                    : currentAgent.permissions.filter((p) => p !== permission)
                                  updateAgent(currentAgent.id, { permissions: newPermissions })
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-slate-800/30 border border-cyan-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                              <Zap className="h-4 w-4" />
                              Response Time
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">1.2s</div>
                            <p className="text-xs text-slate-400">Average response time</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-800/30 border border-cyan-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Requests Today
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">847</div>
                            <p className="text-xs text-slate-400">Total requests processed</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-slate-800/30 border border-cyan-500/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Success Rate
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold text-white">99.2%</div>
                            <p className="text-xs text-slate-400">Successful responses</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-cyan-500/20">
                    <Button variant="outline" className="border-cyan-500/30 text-cyan-300">
                      Reset to Defaults
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Save Configuration</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
