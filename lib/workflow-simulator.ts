export interface SimulationStep {
  id: string
  type: "rule_evaluation" | "agent_assignment" | "ephrya_fallback" | "error"
  status: "success" | "failure" | "fallback"
  agent?: string
  action?: string
  reasoning: string
  timestamp: string
  duration: number
  metadata?: Record<string, any>
}

export interface SimulationResult {
  id: string
  workflowId?: string
  triggerAgent: string
  triggerEvent: string
  mockConditions: Record<string, any>
  steps: SimulationStep[]
  totalDuration: number
  success: boolean
  finalAgent?: string
  ephryaFallbackUsed: boolean
}

export interface MockConditions {
  tokenUsage?: number
  projectBudget?: number
  agentStatus?: string
  taskDuration?: number
  confidenceScore?: number
  errorRate?: number
  costPerToken?: number
  requestCount?: number
  [key: string]: any
}

export function simulateWorkflow(
  workflows: any[],
  triggerAgent: string,
  triggerEvent: string,
  mockConditions: MockConditions,
  selectedWorkflowId?: string,
): SimulationResult {
  const startTime = Date.now()
  const steps: SimulationStep[] = []

  // Find matching workflows
  const matchingWorkflows = workflows.filter(
    (w) =>
      w.isActive &&
      w.triggerAgent === triggerAgent &&
      w.triggerEvent === triggerEvent &&
      (!selectedWorkflowId || w.id === selectedWorkflowId),
  )

  if (matchingWorkflows.length === 0) {
    // No matching workflow - use Ephrya fallback
    const fallbackStep: SimulationStep = {
      id: `step-${Date.now()}`,
      type: "ephrya_fallback",
      status: "fallback",
      reasoning: `No workflow rule found for ${triggerAgent} → ${triggerEvent}. Ephrya evaluating fallback options.`,
      timestamp: new Date().toISOString(),
      duration: 150,
    }

    // Simulate Ephrya's decision logic
    const ephryaDecision = getEphryaFallbackDecision(triggerAgent, triggerEvent, mockConditions)
    fallbackStep.agent = ephryaDecision.recommendedAgent
    fallbackStep.action = ephryaDecision.action
    fallbackStep.reasoning += ` Recommended: ${ephryaDecision.recommendedAgent} for ${ephryaDecision.action}`

    steps.push(fallbackStep)

    return {
      id: `sim-${Date.now()}`,
      triggerAgent,
      triggerEvent,
      mockConditions,
      steps,
      totalDuration: Date.now() - startTime,
      success: true,
      finalAgent: ephryaDecision.recommendedAgent,
      ephryaFallbackUsed: true,
    }
  }

  // Evaluate each matching workflow
  for (const workflow of matchingWorkflows) {
    const evaluationStep: SimulationStep = {
      id: `step-${Date.now()}-${workflow.id}`,
      type: "rule_evaluation",
      status: "success",
      reasoning: `Evaluating workflow: ${workflow.name}`,
      timestamp: new Date().toISOString(),
      duration: 50,
    }

    // Check conditions
    const conditionsMet = evaluateConditions(workflow.conditions, mockConditions)

    if (conditionsMet.success) {
      evaluationStep.status = "success"
      evaluationStep.reasoning += ` - All conditions met`

      // Add assignment step
      const assignmentStep: SimulationStep = {
        id: `step-${Date.now()}-assignment`,
        type: "agent_assignment",
        status: "success",
        agent: workflow.targetAgent,
        action: workflow.actionType,
        reasoning: `Assigned ${workflow.targetAgent} to perform ${workflow.actionType}`,
        timestamp: new Date().toISOString(),
        duration: 100,
        metadata: { workflowId: workflow.id, workflowName: workflow.name },
      }

      steps.push(evaluationStep, assignmentStep)

      return {
        id: `sim-${Date.now()}`,
        workflowId: workflow.id,
        triggerAgent,
        triggerEvent,
        mockConditions,
        steps,
        totalDuration: Date.now() - startTime,
        success: true,
        finalAgent: workflow.targetAgent,
        ephryaFallbackUsed: false,
      }
    } else {
      evaluationStep.status = "failure"
      evaluationStep.reasoning += ` - Conditions not met: ${conditionsMet.failedConditions.join(", ")}`
      steps.push(evaluationStep)
    }
  }

  // If no workflows matched conditions, use Ephrya fallback
  const fallbackStep: SimulationStep = {
    id: `step-${Date.now()}-fallback`,
    type: "ephrya_fallback",
    status: "fallback",
    reasoning: "No workflow conditions met. Using Ephrya intelligent fallback.",
    timestamp: new Date().toISOString(),
    duration: 200,
  }

  const ephryaDecision = getEphryaFallbackDecision(triggerAgent, triggerEvent, mockConditions)
  fallbackStep.agent = ephryaDecision.recommendedAgent
  fallbackStep.action = ephryaDecision.action
  fallbackStep.reasoning += ` Recommended: ${ephryaDecision.recommendedAgent}`

  steps.push(fallbackStep)

  return {
    id: `sim-${Date.now()}`,
    triggerAgent,
    triggerEvent,
    mockConditions,
    steps,
    totalDuration: Date.now() - startTime,
    success: true,
    finalAgent: ephryaDecision.recommendedAgent,
    ephryaFallbackUsed: true,
  }
}

