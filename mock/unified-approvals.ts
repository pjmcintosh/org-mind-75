// mock/unified-approvals.ts
// Unified approval system data

export interface UnifiedApproval {
  id: string
  type: "budget" | "access" | "policy" | "contract" | "plan" | "poc" | "departmental"
  title: string
  agent?: string
  department?: string
  project?: string
  status: "pending" | "approved" | "rejected"
  priority: "high" | "medium" | "low"
  date: string
  description: string
  approver?: string
  timestamp?: string
  amount?: string
  metadata?: {
    estimatedDuration?: string
    budget?: string
    complexity?: string
    technologies?: string[]
  }
  content?: string
  sourceInputs?: string[]
}

export const mockUnifiedApprovals: UnifiedApproval[] = [
  {
    id: "approval-001",
    type: "budget",
    title: "Q1 Agent Infrastructure Budget",
    status: "approved",
    priority: "high",
    date: "2024-12-01",
    description: "Budget allocation for new agent deployment infrastructure",
    approver: "Janet",
    timestamp: "2024-12-01T09:00:00Z",
    amount: "$125,000",
    department: "Engineering",
  },
  {
    id: "approval-002",
    type: "access",
    title: "External API Access Request",
    status: "pending",
    priority: "medium",
    date: "2024-12-01",
    description: "Request for external API access for data integration",
    approver: "Lexi",
    timestamp: "2024-12-01T12:45:00Z",
    department: "Security",
  },
  {
    id: "approval-003",
    type: "policy",
    title: "Remote Work Policy Update",
    status: "approved",
    priority: "medium",
    date: "2024-11-30",
    description: "Updated remote work policy including AI agent collaboration guidelines",
    approver: "Shandry",
    timestamp: "2024-11-30T14:30:00Z",
    department: "HR",
  },
  {
    id: "approval-004",
    type: "contract",
    title: "External AI Service Agreement",
    status: "pending",
    priority: "high",
    date: "2024-12-02",
    description: "Service agreement with external AI provider for specialized capabilities",
    approver: "Jason",
    timestamp: "2024-12-02T10:15:00Z",
    amount: "$50,000",
    department: "Legal",
  },
  {
    id: "approval-005",
    type: "plan",
    title: "Micron-A Development Plan",
    agent: "Ada",
    project: "Micron-A",
    status: "pending",
    priority: "high",
    date: "2024-01-15",
    description:
      "Comprehensive development plan for Micron-A project including architecture, timeline, and resource allocation.",
    metadata: {
      estimatedDuration: "6 months",
      budget: "$250,000",
      complexity: "High",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    },
  },
  {
    id: "approval-006",
    type: "poc",
    title: "AI-Powered Customer Support",
    agent: "Max",
    project: "Customer Support AI",
    status: "pending",
    priority: "high",
    date: "2024-01-14",
    description: "Proof of concept for implementing AI-powered customer support system.",
    metadata: {
      estimatedDuration: "2 weeks",
      budget: "$15,000",
      complexity: "Medium",
      technologies: ["OpenAI GPT-4", "LangChain", "FastAPI", "Redis"],
    },
  },
]

// Helper functions
export function getApprovalStats(approvals: UnifiedApproval[] = mockUnifiedApprovals) {
  const pending = approvals.filter((a) => a.status === "pending").length
  const approved = approvals.filter((a) => a.status === "approved").length
  const rejected = approvals.filter((a) => a.status === "rejected").length

  return { pending, approved, rejected, total: approvals.length }
}

export function filterApprovalsByType(type: string, approvals: UnifiedApproval[] = mockUnifiedApprovals) {
  switch (type) {
    case "all":
      return approvals
    case "plans":
      return approvals.filter((a) => a.type === "plan")
    case "poc":
      return approvals.filter((a) => a.type === "poc")
    case "departmental":
      return approvals.filter((a) => a.type === "departmental")
    case "budget":
      return approvals.filter((a) => a.type === "budget")
    case "access":
      return approvals.filter((a) => a.type === "access")
    case "policy":
      return approvals.filter((a) => a.type === "policy")
    case "contract":
      return approvals.filter((a) => a.type === "contract")
    default:
      return approvals.filter((a) => a.type === type)
  }
}

export function filterApprovalsByStatus(status: string, approvals: UnifiedApproval[] = mockUnifiedApprovals) {
  return approvals.filter((a) => a.status === status)
}

export function filterApprovalsByPriority(priority: string, approvals: UnifiedApproval[] = mockUnifiedApprovals) {
  return approvals.filter((a) => a.priority === priority)
}

export function getApprovalById(id: string, approvals: UnifiedApproval[] = mockUnifiedApprovals) {
  return approvals.find((a) => a.id === id)
}
