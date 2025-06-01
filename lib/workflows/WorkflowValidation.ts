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
  name: string
  description: string
  requirements: string[]
}

interface WorkflowValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export class WorkflowValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "WorkflowValidationError"
  }
}

export const validateEntityAssignment = (entity: Entity, stepType: string): void => {
  switch (stepType) {
    case "execution":
      if (entity.type !== "AGENT" && entity.type !== "ORCHESTRATOR") {
        throw new WorkflowValidationError(
          `Only Team Members and Coordinators can execute workflow tasks. ${entity.displayName} is a ${entityTypes[entity.type].label}.`,
        )
      }
      break

    case "ownership":
      if (entity.type !== "AGENT") {
        throw new WorkflowValidationError(
          `Only Team Members can own workflows. ${entity.displayName} is a ${entityTypes[entity.type].label}.`,
        )
      }
      break

    case "observation":
      if (entity.type !== "OBSERVER" && entity.type !== "AGENT") {
        throw new WorkflowValidationError(
          `Only Silent Watchers and Team Members can be assigned observation tasks. ${entity.displayName} is a ${entityTypes[entity.type].label}.`,
        )
      }
      break

    case "trigger":
      if (entity.type === "OBSERVER") {
        throw new WorkflowValidationError(
          `Silent Watchers cannot trigger workflows. ${entity.displayName} can only observe and report.`,
        )
      }
      break

    case "approval":
      if (entity.type !== "AGENT" && entity.type !== "ORCHESTRATOR") {
        throw new WorkflowValidationError(
          `Only Team Members and Coordinators can provide approvals. ${entity.displayName} is a ${entityTypes[entity.type].label}.`,
        )
      }
      break

    default:
      throw new WorkflowValidationError(`Unknown step type: ${stepType}`)
  }
}

export const validateWorkflow = (steps: WorkflowStep[], entities: Entity[]): WorkflowValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  // Check if workflow has at least one execution step
  const executionSteps = steps.filter((step) => step.type === "execution")
  if (executionSteps.length === 0) {
    errors.push("Workflow must have at least one execution step")
  }

  // Validate each step assignment
  steps.forEach((step, index) => {
    const entity = entities.find((e) => e.id === step.assignedEntityId)
    if (!entity) {
      errors.push(`Step ${index + 1}: No entity assigned`)
      return
    }

    if (!entity.isActive) {
      errors.push(`Step ${index + 1}: ${entity.displayName} is not active`)
      return
    }

    try {
      validateEntityAssignment(entity, step.type)
    } catch (error) {
      if (error instanceof WorkflowValidationError) {
        errors.push(`Step ${index + 1}: ${error.message}`)
      }
    }

    // Check for capability requirements
    if (step.requirements.length > 0) {
      const missingCapabilities = step.requirements.filter((req) => !entity.capabilities.includes(req))
      if (missingCapabilities.length > 0) {
        warnings.push(
          `Step ${index + 1}: ${entity.displayName} may not have required capabilities: ${missingCapabilities.join(", ")}`,
        )
      }
    }
  })

  // Check for workflow balance
  const agentSteps = steps.filter((step) => {
    const entity = entities.find((e) => e.id === step.assignedEntityId)
    return entity?.type === "AGENT"
  })

  const observerSteps = steps.filter((step) => {
    const entity = entities.find((e) => e.id === step.assignedEntityId)
    return entity?.type === "OBSERVER"
  })

  if (agentSteps.length === 0) {
    errors.push("Workflow must have at least one Team Member assigned")
  }

  if (observerSteps.length === 0) {
    warnings.push("Consider adding a Silent Watcher for monitoring and reporting")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export const getEntityCapabilitiesForStep = (stepType: string): string[] => {
  switch (stepType) {
    case "execution":
      return ["task_execution", "decision_making", "process_management"]
    case "observation":
      return ["monitoring", "analytics", "reporting"]
    case "trigger":
      return ["external_integration", "event_handling", "notification"]
    case "coordination":
      return ["workflow_management", "orchestration", "routing"]
    case "approval":
      return ["authorization", "review", "validation"]
    default:
      return []
  }
}

export const suggestOptimalEntity = (
  stepType: string,
  entities: Entity[],
  requiredCapabilities: string[] = [],
): Entity | null => {
  const allowedEntities = entities.filter((entity) => {
    try {
      validateEntityAssignment(entity, stepType)
      return entity.isActive
    } catch {
      return false
    }
  })

  if (allowedEntities.length === 0) return null

  // Score entities based on capability match
  const scoredEntities = allowedEntities.map((entity) => {
    const stepCapabilities = getEntityCapabilitiesForStep(stepType)
    const allRequiredCapabilities = [...stepCapabilities, ...requiredCapabilities]

    const matchingCapabilities = allRequiredCapabilities.filter((cap) => entity.capabilities.includes(cap))

    const score = matchingCapabilities.length / allRequiredCapabilities.length

    return { entity, score }
  })

  // Return entity with highest capability match
  scoredEntities.sort((a, b) => b.score - a.score)
  return scoredEntities[0]?.entity || null
}
