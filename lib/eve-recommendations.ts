export interface EveRecommendation {
  id: string
  title: string
  explanation: string
  actionLabel: string
  priority: "low" | "medium" | "high"
  category: "cost" | "performance" | "quality" | "system"
  timestamp: string
  acknowledged: boolean
}

export class EveRecommendationEngine {
  private static recommendations: EveRecommendation[] = [
    {
      id: "REC-001",
      title: "Set Prompt Budget Cap for Max",
      explanation:
        "Max has generated 5 prompts in the last 24 hours. Consider enabling a usage limit to control costs.",
      actionLabel: "Enable Budget Cap",
      priority: "medium",
      category: "cost",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      acknowledged: false,
    },
    {
      id: "REC-002",
      title: "Refine Bob's Intake Questions",
      explanation:
        "Ada has rejected 3 intakes today due to missing information. Bob's questions may need clarification.",
      actionLabel: "Review Intake Form",
      priority: "high",
      category: "quality",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      acknowledged: false,
    },
    {
      id: "REC-003",
      title: "Review Agent Alert Thresholds",
      explanation: "7 system alerts triggered in the last 12 hours. Current thresholds may be too sensitive.",
      actionLabel: "Adjust Thresholds",
      priority: "medium",
      category: "system",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      acknowledged: false,
    },
    {
      id: "REC-004",
      title: "Optimize Ada's Response Time",
      explanation: "Ada's average response time increased 40% this week. Consider reviewing her analysis complexity.",
      actionLabel: "Review Settings",
      priority: "low",
      category: "performance",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      acknowledged: false,
    },
    {
      id: "REC-005",
      title: "Schedule Agent Health Check",
      explanation: "No comprehensive health check performed in 48 hours. Proactive monitoring recommended.",
      actionLabel: "Run Health Check",
      priority: "low",
      category: "system",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      acknowledged: false,
    },
  ]

  static getRecommendations(): EveRecommendation[] {
    return this.recommendations.sort((a, b) => {
      // Sort by priority (high -> medium -> low) then by timestamp (newest first)
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })
  }

  static acknowledgeRecommendation(id: string): void {
    const recommendation = this.recommendations.find((r) => r.id === id)
    if (recommendation) {
      recommendation.acknowledged = true
      console.log(`Eve: Admin acknowledged recommendation → ${recommendation.title}`)
    }
  }

  static getPriorityColor(priority: string): string {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  static getCategoryIcon(category: string): string {
    switch (category) {
      case "cost":
        return "💰"
      case "performance":
        return "⚡"
      case "quality":
        return "🎯"
      case "system":
        return "🔧"
      default:
        return "📋"
    }
  }

  static getRelativeTime(timestamp: string): string {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  // Simulate generating new recommendations based on agent activity
  static generateNewRecommendation(): void {
    const newRecommendations = [
      {
        id: `REC-${Date.now()}`,
        title: "Monitor Token Usage Spike",
        explanation: "Unusual token consumption detected across all agents. Review recent project complexity.",
        actionLabel: "Investigate Usage",
        priority: "high" as const,
        category: "cost" as const,
        timestamp: new Date().toISOString(),
        acknowledged: false,
      },
      {
        id: `REC-${Date.now() + 1}`,
        title: "Update Agent Training Data",
        explanation: "Agent performance could improve with updated training data based on recent feedback patterns.",
        actionLabel: "Schedule Update",
        priority: "medium" as const,
        category: "quality" as const,
        timestamp: new Date().toISOString(),
        acknowledged: false,
      },
    ]

    const randomRec = newRecommendations[Math.floor(Math.random() * newRecommendations.length)]
    this.recommendations.unshift(randomRec)
    console.log(`Eve: Generated new recommendation → ${randomRec.title}`)
  }
}
