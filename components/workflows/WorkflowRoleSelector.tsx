"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"
import { Users, Eye, Link, Network, Star, AlertTriangle } from "lucide-react"

interface Entity {
  id: string
  displayName: string
  type: EntityType
  isActive: boolean
  capabilities: string[]
}

interface WorkflowRoleSelectorProps {
  label?: string
  selectedEntityId?: string
  onEntitySelect: (entityId: string, entity: Entity) => void
  workflowType?: "execution" | "observation" | "trigger" | "coordination"
  disabled?: boolean
  showHints?: boolean
}

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
    id: "lexi-001",
    displayName: "Lexi",
    type: "AGENT",
    isActive: true,
    capabilities: ["compliance_monitoring", "policy_enforcement", "risk_assessment"],
  },
  {
    id: "erik-001",
    displayName: "Erik",
    type: "AGENT",
    isActive: true,
    capabilities: ["security_monitoring", "threat_detection", "incident_response"],
  },
  {
    id: "eve-001",
    displayName: "Eve",
    type: "OBSERVER",
    isActive: true,
    capabilities: ["performance_monitoring", "analytics", "reporting"],
  },
  {
    id: "external-api-001",
    displayName: "External API Gateway",
    type: "PARTNER",
    isActive: true,
    capabilities: ["data_integration", "external_triggers", "scoped_access"],
  },
  {
    id: "ephrya-001",
    displayName: "Ephrya",
    type: "ORCHESTRATOR",
    isActive: true,
    capabilities: ["workflow_coordination", "decision_routing", "process_management"],
  },
]

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

const getEntityColor = (type: EntityType) => {
  return entityTypes[type]?.color || "gray"
}

const isEntityAllowedForWorkflowType = (entity: Entity, workflowType?: string) => {
  switch (workflowType) {
    case "execution":
      return entity.type === "AGENT" || entity.type === "ORCHESTRATOR"
    case "observation":
      return entity.type === "OBSERVER" || entity.type === "AGENT"
    case "trigger":
      return entity.type === "PARTNER" || entity.type === "AGENT"
    case "coordination":
      return entity.type === "ORCHESTRATOR" || entity.type === "AGENT"
    default:
      return entity.type === "AGENT" // Default: only agents can be assigned
  }
}

export default function WorkflowRoleSelector({
  label = "Assign To",
  selectedEntityId,
  onEntitySelect,
  workflowType = "execution",
  disabled = false,
  showHints = true,
}: WorkflowRoleSelectorProps) {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(
    selectedEntityId ? mockEntities.find((e) => e.id === selectedEntityId) || null : null,
  )

  const handleEntitySelect = (entityId: string) => {
    const entity = mockEntities.find((e) => e.id === entityId)
    if (entity) {
      setSelectedEntity(entity)
      onEntitySelect(entityId, entity)
    }
  }

  const allowedEntities = mockEntities.filter(
    (entity) => entity.isActive && isEntityAllowedForWorkflowType(entity, workflowType),
  )

  const disallowedEntities = mockEntities.filter(
    (entity) => entity.isActive && !isEntityAllowedForWorkflowType(entity, workflowType),
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-cyan-300">{label}</Label>
        <Select value={selectedEntityId} onValueChange={handleEntitySelect} disabled={disabled}>
          <SelectTrigger className="bg-slate-800/50 border-cyan-500/30">
            <SelectValue placeholder="Select a team member..." />
          </SelectTrigger>
          <SelectContent>
            {/* Allowed entities */}
            {allowedEntities.map((entity) => (
              <SelectItem key={entity.id} value={entity.id}>
                <div className="flex items-center gap-2">
                  {getEntityIcon(entity.type)}
                  <span>{entity.displayName}</span>
                  <Badge
                    className={`bg-${getEntityColor(entity.type)}-500/20 text-${getEntityColor(entity.type)}-400 border-${getEntityColor(entity.type)}-400/30`}
                  >
                    {entityTypes[entity.type].label}
                  </Badge>
                </div>
              </SelectItem>
            ))}

            {/* Disabled entities with explanation */}
            {disallowedEntities.length > 0 && (
              <>
                <div className="px-2 py-1 text-xs text-slate-400 border-t border-slate-600 mt-1">
                  Not available for {workflowType}:
                </div>
                {disallowedEntities.map((entity) => (
                  <SelectItem key={entity.id} value={entity.id} disabled>
                    <div className="flex items-center gap-2 opacity-50">
                      {getEntityIcon(entity.type)}
                      <span>{entity.displayName}</span>
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-400/30">
                        {entityTypes[entity.type].label}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Contextual hints based on selected entity */}
      {selectedEntity && showHints && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              className={`bg-${getEntityColor(selectedEntity.type)}-500/20 text-${getEntityColor(selectedEntity.type)}-400 border-${getEntityColor(selectedEntity.type)}-400/30`}
            >
              {getEntityIcon(selectedEntity.type)}
              <span className="ml-1">{entityTypes[selectedEntity.type].label}</span>
            </Badge>
          </div>
          <p className="text-sm text-blue-400">{entityTypes[selectedEntity.type].description}</p>

          {/* Step preview */}
          <div className="bg-slate-800/30 border border-slate-600/30 rounded-lg p-3">
            <p className="text-sm text-slate-300">
              <strong>Step Preview:</strong> {selectedEntity.displayName} ({entityTypes[selectedEntity.type].label})
              will handle this step
            </p>
          </div>
        </div>
      )}

      {/* Workflow type restrictions */}
      {workflowType === "execution" && (
        <Alert className="bg-blue-500/10 border border-blue-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            <strong>Execution Step:</strong> Only Team Members and Coordinators can execute workflow tasks.
          </AlertDescription>
        </Alert>
      )}

      {workflowType === "observation" && (
        <Alert className="bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-yellow-300">
            <strong>Observation Step:</strong> Silent Watchers and Team Members can monitor this activity.
          </AlertDescription>
        </Alert>
      )}

      {workflowType === "trigger" && (
        <Alert className="bg-green-500/10 border border-green-500/20">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-green-300">
            <strong>Trigger Step:</strong> Outside Collaborators and Team Members can initiate this workflow.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
