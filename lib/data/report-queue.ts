console.log("Loaded: lib/data/report-queue.ts")

export interface ReportItem {
  id: string
  name: string
  format: "csv" | "pdf" | "xlsx" | "json"
  size: string
  generatedBy: string
  generatedByType: "agent" | "admin" | "ceo" | "analyst"
  lastGeneratedAt: string
  status: "completed" | "generating" | "failed" | "queued"
  category: "performance" | "financial" | "operational" | "compliance"
  downloadCount: number
}

export const reportQueue: ReportItem[] = [
  {
    id: "RPT-001",
    name: "Agent Performance Summary Q1 2024",
    format: "pdf",
    size: "2.4 MB",
    generatedBy: "eve",
    generatedByType: "agent",
    lastGeneratedAt: "2024-01-27T08:30:00Z",
    status: "completed",
    category: "performance",
    downloadCount: 12,
  },
  {
    id: "RPT-002",
    name: "Project Financial Analysis",
    format: "xlsx",
    size: "1.8 MB",
    generatedBy: "janet",
    generatedByType: "agent",
    lastGeneratedAt: "2024-01-26T15:45:00Z",
    status: "completed",
    category: "financial",
    downloadCount: 8,
  },
  {
    id: "RPT-003",
    name: "Client Engagement Metrics",
    format: "csv",
    size: "456 KB",
    generatedBy: "Admin",
    generatedByType: "admin",
    lastGeneratedAt: "2024-01-27T12:20:00Z",
    status: "generating",
    category: "operational",
    downloadCount: 0,
  },
  {
    id: "RPT-004",
    name: "System Compliance Audit",
    format: "pdf",
    size: "3.2 MB",
    generatedBy: "eve",
    generatedByType: "agent",
    lastGeneratedAt: "2024-01-25T14:10:00Z",
    status: "completed",
    category: "compliance",
    downloadCount: 5,
  },
  {
    id: "RPT-005",
    name: "Weekly Operations Dashboard",
    format: "json",
    size: "128 KB",
    generatedBy: "Analyst",
    generatedByType: "analyst",
    lastGeneratedAt: "2024-01-27T07:00:00Z",
    status: "failed",
    category: "operational",
    downloadCount: 0,
  },
]
