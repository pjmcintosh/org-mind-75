import type { ExternalAgent } from "@/config/agents-config"
import { externalProviders } from "@/config/agents-config"

export interface ExternalAgentConfig {
  name: string
  title: string
  department: string
  accessLevel: string
  source: keyof typeof externalProviders
  capabilities: string[]
  apiEndpoint?: string
  credentials?: {
    apiKey?: string
    endpoint?: string
    model?: string
  }
  description: string
}

export interface AgentOnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

export interface CostEstimate {
  monthly: number
  perRequest: number
  requestsPerMonth: number
  provider: string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Cost estimation function
export function estimateProviderCost(providerId: string, capabilities: string[]): CostEstimate {
  const baseCosts = {
    openai: 0.02,
    microsoft: 0.015,
    google: 0.01,
    aws: 0.012,
    anthropic: 0.018,
    custom: 0.005,
  }

  const baseRequestsPerMonth = 10000
  const capabilityMultiplier = Math.max(1, capabilities.length * 0.2)
  const perRequest = (baseCosts[providerId as keyof typeof baseCosts] || 0.01) * capabilityMultiplier
  const requestsPerMonth = baseRequestsPerMonth * capabilityMultiplier
  const monthly = perRequest * requestsPerMonth

  return {
    monthly,
    perRequest,
    requestsPerMonth: Math.round(requestsPerMonth),
    provider: providerId,
  }
}

// Validation function
export function validateExternalAgentConfig(config: any): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Required field validation
  if (!config.name?.trim()) errors.push("Agent name is required")
  if (!config.title?.trim()) errors.push("Agent title is required")
  if (!config.department?.trim()) errors.push("Department is required")
  if (!config.accessLevel?.trim()) errors.push("Access level is required")
  if (!config.capabilities?.length) errors.push("At least one capability is required")

  // Provider validation
  if (!config.provider && !config.source) {
    errors.push("Provider or source is required")
  }

  // Credentials validation (mock)
  if (config.source === "OpenAI" && !config.config?.apiKey) {
    warnings.push("OpenAI API key not provided - agent will use demo mode")
  }

  if (config.source === "Microsoft" && !config.config?.endpoint) {
    warnings.push("Microsoft endpoint not configured - using default")
  }

  // Capability validation
  if (config.capabilities?.length > 10) {
    warnings.push("Large number of capabilities may impact performance")
  }

