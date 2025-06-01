export const mockComplianceStatus = {
  overall: 96,
  categories: {
    dataPrivacy: 98,
    security: 95,
    auditTrail: 97,
    accessControl: 94,
  },
  lastAudit: "2024-01-05",
  nextAudit: "2024-04-05",
}

export const mockComplianceMetrics = [
  {
    agent: "Ada",
    complianceScore: 98,
    lastCheck: "2024-01-10",
    issues: 0,
    status: "compliant" as const,
  },
  {
    agent: "Bob",
    complianceScore: 95,
    lastCheck: "2024-01-10",
    issues: 1,
    status: "compliant" as const,
  },
  {
    agent: "Eve",
    complianceScore: 97,
    lastCheck: "2024-01-10",
    issues: 0,
    status: "compliant" as const,
  },
]
