export const performanceData = {
  ada: {
    efficiency: 94,
    accuracy: 98,
    responseTime: 1.2,
    tasksCompleted: 1247,
    uptime: 99.8,
  },
  bob: {
    efficiency: 91,
    accuracy: 96,
    responseTime: 0.8,
    tasksCompleted: 2156,
    uptime: 99.9,
  },
  eve: {
    efficiency: 97,
    accuracy: 99,
    responseTime: 0.6,
    tasksCompleted: 3421,
    uptime: 99.7,
  },
}

export const agentMetrics = [
  {
    agent: "Ada",
    metric: "Legal Document Review",
    value: 98,
    trend: "up" as const,
    change: "+2.3%",
  },
  {
    agent: "Bob",
    metric: "Code Analysis",
    value: 96,
    trend: "up" as const,
    change: "+1.8%",
  },
  {
    agent: "Eve",
    metric: "System Monitoring",
    value: 99,
    trend: "stable" as const,
    change: "0%",
  },
]

export const activityTimeline = [
  {
    time: "09:00",
    agent: "Ada",
    activity: "Started legal document review",
    status: "active" as const,
  },
  {
    time: "09:15",
    agent: "Bob",
    activity: "Completed code security scan",
    status: "completed" as const,
  },
  {
    time: "09:30",
    agent: "Eve",
    activity: "System health check initiated",
    status: "active" as const,
  },
]