function evaluateConditions(conditions: any[], mockConditions: MockConditions) {
  const failedConditions: string[] = []

  for (const condition of conditions) {
    const value = mockConditions[condition.metric]
    const conditionValue = Number.parseFloat(condition.value) || condition.value

    let conditionMet = false

    switch (condition.comparator) {
      case ">":
        conditionMet = value > conditionValue
        break
      case "<":
        conditionMet = value < conditionValue
        break
      case ">=":
        conditionMet = value >= conditionValue
        break
      case "<=":
        conditionMet = value <= conditionValue
        break
      case "=":
        conditionMet = value == conditionValue
        break
      case "!=":
        conditionMet = value != conditionValue
        break
      default:
        conditionMet = false
    }

    if (!conditionMet) {
      failedConditions.push(`${condition.metric} ${condition.comparator} ${condition.value}`)
    }
  }

  return {
    success: failedConditions.length === 0,
    failedConditions,
  }
}

function getEphryaFallbackDecision(triggerAgent: string, triggerEvent: string, mockConditions: MockConditions) {
  // Simulate Ephrya's intelligent decision making
  const budget = mockConditions.projectBudget || 0
  const tokenUsage = mockConditions.tokenUsage || 0
  const agentStatus = mockConditions.agentStatus || "online"

  // Budget-based decisions
  if (budget > 50000) {
    return {
      recommendedAgent: "Janet",
      action: "Financial Review",
      reasoning: "High budget project requires financial validation",
    }
  }

  // Token usage decisions
  if (tokenUsage > 10000) {
    return {
      recommendedAgent: "Eve",
      action: "Usage Review",
      reasoning: "High token usage requires system oversight",
    }
  }

  // Task type based decisions
  if (triggerEvent.includes("Legal") || triggerEvent.includes("Contract")) {
    return {
      recommendedAgent: "OpenAI Legal",
      action: "Legal Review",
      reasoning: "Legal-related tasks require specialized review",
    }
  }

  if (triggerEvent.includes("Strategic") || triggerEvent.includes("Plan")) {
    return {
      recommendedAgent: "Ada",
      action: "Strategic Analysis",
      reasoning: "Strategic tasks require planning expertise",
    }
  }

  if (triggerEvent.includes("Technical") || triggerEvent.includes("Prompt")) {
    return {
      recommendedAgent: "Max",
      action: "Technical Review",
      reasoning: "Technical tasks require engineering expertise",
    }
  }

  // Default fallback
  return {
    recommendedAgent: "Ephrya",
    action: "Coordination",
    reasoning: "Default coordination and routing",
  }
}
