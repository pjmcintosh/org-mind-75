// lib/data/mockData.ts
// Centralized mock data registry for easy imports

// Tilo Decision System - Define inline since files don't exist
export const sampleTiloDecisions = [
  {
    id: "tilo-001",
    title: "Resource Allocation Optimization",
    description: "Tilo recommends reallocating development resources to high-priority projects",
    confidence: 0.92,
    impact: "high",
    timestamp: "2024-01-15T10:30:00Z",
    status: "pending",
    category: "resource-management",
  },
  {
    id: "tilo-002",
    title: "Security Protocol Update",
    description: "Tilo suggests updating security protocols based on recent threat analysis",
    confidence: 0.87,
    impact: "medium",
    timestamp: "2024-01-14T14:20:00Z",
    status: "approved",
    category: "security",
  },
]

export const tiloRecommendations = [
  {
    id: "rec-001",
    title: "Optimize Agent Workflows",
    description: "Streamline communication between Ada and Max for better project coordination",
    priority: "high",
    estimatedImpact: "25% efficiency increase",
    category: "workflow",
  },
  {
    id: "rec-002",
    title: "Update Compliance Protocols",
    description: "Review and update data handling protocols to meet new regulations",
    priority: "medium",
    estimatedImpact: "Risk reduction",
    category: "compliance",
  },
]

// Agent Performance & Metrics - Define inline
export const performanceData = {
  agents: [
    { name: "Ada", efficiency: 94, tasks: 156, uptime: 99.2 },
    { name: "Bob", efficiency: 87, tasks: 142, uptime: 98.8 },
    { name: "Max", efficiency: 91, tasks: 134, uptime: 99.5 },
    { name: "Eve", efficiency: 96, tasks: 178, uptime: 99.8 },
  ],
  trends: {
    efficiency: [85, 87, 89, 91, 93, 94],
    tasks: [120, 125, 135, 145, 150, 156],
    uptime: [98.5, 98.8, 99.0, 99.1, 99.2, 99.2],
  },
}

export const agentMetrics = {
  totalAgents: 8,
  activeAgents: 7,
  averageEfficiency: 92.3,
  totalTasks: 1247,
  systemUptime: 99.4,
}

export const activityTimeline = [
  {
    id: "act-001",
    agent: "Ada",
    action: "Completed project analysis",
    timestamp: "2024-01-15T09:30:00Z",
    status: "success",
  },
  {
    id: "act-002",
    agent: "Bob",
    action: "Started financial review",
    timestamp: "2024-01-15T08:45:00Z",
    status: "in-progress",
  },
]

// Mock Agent Metrics - Define inline
export const mockAgentMetrics = {
  ada: { efficiency: 94, tasks: 156, uptime: 99.2, status: "active" },
  bob: { efficiency: 87, tasks: 142, uptime: 98.8, status: "active" },
  max: { efficiency: 91, tasks: 134, uptime: 99.5, status: "active" },
  eve: { efficiency: 96, tasks: 178, uptime: 99.8, status: "active" },
  janet: { efficiency: 89, tasks: 98, uptime: 99.1, status: "active" },
  ephrya: { efficiency: 93, tasks: 167, uptime: 99.6, status: "active" },
  shandry: { efficiency: 88, tasks: 123, uptime: 98.9, status: "active" },
}

// Financial Operations - Define inline
export const mockFinOpsMetrics = {
  totalBudget: 2500000,
  spentBudget: 1875000,
  remainingBudget: 625000,
  monthlyBurn: 208333,
  projectedCompletion: "2024-06-15",
  costPerAgent: 312500,
  efficiency: 87.5,
}

export const mockFinOpsSummary = {
  quarterlySpend: 625000,
  budgetUtilization: 75,
  costSavings: 125000,
  roi: 3.2,
}

// Compliance & Security - Define inline
export const mockComplianceStatus = {
  overallScore: 94,
  dataProtection: 96,
  accessControl: 92,
  auditTrail: 98,
  riskAssessment: 89,
  lastAudit: "2024-01-10",
  nextAudit: "2024-04-10",
}

