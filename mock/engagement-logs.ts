export const mockEngagements = [
  {
    id: "eng-001",
    timestamp: "2024-01-10T09:30:00Z",
    user: "Alice Johnson",
    agent: "Ada",
    action: "Document Review",
    duration: 45,
    outcome: "completed" as const,
  },
  {
    id: "eng-002",
    timestamp: "2024-01-10T10:15:00Z",
    user: "Bob Chen",
    agent: "Bob",
    action: "Code Analysis",
    duration: 30,
    outcome: "completed" as const,
  },
  {
    id: "eng-003",
    timestamp: "2024-01-10T11:00:00Z",
    user: "Carol Davis",
    agent: "Eve",
    action: "System Check",
    duration: 15,
    outcome: "in-progress" as const,
  },
]

export const mockSystemLogs = [
  {
    id: "sys-001",
    timestamp: "2024-01-10T08:00:00Z",
    level: "info" as const,
    message: "All agents initialized successfully",
    component: "system",
  },
  {
    id: "sys-002",
    timestamp: "2024-01-10T09:00:00Z",
    level: "warning" as const,
    message: "Bob agent approaching capacity limit",
    component: "monitoring",
  },
]
