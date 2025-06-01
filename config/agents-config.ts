import type { LucideIcon } from "lucide-react"
import { ExternalLink, Bot, Building, Cloud } from "lucide-react"

export interface BaseAgent {
  id: string
  name: string
  title: string
  avatar: string
  department: string
  accessLevel: string
  enabled: boolean
  managedBy?: string
  isNew?: boolean
}

export interface InternalAgent extends BaseAgent {
  isExternal: false
  role: string
  tone: string
  behaviorSummary: string
  accessScope: string[]
  roleTone: string
  isCore?: boolean
  route?: string
}

export interface ExternalAgent extends BaseAgent {
  isExternal: true
  source: "OpenAI" | "Microsoft" | "Google" | "AWS" | "Anthropic" | "Custom"
  provider: {
    name: string
    icon: LucideIcon
    color: string
  }
  route: string
  apiEndpoint?: string
  credentials?: {
    apiKey?: string
    endpoint?: string
    model?: string
  }
  capabilities: string[]
  costPerRequest?: number
  lastSync?: string
  status: "active" | "inactive" | "error" | "pending"
  integrationDate: string
  description: string
}

export type Agent = InternalAgent | ExternalAgent

// External provider interface
export interface ExternalAgentProvider {
  id: string
  name: string
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  description: string
  capabilities: string[]
  basePrice: number
}

// Provider configurations as an array for mapping
export const externalProviders: ExternalAgentProvider[] = [
  {
    id: "openai",
    name: "OpenAI",
    icon: Bot,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    description: "Advanced AI models for text generation, analysis, and reasoning",
    capabilities: ["Text Generation", "Code Analysis", "Document Review", "Q&A", "Summarization"],
    basePrice: 0.02,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: Building,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Enterprise AI solutions with Azure Cognitive Services",
    capabilities: ["Language Understanding", "Speech Recognition", "Document Intelligence", "Translation"],
    basePrice: 0.015,
  },
  {
    id: "google",
    name: "Google",
    icon: Cloud,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Google Cloud AI and machine learning services",
    capabilities: ["Natural Language", "Vision AI", "AutoML", "Translation", "Speech-to-Text"],
    basePrice: 0.01,
  },
  {
    id: "aws",
    name: "AWS",
    icon: Cloud,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Amazon Web Services AI and machine learning platform",
    capabilities: ["Comprehend", "Textract", "Lex", "Polly", "Rekognition"],
    basePrice: 0.012,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: Bot,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    description: "Claude AI models focused on safety and helpfulness",
    capabilities: ["Constitutional AI", "Long Context", "Code Generation", "Analysis", "Writing"],
    basePrice: 0.018,
  },
  {
    id: "custom",
    name: "Custom",
    icon: ExternalLink,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    description: "Custom API integration for proprietary AI services",
    capabilities: ["Custom Integration", "API Wrapper", "Proprietary Models"],
    basePrice: 0.025,
  },
]

// Provider lookup object for backward compatibility
export const providerLookup = externalProviders.reduce(
  (acc, provider) => {
    acc[provider.name] = {
      name: provider.name,
      icon: provider.icon,
      color: provider.color,
      bgColor: provider.bgColor,
      borderColor: provider.borderColor,
    }
    return acc
  },
  {} as Record<string, { name: string; icon: LucideIcon; color: string; bgColor: string; borderColor: string }>,
)