export const mockComplianceMetrics = {
  totalChecks: 247,
  passedChecks: 232,
  failedChecks: 15,
  warningsCount: 8,
  criticalIssues: 2,
}

// Executive Dashboard - Define inline
export const mockCeoBriefing = {
  systemHealth: 96,
  activeProjects: 12,
  completedProjects: 8,
  pendingApprovals: 5,
  budgetUtilization: 78,
  agentEfficiency: 92.3,
  riskLevel: "low",
  lastUpdate: "2024-01-15T10:00:00Z",
}

export const mockDepartmentSummaries = [
  {
    department: "Engineering",
    head: "Ada",
    efficiency: 94,
    projects: 5,
    budget: 750000,
    status: "on-track",
  },
  {
    department: "Finance",
    head: "Bob",
    efficiency: 87,
    projects: 3,
    budget: 450000,
    status: "on-track",
  },
  {
    department: "Security",
    head: "Eve",
    efficiency: 96,
    projects: 2,
    budget: 300000,
    status: "ahead",
  },
]

export const mockSignatureLog = [
  {
    id: "sig-001",
    document: "Q1 Budget Approval",
    signedBy: "CEO",
    timestamp: "2024-01-15T09:00:00Z",
    status: "completed",
  },
  {
    id: "sig-002",
    document: "Security Policy Update",
    signedBy: "CTO",
    timestamp: "2024-01-14T16:30:00Z",
    status: "completed",
  },
]

// System Operations - Define inline
export const mockEngagements = [
  {
    id: "eng-001",
    type: "project-review",
    agent: "Ada",
    client: "TechCorp",
    status: "active",
    startDate: "2024-01-10",
    priority: "high",
  },
  {
    id: "eng-002",
    type: "compliance-audit",
    agent: "Eve",
    client: "FinanceGroup",
    status: "completed",
    startDate: "2024-01-08",
    priority: "medium",
  },
]

export const mockSystemLogs = [
  {
    id: "log-001",
    level: "info",
    message: "System backup completed successfully",
    timestamp: "2024-01-15T02:00:00Z",
    component: "backup-service",
  },
  {
    id: "log-002",
    level: "warning",
    message: "High memory usage detected on agent Ada",
    timestamp: "2024-01-15T08:30:00Z",
    component: "monitoring",
  },
]

// Engagement Logs - Define inline for engagement log page
export const mockEngagementLogs = [
  {
    id: "engagement-001",
    projectName: "TechCorp Digital Transformation",
    clientName: "TechCorp",
    status: "in-progress",
    startDate: "2024-01-10T09:00:00Z",
    stages: [
      {
        id: "stage-001",
        name: "Initial Analysis",
        agent: "Ada",
        status: "completed",
        startTime: "2024-01-10T09:00:00Z",
        endTime: "2024-01-10T11:30:00Z",
        notes: "Completed initial technical analysis",
      },
      {
        id: "stage-002",
        name: "Requirements Gathering",
        agent: "Bob",
        status: "in-progress",
        startTime: "2024-01-10T14:00:00Z",
        notes: "Gathering business requirements",
      },
    ],
    logs: [
      {
        id: "log-001",
        timestamp: "2024-01-10T09:00:00Z",
        actor: "Ada",
        actorType: "agent",
        action: "Started project analysis",
        status: "success",
        notes: "Initiated comprehensive project analysis",
      },
      {
        id: "log-002",
        timestamp: "2024-01-10T11:30:00Z",
        actor: "Admin",
        actorType: "user",
        action: "Approved initial analysis",
        status: "success",
        notes: "Analysis approved by admin",
      },
    ],
  },
  {
    id: "engagement-002",
    projectName: "FinanceGroup Risk Assessment",
    clientName: "FinanceGroup",
    status: "completed",
    startDate: "2024-01-08T08:00:00Z",
    stages: [
      {
        id: "stage-003",
        name: "Risk Analysis",
        agent: "Eve",
        status: "completed",
        startTime: "2024-01-08T08:00:00Z",
        endTime: "2024-01-08T16:00:00Z",
        notes: "Completed comprehensive risk assessment",
      },
    ],
    logs: [
      {
        id: "log-003",
        timestamp: "2024-01-08T08:00:00Z",
        actor: "Eve",
        actorType: "agent",
        action: "Started risk assessment",
        status: "success",
        notes: "Initiated risk assessment process",
      },
      {
        id: "log-004",
        timestamp: "2024-01-08T16:00:00Z",
        actor: "CEO",
        actorType: "user",
        action: "Approved risk assessment",
        status: "success",
        notes: "Risk assessment approved by CEO",
      },
    ],
  },
]

