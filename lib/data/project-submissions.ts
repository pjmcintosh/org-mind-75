console.log("Loaded: lib/data/project-submissions.ts")

export interface ProjectSubmission {
  id: string
  projectName: string
  clientName: string
  clientEmail: string
  status: "submitted" | "under_review" | "approved" | "rejected" | "in_progress" | "completed"
  submissionDate: string
  assignedAgent: string
  confidenceScore: number
  priority: "low" | "medium" | "high"
  estimatedCompletion: string
}

export const projectSubmissions: ProjectSubmission[] = [
  {
    id: "PRJ-001",
    projectName: "Digital Transformation Initiative",
    clientName: "Sarah Johnson",
    clientEmail: "sarah.johnson@techcorp.com",
    status: "under_review",
    submissionDate: "2024-01-25T09:30:00Z",
    assignedAgent: "ada",
    confidenceScore: 87,
    priority: "high",
    estimatedCompletion: "2024-02-15T17:00:00Z",
  },
  {
    id: "PRJ-002",
    projectName: "AI Chatbot Implementation",
    clientName: "Michael Chen",
    clientEmail: "m.chen@innovate.io",
    status: "approved",
    submissionDate: "2024-01-23T14:15:00Z",
    assignedAgent: "max",
    confidenceScore: 92,
    priority: "medium",
    estimatedCompletion: "2024-02-08T12:00:00Z",
  },
  {
    id: "PRJ-003",
    projectName: "Financial Analytics Dashboard",
    clientName: "Emily Rodriguez",
    clientEmail: "e.rodriguez@fintech.com",
    status: "in_progress",
    submissionDate: "2024-01-22T11:45:00Z",
    assignedAgent: "janet",
    confidenceScore: 78,
    priority: "high",
    estimatedCompletion: "2024-02-20T16:30:00Z",
  },
  {
    id: "PRJ-004",
    projectName: "HR Process Automation",
    clientName: "David Kim",
    clientEmail: "david.kim@hrtech.org",
    status: "submitted",
    submissionDate: "2024-01-27T08:20:00Z",
    assignedAgent: "shandry",
    confidenceScore: 85,
    priority: "medium",
    estimatedCompletion: "2024-02-12T14:00:00Z",
  },
  {
    id: "PRJ-005",
    projectName: "Customer Onboarding Optimization",
    clientName: "Lisa Wang",
    clientEmail: "lisa.wang@startup.co",
    status: "completed",
    submissionDate: "2024-01-18T16:30:00Z",
    assignedAgent: "bob",
    confidenceScore: 94,
    priority: "low",
    estimatedCompletion: "2024-01-28T10:00:00Z",
  },
  {
    id: "PRJ-1001",
    projectName: "Legacy System Migration",
    clientName: "TechCorp Industries",
    clientEmail: "admin@techcorp.com",
    status: "planning",
    submissionDate: "2024-01-20T10:15:00Z",
    assignedAgent: "ada",
    confidenceScore: 89,
    priority: "high",
    estimatedCompletion: "2024-03-01T17:00:00Z",
  },
]
