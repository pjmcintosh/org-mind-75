export interface RequirementsAnalysis {
  feasibilityScore: number
  requiredResources: string[]
  estimatedTimeline: string
  riskAssessment: string
  budgetAnalysis: {
    estimatedCost: number
    costBreakdown: Record<string, number>
    roi: number
  }
  recommendation: "proceed" | "reject" | "modify"
  modifications?: string[]
}

export class BobRequirementsHandler {
  async analyzeRequirements(pocRequest: any): Promise<RequirementsAnalysis> {
    // Simulate Bob's analysis process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const feasibilityScore = this.calculateFeasibilityScore(pocRequest)
    const budgetAnalysis = this.analyzeBudget(pocRequest)
    const riskLevel = this.assessRisk(pocRequest)

    return {
      feasibilityScore,
      requiredResources: this.identifyResources(pocRequest),
      estimatedTimeline: this.estimateTimeline(pocRequest),
      riskAssessment: riskLevel,
      budgetAnalysis,
      recommendation: this.makeRecommendation(feasibilityScore, budgetAnalysis.roi, riskLevel),
    }
  }

  private calculateFeasibilityScore(request: any): number {
    // Bob's logic for feasibility scoring
    let score = 70 // Base score

    if (request.priority === "critical") score += 20
    if (request.priority === "high") score += 15
    if (request.priority === "medium") score += 10

    if (request.estimatedCost < 50000) score += 15
    else if (request.estimatedCost < 100000) score += 10
    else if (request.estimatedCost > 200000) score -= 20

    return Math.min(100, Math.max(0, score + (Math.random() * 20 - 10)))
  }

  private analyzeBudget(request: any) {
    const baseCost = request.estimatedCost || 75000
    return {
      estimatedCost: baseCost,
      costBreakdown: {
        development: baseCost * 0.6,
        testing: baseCost * 0.2,
        infrastructure: baseCost * 0.15,
        management: baseCost * 0.05,
      },
      roi: Math.random() * 300 + 150, // 150-450% ROI
    }
  }

  private assessRisk(request: any): string {
    const risks = request.risks || []
    if (risks.length > 3) return "High risk due to multiple technical challenges"
    if (risks.length > 1) return "Medium risk with manageable challenges"
    return "Low risk with standard implementation"
  }

  private identifyResources(request: any): string[] {
    const baseResources = ["Project Manager", "Senior Developer"]

    if (request.technicalRequirements?.includes("AI/ML")) {
      baseResources.push("ML Engineer", "Data Scientist")
    }

    if (request.technicalRequirements?.includes("Mobile")) {
      baseResources.push("Mobile Developer")
    }

    baseResources.push("QA Engineer", "DevOps Engineer")
    return baseResources
  }

  private estimateTimeline(request: any): string {
    const complexity = request.technicalRequirements?.length || 3

    if (complexity <= 2) return "2-4 weeks"
    if (complexity <= 4) return "4-8 weeks"
    if (complexity <= 6) return "8-12 weeks"
    return "12-16 weeks"
  }

  private makeRecommendation(feasibility: number, roi: number, risk: string): "proceed" | "reject" | "modify" {
    if (feasibility >= 80 && roi >= 200) return "proceed"
    if (feasibility < 50 || roi < 100) return "reject"
    return "modify"
  }
}

export const bobHandler = new BobRequirementsHandler()
