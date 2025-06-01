export interface ExecutionPlan {
  executionPlan: string[]
  keyMilestones: string[]
  resourceAllocation: string
  successMetrics: string[]
  riskMitigation: string[]
  timeline: {
    phase: string
    duration: string
    deliverables: string[]
  }[]
}

export class MaxPromptGenerator {
  async generateExecutionPlan(pocRequest: any, bobAnalysis: any, adaEvaluation: any): Promise<ExecutionPlan> {
    // Simulate Max's planning process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      executionPlan: this.createExecutionSteps(pocRequest, bobAnalysis),
      keyMilestones: this.defineMilestones(pocRequest),
      resourceAllocation: this.allocateResources(bobAnalysis),
      successMetrics: this.defineSuccessMetrics(pocRequest),
      riskMitigation: this.createRiskMitigation(pocRequest, adaEvaluation),
      timeline: this.createTimeline(pocRequest, bobAnalysis),
    }
  }

  private createExecutionSteps(request: any, bobAnalysis: any): string[] {
    const steps = [
      "Project initiation and team assembly",
      "Requirements analysis and documentation",
      "Technical design and architecture review",
    ]

    if (request.technicalRequirements?.includes("AI/ML")) {
      steps.push("Data collection and model training")
    }

    steps.push(
      "Development phase - Core functionality",
      "Integration and testing phase",
      "User acceptance testing",
      "Deployment and monitoring setup",
      "Go-live and post-deployment support",
    )

    return steps
  }

  private defineMilestones(request: any): string[] {
    return [
      "Project kickoff completed",
      "Technical design approved",
      "MVP development completed",
      "Testing phase completed",
      "Production deployment successful",
      "Success metrics achieved",
    ]
  }

  private allocateResources(bobAnalysis: any): string {
    const resources = bobAnalysis.requiredResources || []
    const allocation = resources.map((resource: string, index: number) => {
      if (resource.includes("Developer")) return `${resource}: Full-time allocation`
      if (resource.includes("Manager")) return `${resource}: 50% allocation`
      if (resource.includes("QA")) return `${resource}: 75% allocation during testing`
      return `${resource}: As needed basis`
    })

    return allocation.join("; ")
  }

  private defineSuccessMetrics(request: any): string[] {
    const baseMetrics = [
      "Project delivered on time and within budget",
      "All acceptance criteria met",
      "Performance benchmarks achieved",
    ]

    if (request.successCriteria) {
      baseMetrics.push(...request.successCriteria)
    }

    baseMetrics.push("User adoption rate > 80%", "System uptime > 99.5%", "Error rate < 1%")

    return baseMetrics
  }

  private createRiskMitigation(request: any, adaEvaluation: any): string[] {
    const mitigations = [
      "Regular progress reviews and stakeholder updates",
      "Continuous integration and automated testing",
      "Backup and rollback procedures",
    ]

    if (adaEvaluation.integrationComplexity > 70) {
      mitigations.push("Dedicated integration testing environment")
    }

    if (request.risks?.length > 0) {
      mitigations.push("Risk monitoring dashboard and alerts")
    }

    mitigations.push("Documentation and knowledge transfer sessions", "Post-deployment monitoring and support plan")

    return mitigations
  }

  private createTimeline(request: any, bobAnalysis: any): any[] {
    const baseTimeline = [
      {
        phase: "Planning & Design",
        duration: "1-2 weeks",
        deliverables: ["Project plan", "Technical design", "Resource allocation"],
      },
      {
        phase: "Development",
        duration: "3-6 weeks",
        deliverables: ["Core functionality", "Integration points", "Unit tests"],
      },
      {
        phase: "Testing & QA",
        duration: "1-2 weeks",
        deliverables: ["Test results", "Bug fixes", "Performance validation"],
      },
      {
        phase: "Deployment",
        duration: "1 week",
        deliverables: ["Production deployment", "Monitoring setup", "Documentation"],
      },
    ]

    // Adjust timeline based on complexity
    if (request.technicalRequirements?.length > 5) {
      baseTimeline[1].duration = "6-10 weeks"
      baseTimeline[2].duration = "2-3 weeks"
    }

    return baseTimeline
  }
}

export const maxGenerator = new MaxPromptGenerator()