export const mockEngagementSystemLogs = [
  {
    id: "sys-log-001",
    timestamp: "2024-01-15T09:00:00Z",
    actor: "Ada",
    actorType: "agent",
    action: "Completed project analysis for TechCorp",
    status: "success",
    component: "analysis-engine",
    targetType: "project",
    targetId: "PRJ-001",
    actionType: "analysis_completed",
    notes: "Successfully completed technical analysis",
    metadata: {
      duration: "2.5 hours",
      complexity: "high",
      confidence: "94%",
    },
  },
  {
    id: "sys-log-002",
    timestamp: "2024-01-15T08:45:00Z",
    actor: "Bob",
    actorType: "agent",
    action: "Started financial review",
    status: "in-progress",
    component: "finance-module",
    targetType: "project",
    targetId: "PRJ-002",
    actionType: "financial_review_started",
    notes: "Initiated financial review process",
    metadata: {
      budget: "$250,000",
      timeline: "6 months",
    },
  },
  {
    id: "sys-log-003",
    timestamp: "2024-01-15T08:30:00Z",
    actor: "Admin",
    actorType: "user",
    action: "Accessed engagement dashboard",
    status: "success",
    component: "dashboard",
    targetType: "system",
    targetId: "dashboard",
    actionType: "dashboard_access",
    notes: "Admin accessed engagement monitoring dashboard",
    metadata: {
      sessionId: "sess_123456",
      ipAddress: "192.168.1.100",
    },
  },
  {
    id: "sys-log-004",
    timestamp: "2024-01-15T08:15:00Z",
    actor: "Eve",
    actorType: "agent",
    action: "Security scan completed",
    status: "success",
    component: "security-scanner",
    targetType: "system",
    targetId: "security-scan",
    actionType: "security_scan_completed",
    notes: "Completed routine security scan",
    metadata: {
      threatsFound: "0",
      scanDuration: "15 minutes",
      lastScan: "2024-01-14T08:15:00Z",
    },
  },
]

export const signatureQueue = [
  {
    id: "queue-001",
    document: "Project Charter - Micron-A",
    requester: "Ada",
    priority: "high",
    dueDate: "2024-01-16",
    status: "pending",
  },
  {
    id: "queue-002",
    document: "Budget Amendment Q1",
    requester: "Bob",
    priority: "medium",
    dueDate: "2024-01-18",
    status: "pending",
  },
]

// Documentation & Content - Define inline
export const wikiSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: "Welcome to the Tilo platform...",
    lastUpdated: "2024-01-15",
  },
  {
    id: "agent-management",
    title: "Agent Management",
    content: "Learn how to manage and configure agents...",
    lastUpdated: "2024-01-14",
  },
]

export const futureEnhancements = [
  {
    id: "enh-001",
    title: "Advanced Analytics Dashboard",
    description: "Enhanced reporting and analytics capabilities",
    priority: "high",
    estimatedCompletion: "Q2 2024",
  },
  {
    id: "enh-002",
    title: "Mobile Application",
    description: "Native mobile app for iOS and Android",
    priority: "medium",
    estimatedCompletion: "Q3 2024",
  },
]

export const technicalOverview = {
  architecture: "Microservices",
  database: "PostgreSQL",
  frontend: "Next.js",
  backend: "Node.js",
  deployment: "Docker + Kubernetes",
  monitoring: "Prometheus + Grafana",
}

// Legacy Compatibility - Define inline
export const sampleEphryaDecisions = sampleTiloDecisions // Reuse Tilo decisions
export const eveRecommendations = tiloRecommendations // Reuse Tilo recommendations

// Unified Approvals System
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
