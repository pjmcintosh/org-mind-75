"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Save, X } from "lucide-react"
import { ConditionBuilder } from "./ConditionBuilder"
import { type WorkflowRule, type WorkflowCondition, triggerEvents, actionTypes } from "@/mock/workflow-rules"
import { allAgents } from "@/config/agents-config"

interface WorkflowEditorProps {
  isOpen: boolean
  onClose: () => void
  onSave: (workflow: WorkflowRule) => void
  workflow?: WorkflowRule
}

export function WorkflowEditor({ isOpen, onClose, onSave, workflow }: WorkflowEditorProps) {
  const [formData, setFormData] = useState<Partial<WorkflowRule>>({
    name: workflow?.name || "",
    triggerAgent: workflow?.triggerAgent || "",
    triggerEvent: workflow?.triggerEvent || "",
    actionType: workflow?.actionType || "",
    targetAgent: workflow?.targetAgent || "",
    conditions: workflow?.conditions || [],
    isActive: workflow?.isActive ?? true,
  })

  const agents = allAgents || []

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.triggerAgent ||
      !formData.triggerEvent ||
      !formData.actionType ||
      !formData.targetAgent
    ) {
      console.log("Please fill in all required fields")
      return
    }

    const workflowToSave: WorkflowRule = {
      id: workflow?.id || `wf-${Date.now()}`,
      name: formData.name!,
      triggerAgent: formData.triggerAgent!,
      triggerEvent: formData.triggerEvent!,
      actionType: formData.actionType!,
      targetAgent: formData.targetAgent!,
      conditions: formData.conditions || [],
      isActive: formData.isActive!,
      createdAt: workflow?.createdAt || new Date().toISOString(),
      lastTriggered: workflow?.lastTriggered,
    }

    onSave(workflowToSave)
    console.log(`${workflow ? "Updated" : "Created"} workflow: ${formData.name}`)
  }

  const updateField = (field: keyof WorkflowRule, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateConditions = (conditions: WorkflowCondition[]) => {
    setFormData((prev) => ({ ...prev, conditions }))
  }

  const getAgentChain = () => {
    const chain = []
    if (formData.triggerAgent) chain.push(formData.triggerAgent)
    if (formData.targetAgent && formData.targetAgent !== formData.triggerAgent) {
      chain.push(formData.targetAgent)
    }
    return chain
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{workflow ? "Edit Workflow" : "Create New Workflow"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Workflow Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter workflow name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="triggerAgent">Triggering Agent</Label>
                  <Select value={formData.triggerAgent} onValueChange={(value) => updateField("triggerAgent", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.name}>
                          {agent.name} - {agent.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="triggerEvent">Trigger Event</Label>
                  <Select value={formData.triggerEvent} onValueChange={(value) => updateField("triggerEvent", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerEvents.map((event) => (
                        <SelectItem key={event} value={event}>
                          {event}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="actionType">Action Type</Label>
                  <Select value={formData.actionType} onValueChange={(value) => updateField("actionType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map((action) => (
                        <SelectItem key={action} value={action}>
                          {action}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetAgent">Target Agent</Label>
                  <Select value={formData.targetAgent} onValueChange={(value) => updateField("targetAgent", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.name}>
                          {agent.name} - {agent.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Preview */}
          {formData.triggerAgent && formData.targetAgent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  {getAgentChain().map((agent, index) => (
                    <div key={agent} className="flex items-center gap-3">
                      <Badge variant="outline" className="px-3 py-1">
                        {agent}
                      </Badge>
                      {index < getAgentChain().length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  When <strong>{formData.triggerAgent}</strong> completes <strong>{formData.triggerEvent}</strong>, the
                  system will <strong>{formData.actionType}</strong> to <strong>{formData.targetAgent}</strong>
                  {formData.conditions && formData.conditions.length > 0 && " (if conditions are met)"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trigger Conditions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Define when this workflow should be triggered. Leave empty to trigger on every event.
              </p>
            </CardHeader>
            <CardContent>
              <ConditionBuilder conditions={formData.conditions || []} onChange={updateConditions} />
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {workflow ? "Update" : "Create"} Workflow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