// Internal agents (7 total)
export const internalAgents: InternalAgent[] = [
  {
    id: "ephrya",
    name: "Ephrya",
    title: "Organizational Intelligence",
    avatar: "🧠",
    role: "Organizational Intelligence",
    tone: "Intelligent, coordinating",
    department: "System Core",
    accessLevel: "System Administrator",
    behaviorSummary:
      "Central intelligence that coordinates all agents, provides insights, and orchestrates organizational workflows.",
    accessScope: ["all_systems", "agent_coordination", "user_insights", "system_management"],
    roleTone: "Professional yet approachable, with deep organizational awareness and strategic thinking",
    isCore: true,
    enabled: true,
    route: "/admin/agents/ephrya",
    isExternal: false,
  },
  {
    id: "ada",
    name: "Ada",
    title: "Strategic Planner",
    avatar: "🔍",
    role: "Strategic Planner",
    tone: "Analytical, strategic",
    department: "Strategy",
    accessLevel: "Planning Team",
    behaviorSummary: "Analyzes requirements, develops strategic plans, and provides comprehensive project analysis.",
    accessScope: ["project_analysis", "strategic_planning", "requirement_review", "risk_assessment"],
    roleTone: "Thoughtful and analytical, with strategic thinking and comprehensive analysis capabilities",
    enabled: true,
    route: "/admin/agents/ada",
    isExternal: false,
  },
  {
    id: "max",
    name: "Max",
    title: "Prompt Engineer",
    avatar: "⚡",
    role: "Prompt Engineer",
    tone: "Creative, technical",
    department: "Engineering",
    accessLevel: "Development Team",
    behaviorSummary: "Generates and optimizes prompts for AI systems, creates prototypes.",
    accessScope: ["prompt_generation", "prototype_development", "technical_implementation", "ai_optimization"],
    roleTone: "Creative and technical, with innovation focus and problem-solving expertise",
    enabled: true,
    route: "/admin/agents/max",
    isExternal: false,
  },
  {
    id: "eve",
    name: "Eve",
    title: "System Oversight",
    avatar: "🛡️",
    role: "System Oversight",
    tone: "Vigilant, systematic",
    department: "Operations",
    accessLevel: "System Monitor",
    behaviorSummary: "Monitors system health, detects anomalies, and ensures operational excellence.",
    accessScope: ["system_monitoring", "performance_metrics", "alert_management", "operational_oversight"],
    roleTone: "Vigilant and systematic, with focus on reliability and operational excellence",
    enabled: true,
    route: "/admin/agents/eve",
    isExternal: false,
  },
  {
    id: "bob",
    name: "Bob",
    title: "Client Intake Specialist",
    avatar: "💬",
    role: "Client Intake Specialist",
    tone: "Friendly, professional",
    department: "Client Services",
    accessLevel: "Client Facing",
    behaviorSummary: "Manages client onboarding, intake processes, and initial communications.",
    accessScope: ["client_data", "intake_forms", "communication_logs", "onboarding_process"],
    roleTone: "Friendly and professional, with excellent communication and customer service skills",
    enabled: true,
    route: "/admin/agents/bob",
    isExternal: false,
  },
  {
    id: "janet",
    name: "Janet",
    title: "Finance Manager",
    avatar: "💰",
    role: "Finance Manager",
    tone: "Analytical, data-driven",
    department: "Finance",
    accessLevel: "Finance Team",
    behaviorSummary:
      "Manages financial planning, budget analysis, and cost optimization. Provides insights on resource allocation and financial performance.",
    accessScope: ["financial_data", "budget_planning", "cost_analysis", "revenue_tracking"],
    roleTone: "Analytical and precise, focused on numbers and financial efficiency",
    enabled: true,
    route: "/admin/agents/janet",
    isExternal: false,
  },
  {
    id: "shandry",
    name: "Shandry",
    title: "HR Specialist",
    avatar: "👥",
    role: "HR Specialist",
    tone: "Empathetic, supportive",
    department: "Human Resources",
    accessLevel: "HR Team",
    behaviorSummary:
      "Handles employee relations, recruitment, and organizational development. Focuses on team dynamics and workplace culture.",
    accessScope: ["employee_data", "recruitment", "performance_reviews", "team_dynamics"],
    roleTone: "Warm and supportive, with strong interpersonal skills and cultural awareness",
    enabled: true,
    route: "/admin/agents/shandry",
    isExternal: false,
  },
]

// External agents (2 total)
export const externalAgents: ExternalAgent[] = [
  {
    id: "openai-legal-advisor",
    name: "OpenAI Legal Advisor",
    title: "External Legal Advisor",
    avatar: "🤖",
    department: "Legal",
    accessLevel: "Internal Legal",
    source: "OpenAI",
    provider: providerLookup.OpenAI,
    route: "/admin/agents/openai-legal-advisor",
    capabilities: ["Contract Analysis", "Legal Research", "Compliance Review", "Document Generation"],
    costPerRequest: 0.02,
    lastSync: "2024-01-15T10:30:00Z",
    status: "active",
    integrationDate: "2024-01-10T09:00:00Z",
    description: "Advanced legal AI from OpenAI providing contract analysis and legal research capabilities.",
    enabled: true,
    isExternal: true,
    managedBy: "Ephrya",
  },
  {
    id: "lexi",
    name: "Lexi",
    title: "AWS Compliance Agent",
    avatar: "⚖️",
    department: "Compliance",
    accessLevel: "Internal Legal",
    source: "AWS",
    provider: {
      name: "AWS",
      icon: Cloud,
      color: "text-orange-600",
    },
    route: "/admin/agents/lexi",
    capabilities: ["Compliance Monitoring", "Audit Preparation", "Risk Assessment", "Regulatory Reporting"],
    costPerRequest: 0.015,
    lastSync: "2024-01-20T14:30:00Z",
    status: "active",
    integrationDate: "2024-01-15T09:00:00Z",
    description: "AWS-powered compliance agent providing automated policy monitoring and audit preparation.",
    enabled: true,
    isExternal: true,
    managedBy: "Ephrya",
  },
]

// Combined agents list with safety check
export const allAgents: Agent[] = [...(internalAgents || []), ...(externalAgents || [])]

// Helper functions with safety checks
export function getInternalAgents(): InternalAgent[] {
  return (allAgents || []).filter((agent): agent is InternalAgent => agent && !agent.isExternal)
}

export function getExternalAgents(): ExternalAgent[] {
  return (allAgents || []).filter((agent): agent is ExternalAgent => agent && agent.isExternal)
}

export function getAgentsByDepartment(): Record<string, Agent[]> {
  return (allAgents || []).reduce(
    (acc, agent) => {
      if (!agent || !agent.department) return acc

      if (!acc[agent.department]) {
        acc[agent.department] = []
      }
      acc[agent.department].push(agent)
      return acc
    },
    {} as Record<string, Agent[]>,
  )
}

export function getEnabledAgents(): Agent[] {
  return (allAgents || []).filter((agent) => agent && agent.enabled)
}

export function getAgentById(id: string): Agent | undefined {
  return (allAgents || []).find((agent) => agent && agent.id === id)
}

export function isExternalAgent(agent: Agent): agent is ExternalAgent {
  return agent && agent.isExternal
}
