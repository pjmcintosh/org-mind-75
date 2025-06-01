console.log("Loaded: lib/data/agent-insights.ts")

export interface AgentInsight {
  id: string
  sourceAgent: string
  message: string
  date: string
  severity: "low" | "medium" | "high" | "critical"
  category: "strategic" | "technical" | "operational" | "financial" | "risk"
  projectId?: string
  actionRequired: boolean
  confidence: number // 0-100
}

export const agentInsights: AgentInsight[] = [
  {
    id: "INS-001",
    sourceAgent: "ada",
    message:
      "Consider expanding timeline for Project Atlas by 2 weeks to accommodate additional stakeholder requirements",
    date: "2024-01-27T14:15:00Z",
    severity: "medium",
    category: "strategic",
    projectId: "PRJ-1001",
    actionRequired: true,
    confidence: 87,
  },
  {
    id: "INS-002",
    sourceAgent: "max",
    message: "Technical architecture for chatbot implementation shows 92% feasibility with current tech stack",
    date: "2024-01-27T12:45:00Z",
    severity: "low",
    category: "technical",
    projectId: "PRJ-1002",
    actionRequired: false,
    confidence: 92,
  },
  {
    id: "INS-003",
    sourceAgent: "eve",
    message: "System performance optimization could reduce processing time by 35% across all agent workflows",
    date: "2024-01-27T11:30:00Z",
    severity: "high",
    category: "operational",
    actionRequired: true,
    confidence: 78,
  },
  {
    id: "INS-004",
    sourceAgent: "janet",
    message: "Budget allocation for Q1 projects is 15% under projected costs, allowing for scope expansion",
    date: "2024-01-27T10:20:00Z",
    severity: "medium",
    category: "financial",
    actionRequired: false,
    confidence: 94,
  },
  {
    id: "INS-005",
    sourceAgent: "eve",
    message: "Detected potential security vulnerability in external API integration - immediate review recommended",
    date: "2024-01-27T09:45:00Z",
    severity: "critical",
    category: "risk",
    actionRequired: true,
    confidence: 96,
  },
  {
    id: "INS-006",
    sourceAgent: "shandry",
    message: "HR process automation could reduce onboarding time by 60% and improve employee satisfaction scores",
    date: "2024-01-26T16:30:00Z",
    severity: "medium",
    category: "operational",
    projectId: "PRJ-1004",
    actionRequired: false,
    confidence: 83,
  },
]