  console.log(`External agent validation completed: ${errors.length} errors, ${warnings.length} warnings`)

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export class ExternalAgentManager {
  private static instance: ExternalAgentManager
  private agents: ExternalAgent[] = []

  static getInstance(): ExternalAgentManager {
    if (!ExternalAgentManager.instance) {
      ExternalAgentManager.instance = new ExternalAgentManager()
    }
    return ExternalAgentManager.instance
  }

  async validateAgentConfig(config: ExternalAgentConfig): Promise<ValidationResult> {
    const errors: string[] = []
    const warnings: string[] = []

    // Required field validation
    if (!config.name?.trim()) errors.push("Agent name is required")
    if (!config.title?.trim()) errors.push("Agent title is required")
    if (!config.department?.trim()) errors.push("Department is required")
    if (!config.accessLevel?.trim()) errors.push("Access level is required")
    if (!config.description?.trim()) errors.push("Description is required")
    if (!config.capabilities?.length) errors.push("At least one capability is required")

    // Provider validation
    const providerKeys = Object.keys(externalProviders)
    if (!providerKeys.includes(config.source)) {
      errors.push("Invalid provider selected")
    }

    // Credentials validation (mock)
    if (config.source === "openai" && !config.credentials?.apiKey) {
      warnings.push("OpenAI API key not provided - agent will use demo mode")
    }

    // Simulate API validation
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`External agent validation completed: ${errors.length} errors, ${warnings.length} warnings`)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    }
  }

  async onboardAgent(config: ExternalAgentConfig): Promise<ExternalAgent> {
    const validation = await this.validateAgentConfig(config)
    if (!validation.isValid) {
      throw new Error(`Agent validation failed: ${validation.errors.join(", ")}`)
    }

    const agentId = `${config.source.toLowerCase()}-${config.name.toLowerCase().replace(/\s+/g, "-")}`
    const route = `/admin/${agentId}`

    const newAgent: ExternalAgent = {
      id: agentId,
      name: config.name,
      title: config.title,
      avatar: "🤖",
      department: config.department,
      accessLevel: config.accessLevel,
      source: config.source,
      provider: config.source,
      route,
      capabilities: config.capabilities,
      costPerRequest: this.getEstimatedCost(config.source),
      lastSync: new Date().toISOString(),
      status: "pending",
      integrationDate: new Date().toISOString(),
      description: config.description,
      enabled: false, // Start disabled until fully configured
      isExternal: true,
      managedBy: "Ephrya",
      apiEndpoint: config.apiEndpoint,
      credentials: config.credentials,
      isNew: true,
    }

    // Simulate onboarding process
    await this.performOnboardingSteps(newAgent)

    this.agents.push(newAgent)

    console.log(`External agent onboarded: ${newAgent.name} (${newAgent.source})`)
    console.log(`Agent route: ${newAgent.route}`)
    console.log(`Capabilities: ${newAgent.capabilities.join(", ")}`)

    return newAgent
  }

  private async performOnboardingSteps(agent: ExternalAgent): Promise<void> {
    const steps: AgentOnboardingStep[] = [
      {
        id: "validate-credentials",
        title: "Validate Credentials",
        description: "Test API connection and authentication",
        completed: false,
        required: true,
      },
      {
        id: "setup-rbac",
        title: "Configure RBAC",
        description: "Set up role-based access controls",
        completed: false,
        required: true,
      },
      {
        id: "register-monitoring",
        title: "Register with Eve",
        description: "Add agent to monitoring dashboard",
        completed: false,
        required: true,
      },
      {
        id: "test-integration",
        title: "Test Integration",
        description: "Perform integration test with Ephrya",
        completed: false,
        required: true,
      },
    ]

    for (const step of steps) {
      console.log(`Performing onboarding step: ${step.title}`)
      await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate processing
      step.completed = true
    }

    agent.status = "active"
    agent.enabled = true
  }

  private getEstimatedCost(source: string): number {
    const costs = {
      openai: 0.02,
      microsoft: 0.015,
      google: 0.01,
      aws: 0.012,
      anthropic: 0.018,
      custom: 0.005,
    }
    return costs[source as keyof typeof costs] || 0.01
  }

  getOnboardingSteps(): AgentOnboardingStep[] {
    return [
      {
        id: "select-provider",
        title: "Select Provider",
        description: "Choose the external AI provider",
        completed: false,
        required: true,
      },
      {
        id: "configure-agent",
        title: "Configure Agent",
        description: "Set up agent details and capabilities",
        completed: false,
        required: true,
      },
      {
        id: "set-credentials",
        title: "Set Credentials",
        description: "Provide API keys and endpoints",
        completed: false,
        required: false,
      },
      {
        id: "test-connection",
        title: "Test Connection",
        description: "Verify agent connectivity",
        completed: false,
        required: true,
      },
      {
        id: "finalize-setup",
        title: "Finalize Setup",
        description: "Complete agent integration",
        completed: false,
        required: true,
      },
    ]
  }

  async removeAgent(agentId: string): Promise<void> {
    const index = this.agents.findIndex((agent) => agent.id === agentId)
    if (index !== -1) {
      const agent = this.agents[index]
      console.log(`Removing external agent: ${agent.name}`)
      this.agents.splice(index, 1)
    }
  }

  getAgents(): ExternalAgent[] {
    return [...this.agents]
  }
}

export const externalAgentManager = ExternalAgentManager.getInstance()
