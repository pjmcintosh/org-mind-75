console.log("Loaded: lib/data/engagement-log.ts")

export interface EngagementEvent {
  id: string
  eventType: "submission" | "review" | "approval" | "feedback" | "meeting" | "update" | "completion"
  actor: string
  actorType: "client" | "agent" | "admin" | "ceo"
  timestamp: string
  summary: string
  projectId?: string
  details?: string
  duration?: number // in minutes
}

export const engagementLog: EngagementEvent[] = [
  {
    id: "ENG-001",
    eventType: "submission",
    actor: "Sarah Johnson",
    actorType: "client",
    timestamp: "2024-01-25T09:30:00Z",
    summary: "Submitted Digital Transformation Initiative project",
    projectId: "PRJ-1001",
    details: "Initial project submission with requirements and timeline expectations",
  },
  {
    id: "ENG-002",
    eventType: "review",
    actor: "ada",
    actorType: "agent",
    timestamp: "2024-01-25T11:15:00Z",
    summary: "Ada began project analysis and planning",
    projectId: "PRJ-1001",
    details: "Automated analysis of project requirements and feasibility assessment",
    duration: 45,
  },
  {
    id: "ENG-003",
    eventType: "approval",
    actor: "Joe (CEO)",
    actorType: "ceo",
    timestamp: "2024-01-26T16:20:00Z",
    summary: "Approved AI Chatbot POC from Max",
    projectId: "PRJ-1002",
    details: "CEO approved technical proof of concept with minor modifications",
  },
  {
    id: "ENG-004",
    eventType: "feedback",
    actor: "Michael Chen",
    actorType: "client",
    timestamp: "2024-01-26T18:30:00Z",
    summary: "Client provided feedback on chatbot requirements",
    projectId: "PRJ-1002",
    details: "Additional requirements for multi-language support and custom integrations",
  },
  {
    id: "ENG-005",
    eventType: "meeting",
    actor: "Emily Rodriguez",
    actorType: "client",
    timestamp: "2024-01-27T10:00:00Z",
    summary: "Kickoff meeting for Financial Analytics Dashboard",
    projectId: "PRJ-1003",
    details: "Project kickoff with stakeholder alignment and requirement clarification",
    duration: 60,
  },
  {
    id: "ENG-006",
    eventType: "update",
    actor: "janet",
    actorType: "agent",
    timestamp: "2024-01-27T13:30:00Z",
    summary: "Janet provided budget analysis update",
    projectId: "PRJ-1003",
    details: "Detailed cost breakdown and resource allocation recommendations",
  },
  {
    id: "ENG-007",
    eventType: "completion",
    actor: "bob",
    actorType: "agent",
    timestamp: "2024-01-28T10:00:00Z",
    summary: "Customer Onboarding Optimization project completed",
    projectId: "PRJ-1005",
    details: "Final deliverables submitted and client satisfaction confirmed",
  },
]
