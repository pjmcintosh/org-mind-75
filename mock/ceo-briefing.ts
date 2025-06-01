export const mockCeoBriefing = {
  executiveSummary: "AI agent performance remains strong with 96% overall efficiency. Q1 targets on track.",
  keyMetrics: {
    totalAgents: 8,
    activeAgents: 7,
    efficiency: 96,
    costSavings: 125000,
  },
  alerts: ["Bob agent requires capacity scaling", "Q1 budget review scheduled"],
  upcomingDecisions: 3,
}

export const mockDepartmentSummaries = [
  {
    department: "Engineering",
    agents: ["Bob", "Eve"],
    performance: 94,
    issues: 1,
    budget: 25000,
  },
  {
    department: "Legal",
    agents: ["Ada"],
    performance: 98,
    issues: 0,
    budget: 15000,
  },
]

export const mockSignatureLog = [
  {
    id: "sig-001",
    document: "Q4 Strategic Plan",
    signedDate: "2024-01-10",
    status: "signed" as const,
  },
  {
    id: "sig-002",
    document: "Agent Deployment Protocol",
    signedDate: "2024-01-12",
    status: "pending" as const,
  },
]
