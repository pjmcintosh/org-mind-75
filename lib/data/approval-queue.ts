console.log("Loaded: lib/data/approval-queue.ts")

export interface ApprovalItem {
  id: string
  projectId: string
  agent: string
  type: "project_plan" | "poc" | "budget" | "contract" | "timeline"
  status: "pending" | "approved" | "rejected" | "under_review"
  generatedDate: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  estimatedReviewTime: number // in hours
}

export const approvalQueue: ApprovalItem[] = [
  {
    id: "APP-001",
    projectId: "PRJ-1001",
    agent: "ada",
    type: "project_plan",
    status: "pending",
    generatedDate: "2024-01-27T10:30:00Z",
    title: "Digital Transformation Project Plan",
    description:
      "Comprehensive project plan for digital transformation initiative including timeline, resources, and milestones",
    priority: "high",
    estimatedReviewTime: 2,
  },
  {
    id: "APP-002",
    projectId: "PRJ-1002",
    agent: "max",
    type: "poc",
    status: "approved",
    generatedDate: "2024-01-26T15:45:00Z",
    title: "AI Chatbot Proof of Concept",
    description: "Technical proof of concept demonstrating chatbot capabilities and integration approach",
    priority: "medium",
    estimatedReviewTime: 1,
  },
  {
    id: "APP-003",
    projectId: "PRJ-1003",
    agent: "janet",
    type: "budget",
    status: "under_review",
    generatedDate: "2024-01-27T09:15:00Z",
    title: "Financial Dashboard Budget Proposal",
    description: "Budget allocation request for analytics dashboard development and implementation",
    priority: "high",
    estimatedReviewTime: 3,
  },
  {
    id: "APP-004",
    projectId: "PRJ-1004",
    agent: "ada",
    type: "timeline",
    status: "pending",
    generatedDate: "2024-01-27T14:00:00Z",
    title: "HR Automation Timeline Revision",
    description: "Updated project timeline accounting for additional requirements and resource constraints",
    priority: "medium",
    estimatedReviewTime: 1,
  },
  {
    id: "APP-005",
    projectId: "PRJ-1005",
    agent: "max",
    type: "contract",
    status: "approved",
    generatedDate: "2024-01-25T11:20:00Z",
    title: "Customer Onboarding Contract Amendment",
    description: "Contract modifications for expanded scope of customer onboarding optimization",
    priority: "low",
    estimatedReviewTime: 2,
  },
]
