export interface POCRequest {
  id: string
  title: string
  description: string
  requestedBy: string
  priority: "low" | "medium" | "high" | "critical"
  estimatedCost: number
  estimatedDuration: string
  businessJustification: string
  technicalRequirements: string[]
  successCriteria: string[]
  risks: string[]
  createdAt: Date
  status: "pending" | "bob_review" | "ada_evaluation" | "max_prompt" | "ceo_approval" | "approved" | "rejected"
}

export interface WorkflowStep {
  agent: "bob" | "ada" | "max" | "tilo"
  status: "pending" | "in_progress" | "completed" | "failed"
  result?: any
  timestamp?: Date
  notes?: string
}

export interface POCWorkflow {
  id: string
  request: POCRequest
  steps: WorkflowStep[]
  currentStep: number
  createdAt: Date
  updatedAt: Date
}

export interface ApprovalRecord {
  workflowId: string
  approved: boolean
  approvedBy: string
  approvedAt: Date
  notes?: string
  voiceApproval?: boolean
}

class POCApprovalWorkflow {
  private workflows: Map<string, POCWorkflow> = new Map()
  private approvalRecords: ApprovalRecord[] = []

  async initiatePOC(request: POCRequest): Promise<string> {
    const workflow: POCWorkflow = {
      id: `poc_${Date.now()}`,
      request,
      steps: [
        { agent: "bob", status: "pending" },
        { agent: "ada", status: "pending" },
        { agent: "max", status: "pending" },
        { agent: "tilo", status: "pending" },
      ],
      currentStep: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.workflows.set(workflow.id, workflow)

    // Start with Bob's requirements analysis
    await this.processBobStep(workflow.id)

    return workflow.id
  }

  private async processBobStep(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId)
    if (!workflow) throw new Error("Workflow not found")

    workflow.steps[0].status = "in_progress"
    workflow.steps[0].timestamp = new Date()

    // Simulate Bob's analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const bobResult = {
      feasibilityScore: Math.random() * 100,
      requiredResources: ["Development Team", "QA Team", "Infrastructure"],
      estimatedTimeline: "4-6 weeks",
      riskAssessment: "Medium risk due to new technology integration",
      recommendation: Math.random() > 0.2 ? "proceed" : "reject",
    }

    workflow.steps[0].status = "completed"
    workflow.steps[0].result = bobResult
    workflow.updatedAt = new Date()

    if (bobResult.recommendation === "proceed") {
      workflow.currentStep = 1
      await this.processAdaStep(workflowId)
    } else {
      workflow.request.status = "rejected"
    }
  }

  private async processAdaStep(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId)
    if (!workflow) throw new Error("Workflow not found")

    workflow.steps[1].status = "in_progress"
    workflow.steps[1].timestamp = new Date()

    // Simulate Ada's evaluation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const adaResult = {
      technicalFeasibility: Math.random() * 100,
      architecturalImpact: "Low to Medium",
      securityConsiderations: ["Data encryption", "Access controls", "Audit logging"],
      performanceImpact: "Minimal",
      recommendation: Math.random() > 0.15 ? "approve" : "reject",
    }

    workflow.steps[1].status = "completed"
    workflow.steps[1].result = adaResult
    workflow.updatedAt = new Date()

    if (adaResult.recommendation === "approve") {
      workflow.currentStep = 2
      await this.processMaxStep(workflowId)
    } else {
      workflow.request.status = "rejected"
    }
  }

  private async processMaxStep(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId)
    if (!workflow) throw new Error("Workflow not found")

    workflow.steps[2].status = "in_progress"
    workflow.steps[2].timestamp = new Date()

    // Simulate Max's prompt generation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const maxResult = {
      executionPlan: [
        "Phase 1: Requirements gathering and design",
        "Phase 2: Development and testing",
        "Phase 3: Deployment and monitoring",
      ],
      keyMilestones: ["Design approval", "MVP completion", "Production deployment"],
      resourceAllocation: "Assign 2 developers, 1 QA engineer",
      successMetrics: ["Performance benchmarks", "User adoption rate", "Error rate < 1%"],
    }

    workflow.steps[2].status = "completed"
    workflow.steps[2].result = maxResult
    workflow.currentStep = 3
    workflow.request.status = "ceo_approval"
    workflow.updatedAt = new Date()

    // Notify CEO for approval
    await this.notifyCEOForApproval(workflowId)
  }

  private async notifyCEOForApproval(workflowId: string): Promise<void> {
    // This would trigger the mobile notification to CEO
    console.log(`POC ${workflowId} ready for CEO approval`)
  }

  async approvePOC(workflowId: string, approved: boolean, notes?: string): Promise<void> {
    const workflow = this.workflows.get(workflowId)
    if (!workflow) throw new Error("Workflow not found")

    workflow.steps[3].status = approved ? "completed" : "failed"
    workflow.steps[3].timestamp = new Date()
    workflow.steps[3].notes = notes
    workflow.request.status = approved ? "approved" : "rejected"
    workflow.updatedAt = new Date()
  }

  getWorkflow(workflowId: string): POCWorkflow | undefined {
    return this.workflows.get(workflowId)
  }

  getAllWorkflows(): POCWorkflow[] {
    return Array.from(this.workflows.values())
  }

  getPendingApprovals(): POCWorkflow[] {
    return Array.from(this.workflows.values()).filter((w) => w.request.status === "ceo_approval")
  }

  // Missing exports - adding them now
  getPendingPOCsForCEO(): POCWorkflow[] {
    return this.getPendingApprovals()
  }

  recordApproval(
    workflowId: string,
    approved: boolean,
    approvedBy: string,
    notes?: string,
    voiceApproval?: boolean,
  ): ApprovalRecord {
    const record: ApprovalRecord = {
      workflowId,
      approved,
      approvedBy,
      approvedAt: new Date(),
      notes,
      voiceApproval,
    }

    this.approvalRecords.push(record)

    // Update the workflow status
    this.approvePOC(workflowId, approved, notes)

    return record
  }

  getAllPOCs(): POCWorkflow[] {
    return this.getAllWorkflows()
  }

  getApprovalRecords(): ApprovalRecord[] {
    return this.approvalRecords
  }
}

export const pocWorkflow = new POCApprovalWorkflow()

// Export the missing functions as named exports
export const getPendingPOCsForCEO = () => pocWorkflow.getPendingPOCsForCEO()
export const recordApproval = (
  workflowId: string,
  approved: boolean,
  approvedBy: string,
  notes?: string,
  voiceApproval?: boolean,
) => pocWorkflow.recordApproval(workflowId, approved, approvedBy, notes, voiceApproval)
export const getAllPOCs = () => pocWorkflow.getAllPOCs()
