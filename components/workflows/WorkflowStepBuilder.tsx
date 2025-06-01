"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Plus, AlertTriangle, CheckCircle, Users, Eye, Link } from "lucide-react"
import WorkflowRoleSelector from "./WorkflowRoleSelector"
import { validateWorkflow } from "@/lib/workflows/WorkflowValidation"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"

interface Entity {
  id: string
  displayName: string
  type: EntityType
  isActive: boolean
  capabilities: string[]
}

interface WorkflowStep {
  id: string
  type: "execution" | "observation" | "trigger" | "coordination" | "approval"
  assignedEntityId: string
  assignedEntity?: Entity
  name: string
  description: string
  requirements: string[]
}

const stepTypes = [
  { value: "execution", label: "Execution", description: "Perform a task or make a decision" },
  { value: "observation", label: "Observation", description: "Monitor activity and report insights" },
  { value: "trigger", label: "Trigger", description: "Initiate or activate a process" },
  { value: "coordination", label: "Coordination", description: "Manage workflow sequence" },
  { value: "approval", label: "Approval", description: "Review and authorize actions" },
]

const mockEntities: Entity[] = [
  {
    id: "ada-001",
    displayName: "Ada",
    type: "AGENT",
    isActive: true,
    capabilities: ["project_management", "task_execution", "decision_making"],
  },
  {
    id: "janet-001",
    displayName: "Janet",
    type: "AGENT",
    isActive: true,
    capabilities: ["financial_analysis", "budget_management", "cost_optimization"],
  },
  {
    id: "eve-001",
    displayName: "Eve",
    type: "OBSERVER",
    isActive: true,
    capabilities: ["performance_monitoring", "analytics", "reporting"],
  },
]

export default function WorkflowStepBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    errors: string[]
    warnings: string[]
  } | null>(null)

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: "execution",
      assignedEntityId: "",
      name: "",
      description: "",
      requirements: [],
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
  }

  const handleEntitySelect = (stepId: string, entityId: string, entity: Entity) => {
    updateStep(stepId, {
      assignedEntityId: entityId,
      assignedEntity: entity,
    })
  }

  const validateWorkflowSteps = () => {
    const result = validateWorkflow(steps, mockEntities)
    setValidationResult(result)
  }

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case "execution":
        return "blue"
      case "observation":
        return "yellow"
      case "trigger":
        return "green"
      case "coordination":
        return "purple"
      case "approval":
        return "orange"
      default:
        return "gray"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Workflow Step Builder</CardTitle>
          <CardDescription className="text-blue-300">
            Design your workflow by adding steps and assigning them to appropriate team members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={addStep} className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>

          {steps.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No steps added yet. Click "Add Step" to get started.</p>
            </div>
          )}

          {steps.map((step, index) => (
            <Card key={step.id} className="bg-slate-800/30 border border-slate-600/30">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">
                    Step {index + 1}
                    {step.name && `: ${step.name}`}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`bg-${getStepTypeColor(step.type)}-500/20 text-${getStepTypeColor(step.type)}-400`}
                    >
                      {step.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStep(step.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-cyan-300">Step Type</Label>
                    <Select value={step.type} onValueChange={(value) => updateStep(step.id, { type: value as any })}>
                      <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {stepTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-slate-400">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cyan-300">Step Name</Label>
                    <Input
                      value={step.name}
                      onChange={(e) => updateStep(step.id, { name: e.target.value })}
                      placeholder="Enter step name..."
                      className="bg-slate-800/50 border-cyan-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-cyan-300">Description</Label>
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateStep(step.id, { description: e.target.value })}
                    placeholder="Describe what this step does..."
                    className="bg-slate-800/50 border-cyan-500/30"
                    rows={2}
                  />
                </div>

                <WorkflowRoleSelector
                  selectedEntityId={step.assignedEntityId}
                  onEntitySelect={(entityId, entity) => handleEntitySelect(step.id, entityId, entity)}
                  workflowType={step.type}
                  showHints={true}
                />

                {step.assignedEntity && (
                  <div className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className={`bg-${entityTypes[step.assignedEntity.type].color}-500/20 text-${entityTypes[step.assignedEntity.type].color}-400`}
                      >
                        {entityTypes[step.assignedEntity.type].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">
                      <strong>Capabilities:</strong> {step.assignedEntity.capabilities.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {steps.length > 0 && (
            <div className="flex gap-4">
              <Button onClick={validateWorkflowSteps} variant="outline" className="border-cyan-500/30">
                Validate Workflow
              </Button>
            </div>
          )}

          {validationResult && (
            <div className="space-y-2">
              {validationResult.errors.length > 0 && (
                <Alert className="bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-300">
                    <strong>Validation Errors:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {validationResult.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {validationResult.warnings.length > 0 && (
                <Alert className="bg-yellow-500/10 border border-yellow-500/20">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-yellow-300">
                    <strong>Warnings:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {validationResult.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {validationResult.isValid && validationResult.errors.length === 0 && (
                <Alert className="bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-300">
                    <strong>Workflow is valid!</strong> All entity assignments are appropriate for their roles.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Workflow Legend */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">Entity Role Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                <strong className="text-cyan-400">Team Members</strong>
              </div>
              <p className="text-slate-300">Can execute tasks, make decisions, and own workflows</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-yellow-400" />
                <strong className="text-yellow-400">Silent Watchers</strong>
              </div>
              <p className="text-slate-300">Monitor activity and generate reports, cannot execute</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-green-400" />
                <strong className="text-green-400">Outside Collaborators</strong>
              </div>
              <p className="text-slate-300">Work through secure integrations with scoped access</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
