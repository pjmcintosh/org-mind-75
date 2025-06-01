export interface TechnicalEvaluation {
  technicalFeasibility: number
  architecturalImpact: string
  securityConsiderations: string[]
  performanceImpact: string
  scalabilityAssessment: string
  integrationComplexity: number
  recommendation: "approve" | "reject" | "conditional"
  conditions?: string[]
}

export class AdaEvaluator {
  async evaluateTechnicalFeasibility(pocRequest: any, bobAnalysis: any): Promise<TechnicalEvaluation> {
    // Simulate Ada's technical evaluation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const technicalFeasibility = this.assessTechnicalFeasibility(pocRequest)
    const securityScore = this.evaluateSecurity(pocRequest)
    const performanceImpact = this.assessPerformanceImpact(pocRequest)

    return {
      technicalFeasibility,
      architecturalImpact: this.assessArchitecturalImpact(pocRequest),
      securityConsiderations: this.identifySecurityRequirements(pocRequest),
      performanceImpact,
      scalabilityAssessment: this.assessScalability(pocRequest),
      integrationComplexity: this.assessIntegrationComplexity(pocRequest),
      recommendation: this.makeRecommendation(technicalFeasibility, securityScore, performanceImpact),
      conditions: this.generateConditions(pocRequest),
    }
  }

  private assessTechnicalFeasibility(request: any): number {
    let score = 75 // Base technical feasibility

    const requirements = request.technicalRequirements || []

    // Adjust based on technical complexity
    if (requirements.includes("AI/ML")) score -= 10
    if (requirements.includes("Blockchain")) score -= 15
    if (requirements.includes("Real-time")) score -= 5
    if (requirements.includes("Mobile")) score += 5
    if (requirements.includes("Web")) score += 10

    return Math.min(100, Math.max(0, score + (Math.random() * 20 - 10)))
  }

  private evaluateSecurity(request: any): number {
    let score = 80

    if (request.description.toLowerCase().includes("data")) score -= 10
    if (request.description.toLowerCase().includes("user")) score -= 5
    if (request.description.toLowerCase().includes("payment")) score -= 20
    if (request.description.toLowerCase().includes("public")) score += 10

    return Math.min(100, Math.max(0, score))
  }

  private assessArchitecturalImpact(request: any): string {
    const requirements = request.technicalRequirements || []

    if (requirements.length > 5) return "High - Significant architectural changes required"
    if (requirements.length > 3) return "Medium - Moderate architectural adjustments needed"
    return "Low - Minimal impact on existing architecture"
  }

  private identifySecurityRequirements(request: any): string[] {
    const baseRequirements = ["Input validation", "Error handling"]

    if (request.description.toLowerCase().includes("user")) {
      baseRequirements.push("Authentication", "Authorization")
    }

    if (request.description.toLowerCase().includes("data")) {
      baseRequirements.push("Data encryption", "Audit logging")
    }

    if (request.description.toLowerCase().includes("api")) {
      baseRequirements.push("Rate limiting", "API security")
    }

    return baseRequirements
  }

  private assessPerformanceImpact(request: any): string {
    const requirements = request.technicalRequirements || []

    if (requirements.includes("Real-time") || requirements.includes("AI/ML")) {
      return "High - May require performance optimization"
    }

    if (requirements.includes("Database") || requirements.includes("API")) {
      return "Medium - Standard performance considerations"
    }

    return "Low - Minimal performance impact expected"
  }

  private assessScalability(request: any): string {
    if (request.description.toLowerCase().includes("enterprise")) {
      return "High scalability requirements - Design for enterprise load"
    }

    if (
      request.description.toLowerCase().includes("team") ||
      request.description.toLowerCase().includes("department")
    ) {
      return "Medium scalability - Design for departmental use"
    }

    return "Standard scalability - Current infrastructure sufficient"
  }

  private assessIntegrationComplexity(request: any): number {
    const requirements = request.technicalRequirements || []
    let complexity = 30 // Base complexity

    if (requirements.includes("API")) complexity += 20
    if (requirements.includes("Database")) complexity += 15
    if (requirements.includes("Third-party")) complexity += 25
    if (requirements.includes("Legacy")) complexity += 30

    return Math.min(100, complexity)
  }

  private makeRecommendation(
    technical: number,
    security: number,
    performance: string,
  ): "approve" | "reject" | "conditional" {
    if (technical >= 80 && security >= 70) return "approve"
    if (technical < 50 || security < 50) return "reject"
    return "conditional"
  }

  private generateConditions(request: any): string[] {
    const conditions = []

    if (request.estimatedCost > 100000) {
      conditions.push("Requires additional budget approval")
    }

    if (request.technicalRequirements?.includes("AI/ML")) {
      conditions.push("ML expertise consultation required")
    }

    if (request.description.toLowerCase().includes("security")) {
      conditions.push("Security team review mandatory")
    }

    return conditions
  }
}

export const adaEvaluator = new AdaEvaluator()
