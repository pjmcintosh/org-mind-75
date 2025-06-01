"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw } from "lucide-react"
import { simulateWorkflow, type MockConditions, type SimulationResult } from "@/lib/workflow-simulator"
import { SimulationResults } from "./SimulationResults"

interface WorkflowSimulatorProps {
  isOpen: boolean
  onClose: () => void
  workflows: any[]
  selectedWorkflow?: any
}

const AGENTS = ["Ephrya", "Ada", "Max", "Eve", "Bob", "Janet", "Shandry", "OpenAI Legal"]

const TRIGGER_EVENTS = [
  "Task Complete",
  "Approval Granted",
  "Flag Raised",
  "Document Generated",
  "Budget Threshold Reached",
  "Error Detected",
  "Client Request",
  "System Alert",
]

const CONDITION_PRESETS = {
  "High Token Usage": {
    tokenUsage: 12000,
    costPerToken: 0.015,
    requestCount: 500,
  },
  "Large Budget Project": {
    projectBudget: 75000,
    budgetRemaining: 25000,
    taskDuration: 7200,
  },
  "Agent Overload": {
    agentStatus: "busy",
    requestCount: 1000,
    errorRate: 0.15,
  },
  "High Quality Output": {
    confidenceScore: 0.95,
    successRate: 0.98,
    responseTime: 150,
  },
}

export function WorkflowSimulator({ isOpen, onClose, workflows, selectedWorkflow }: WorkflowSimulatorProps) {
  const [triggerAgent, setTriggerAgent] = useState<string>("")
  const [triggerEvent, setTriggerEvent] = useState<string>("")
  const [mockConditions, setMockConditions] = useState<MockConditions>({})
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleConditionChange = (key: string, value: string) => {
    const numericValue = Number.parseFloat(value)
    setMockConditions((prev) => ({
      ...prev,
      [key]: isNaN(numericValue) ? value : numericValue,
    }))
  }

  const applyPreset = (presetName: string) => {
    const preset = CONDITION_PRESETS[presetName as keyof typeof CONDITION_PRESETS]
    if (preset) {
      setMockConditions(preset)
    }
  }

  const runSimulation = async () => {
    if (!triggerAgent || !triggerEvent) {
      alert("Please select a trigger agent and event")
      return
    }

    setIsSimulating(true)
    console.log(`Running workflow simulation: ${triggerAgent} → ${triggerEvent}`)

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = simulateWorkflow(workflows, triggerAgent, triggerEvent, mockConditions, selectedWorkflow?.id)

    setSimulationResult(result)
    setIsSimulating(false)

    console.log("Simulation completed:", result)
  }

  const resetSimulation = () => {
    setSimulationResult(null)
    setTriggerAgent("")
    setTriggerEvent("")
    setMockConditions({})
  }

  const handleTestAgain = () => {
    setSimulationResult(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Workflow Simulator
            {selectedWorkflow && <Badge variant="outline">Testing: {selectedWorkflow.name}</Badge>}
          </DialogTitle>
        </DialogHeader>

        {!simulationResult ? (
          <div className="space-y-6">
            {/* Simulation Setup */}
            <Card>
              <CardHeader>
                <CardTitle>Simulation Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="triggerAgent">Triggering Agent</Label>
                    <Select value={triggerAgent} onValueChange={setTriggerAgent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGENTS.map((agent) => (
                          <SelectItem key={agent} value={agent}>
                            {agent}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="triggerEvent">Trigger Event</Label>
                    <Select value={triggerEvent} onValueChange={setTriggerEvent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRIGGER_EVENTS.map((event) => (
                          <SelectItem key={event} value={event}>
                            {event}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mock Conditions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Mock Conditions</CardTitle>
                  <div className="flex gap-2">
                    {Object.keys(CONDITION_PRESETS).map((preset) => (
                      <Button key={preset} variant="outline" size="sm" onClick={() => applyPreset(preset)}>
                        {preset}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tokenUsage">Token Usage</Label>
                    <Input
                      id="tokenUsage"
                      type="number"
                      placeholder="e.g., 12000"
                      value={mockConditions.tokenUsage || ""}
                      onChange={(e) => handleConditionChange("tokenUsage", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectBudget">Project Budget</Label>
                    <Input
                      id="projectBudget"
                      type="number"
                      placeholder="e.g., 75000"
                      value={mockConditions.projectBudget || ""}
                      onChange={(e) => handleConditionChange("projectBudget", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agentStatus">Agent Status</Label>
                    <Select
                      value={mockConditions.agentStatus || ""}
                      onValueChange={(value) => handleConditionChange("agentStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="taskDuration">Task Duration (seconds)</Label>
                    <Input
                      id="taskDuration"
                      type="number"
                      placeholder="e.g., 3600"
                      value={mockConditions.taskDuration || ""}
                      onChange={(e) => handleConditionChange("taskDuration", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confidenceScore">Confidence Score</Label>
                    <Input
                      id="confidenceScore"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="e.g., 0.95"
                      value={mockConditions.confidenceScore || ""}
                      onChange={(e) => handleConditionChange("confidenceScore", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="errorRate">Error Rate</Label>
                    <Input
                      id="errorRate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="e.g., 0.05"
                      value={mockConditions.errorRate || ""}
                      onChange={(e) => handleConditionChange("errorRate", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetSimulation}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={runSimulation} disabled={isSimulating}>
                <Play className="h-4 w-4 mr-2" />
                {isSimulating ? "Running Simulation..." : "Start Simulation"}
              </Button>
            </div>
          </div>
        ) : (
          <SimulationResults result={simulationResult} onTestAgain={handleTestAgain} />
        )}
      </DialogContent>
    </Dialog>
  )
}
