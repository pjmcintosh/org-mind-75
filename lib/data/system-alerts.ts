console.log("Loaded: lib/data/system-alerts.ts")

export interface SystemAlert {
  id: string
  agent: string
  type: "risk" | "info" | "delay" | "warning" | "success"
  message: string
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  projectId?: string
  resolved: boolean
}

export const systemAlerts: SystemAlert[] = [
  {
    id: "ALT-001",
    agent: "eve",
    type: "risk",
    message: "Project PRJ-1001 timeline may be at risk due to scope expansion",
    timestamp: "2024-01-27T14:20:00Z",
    severity: "high",
    projectId: "PRJ-1001",
    resolved: false,
  },
  {
    id: "ALT-002",
    agent: "ada",
    type: "delay",
    message: "Project planning for PRJ-1004 is overdue by 4 hours",
    timestamp: "2024-01-27T13:45:00Z",
    severity: "medium",
    projectId: "PRJ-1004",
    resolved: false,
  },
  {
    id: "ALT-003",
    agent: "max",
    type: "info",
    message: "POC development for PRJ-1002 completed ahead of schedule",
    timestamp: "2024-01-27T12:30:00Z",
    severity: "low",
    projectId: "PRJ-1002",
    resolved: true,
  },
  {
    id: "ALT-004",
    agent: "janet",
    type: "warning",
    message: "Budget allocation for PRJ-1003 requires CEO approval",
    timestamp: "2024-01-27T11:15:00Z",
    severity: "high",
    projectId: "PRJ-1003",
    resolved: false,
  },
  {
    id: "ALT-005",
    agent: "eve",
    type: "success",
    message: "All system health checks passed for the last 24 hours",
    timestamp: "2024-01-27T09:00:00Z",
    severity: "low",
    resolved: true,
  },
]
