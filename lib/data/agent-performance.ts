console.log("Loaded: lib/data/agent-performance.ts")

export interface AgentPerformanceData {
  agentId: string
  agentName: string
  tokenUsage: number
  lastActivity: string
  status: "active" | "idle" | "overdue"
  performanceScore: number
  tasksCompleted: number
  averageResponseTime: number
}

export const agentPerformance: AgentPerformanceData[] = [
  {
    agentId: "ada",
    agentName: "Ada",
    tokenUsage: 45230,
    lastActivity: "2024-01-27T14:30:00Z",
    status: "active",
    performanceScore: 94,
    tasksCompleted: 23,
    averageResponseTime: 2.3,
  },
  {
    agentId: "max",
    agentName: "Max",
    tokenUsage: 38750,
    lastActivity: "2024-01-27T13:45:00Z",
    status: "active",
    performanceScore: 89,
    tasksCompleted: 18,
    averageResponseTime: 1.8,
  },
  {
    agentId: "eve",
    agentName: "Eve",
    tokenUsage: 52100,
    lastActivity: "2024-01-27T14:45:00Z",
    status: "active",
    performanceScore: 97,
    tasksCompleted: 31,
    averageResponseTime: 0.9,
  },
  {
    agentId: "bob",
    agentName: "Bob",
    tokenUsage: 29400,
    lastActivity: "2024-01-27T12:20:00Z",
    status: "idle",
    performanceScore: 85,
    tasksCompleted: 15,
    averageResponseTime: 3.2,
  },
  {
    agentId: "janet",
    agentName: "Janet",
    tokenUsage: 33800,
    lastActivity: "2024-01-27T11:30:00Z",
    status: "idle",
    performanceScore: 91,
    tasksCompleted: 12,
    averageResponseTime: 2.7,
  },
  {
    agentId: "shandry",
    agentName: "Shandry",
    tokenUsage: 27650,
    lastActivity: "2024-01-26T16:45:00Z",
    status: "overdue",
    performanceScore: 88,
    tasksCompleted: 9,
    averageResponseTime: 4.1,
  },
]
