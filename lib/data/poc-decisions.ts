export interface POCDecision {
  id: string
  workflowId: string
  title: string
  description: string
  requestedBy: string
  priority: "low" | "medium" | "high" | "critical"
  estimatedCost: number
  bobAnalysis?: any
  adaEvaluation?: any
  maxPlan?: any
  ceoDecision?: {
    approved: boolean
    notes?: string
    timestamp: Date
  }
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  updatedAt: Date
}

class POCDecisionStore {
  private decisions: Map<string, POCDecision> = new Map()

  // Mock data for demonstration
  constructor() {
    this.initializeMockData()
  }

  private initializeMockData() {
    const mockDecisions: POCDecision[] = [
      {
        id: "poc_001",
        workflowId: "workflow_001",
        title: "AI-Powered Customer Service Chatbot",
        description:
          "Implement an AI chatbot to handle tier-1 customer support inquiries, reducing response time and improving customer satisfaction.",
        requestedBy: "Sarah Johnson - Customer Success",
        priority: "high",
        estimatedCost: 85000,
        bobAnalysis: {
          feasibilityScore: 87,
          recommendation: "proceed",
          estimatedTimeline: "6-8 weeks",
        },
        adaEvaluation: {
          technicalFeasibility: 82,
          recommendation: "approve",
        },
        maxPlan: {
          executionPlan: ["Phase 1: Requirements", "Phase 2: Development", "Phase 3: Testing"],
          keyMilestones: ["Design approval", "MVP completion", "Production deployment"],
        },
        status: "pending",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      {
        id: "poc_002",
        workflowId: "workflow_002",
        title: "Automated Invoice Processing System",
        description:
          "Develop an automated system to process and validate invoices using OCR and machine learning, reducing manual processing time by 80%.",
        requestedBy: "Michael Chen - Finance",
        priority: "medium",
        estimatedCost: 120000,
        bobAnalysis: {
          feasibilityScore: 78,
          recommendation: "proceed",
          estimatedTimeline: "8-10 weeks",
        },
        adaEvaluation: {
          technicalFeasibility: 85,
          recommendation: "approve",
        },
        maxPlan: {
          executionPlan: ["Phase 1: OCR Integration", "Phase 2: ML Model Training", "Phase 3: Workflow Integration"],
          keyMilestones: ["OCR accuracy > 95%", "ML model validation", "Full automation"],
        },
        status: "pending",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        updatedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      },
      {
        id: "poc_003",
        workflowId: "workflow_003",
        title: "Real-time Analytics Dashboard",
        description:
          "Create a real-time analytics dashboard for executive decision-making with predictive insights and automated alerts.",
        requestedBy: "David Rodriguez - Strategy",
        priority: "critical",
        estimatedCost: 95000,
        bobAnalysis: {
          feasibilityScore: 91,
          recommendation: "proceed",
          estimatedTimeline: "4-6 weeks",
        },
        adaEvaluation: {
          technicalFeasibility: 88,
          recommendation: "approve",
        },
        maxPlan: {
          executionPlan: ["Phase 1: Data Pipeline", "Phase 2: Dashboard Development", "Phase 3: Predictive Models"],
          keyMilestones: ["Data integration complete", "Dashboard MVP", "Predictive accuracy > 85%"],
        },
        status: "pending",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        updatedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
    ]

    mockDecisions.forEach((decision) => {
      this.decisions.set(decision.id, decision)
    })
  }

  addDecision(decision: POCDecision): void {
    this.decisions.set(decision.id, decision)
  }

  getDecision(id: string): POCDecision | undefined {
    return this.decisions.get(id)
  }

  getAllDecisions(): POCDecision[] {
    return Array.from(this.decisions.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getPendingDecisions(): POCDecision[] {
    return Array.from(this.decisions.values())
      .filter((decision) => decision.status === "pending")
      .sort((a, b) => {
        // Sort by priority first, then by creation date
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
        if (priorityDiff !== 0) return priorityDiff
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
  }

  updateDecisionStatus(id: string, status: "approved" | "rejected", notes?: string): boolean {
    const decision = this.decisions.get(id)
    if (!decision) return false

    decision.status = status
    decision.ceoDecision = {
      approved: status === "approved",
      notes,
      timestamp: new Date(),
    }
    decision.updatedAt = new Date()

    return true
  }

  getDecisionsByPriority(priority: "low" | "medium" | "high" | "critical"): POCDecision[] {
    return Array.from(this.decisions.values())
      .filter((decision) => decision.priority === priority)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  getRecentDecisions(limit = 10): POCDecision[] {
    return Array.from(this.decisions.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, limit)
  }
}

export const pocDecisionStore = new POCDecisionStore()
