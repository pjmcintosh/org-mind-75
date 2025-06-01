"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/lib/context/role-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Scan,
  Network,
  FileSearch,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for threat intelligence
const threatIntelData = [
  {
    id: "TI-001",
    timestamp: "2024-01-15T14:30:00Z",
    severity: "critical",
    type: "Data Exfiltration Attempt",
    source: "Agent Workflow Monitor",
    description: "Unusual data access pattern detected in financial workflow",
    status: "investigating",
    affectedWorkflows: ["FIN-001", "FIN-003"],
  },
  {
    id: "TI-002",
    timestamp: "2024-01-15T13:45:00Z",
    severity: "high",
    type: "Unauthorized API Access",
    source: "External Integration Monitor",
    description: "Multiple failed authentication attempts from unknown IP",
    status: "mitigated",
    affectedWorkflows: ["EXT-002"],
  },
  {
    id: "TI-003",
    timestamp: "2024-01-15T12:20:00Z",
    severity: "medium",
    type: "Anomalous Agent Behavior",
    source: "Behavioral Analysis Engine",
    description: "Agent Ada showing unusual response patterns",
    status: "resolved",
    affectedWorkflows: ["ADA-001", "ADA-002"],
  },
  {
    id: "TI-004",
    timestamp: "2024-01-15T11:15:00Z",
    severity: "low",
    type: "Configuration Drift",
    source: "System Integrity Monitor",
    description: "Minor configuration changes detected in security policies",
    status: "acknowledged",
    affectedWorkflows: ["SYS-001"],
  },
]

// Mock data for PII scan results
const piiScanData = [
  {
    workflowId: "WF-001",
    workflowName: "Client Onboarding Process",
    lastScan: "2024-01-15T14:00:00Z",
    piiDetected: true,
    piiTypes: ["SSN", "Email", "Phone"],
    riskLevel: "high",
    complianceStatus: "requires_review",
    dataPoints: 47,
  },
  {
    workflowId: "WF-002",
    workflowName: "Financial Analysis Workflow",
    lastScan: "2024-01-15T13:30:00Z",
    piiDetected: true,
    piiTypes: ["Account Numbers", "Tax ID"],
    riskLevel: "medium",
    complianceStatus: "compliant",
    dataPoints: 23,
  },
  {
    workflowId: "WF-003",
    workflowName: "Marketing Campaign Builder",
    lastScan: "2024-01-15T13:00:00Z",
    piiDetected: false,
    piiTypes: [],
    riskLevel: "low",
    complianceStatus: "compliant",
    dataPoints: 0,
  },
  {
    workflowId: "WF-004",
    workflowName: "Legal Document Review",
    lastScan: "2024-01-15T12:45:00Z",
    piiDetected: true,
    piiTypes: ["Names", "Addresses", "Email"],
    riskLevel: "medium",
    complianceStatus: "compliant",
    dataPoints: 15,
  },
]

// Mock data for orchestration validation
const orchestrationData = [
  {
    nodeId: "NODE-001",
    nodeName: "Data Ingestion Gateway",
    type: "input",
    status: "healthy",
    lastValidation: "2024-01-15T14:25:00Z",
    securityScore: 98,
    vulnerabilities: 0,
    connectedWorkflows: 12,
  },
  {
    nodeId: "NODE-002",
    nodeName: "AI Processing Engine",
    type: "processor",
    status: "warning",
    lastValidation: "2024-01-15T14:20:00Z",
    securityScore: 85,
    vulnerabilities: 2,
    connectedWorkflows: 8,
  },
  {
    nodeId: "NODE-003",
    nodeName: "External API Bridge",
    type: "integration",
    status: "critical",
    lastValidation: "2024-01-15T14:15:00Z",
    securityScore: 72,
    vulnerabilities: 5,
    connectedWorkflows: 6,
  },
  {
    nodeId: "NODE-004",
    nodeName: "Data Output Controller",
    type: "output",
    status: "healthy",
    lastValidation: "2024-01-15T14:10:00Z",
    securityScore: 95,
    vulnerabilities: 1,
    connectedWorkflows: 15,
  },
]

// Mock data for security timeline
const securityTimelineData = [
  {
    id: "SEC-001",
    timestamp: "2024-01-15T14:30:00Z",
    event: "Critical Threat Detected",
    description: "Data exfiltration attempt blocked in financial workflow",
    severity: "critical",
    action: "Workflow temporarily suspended",
    agent: "Security Monitor",
  },
  {
    id: "SEC-002",
    timestamp: "2024-01-15T14:15:00Z",
    event: "PII Scan Completed",
    description: "Weekly PII compliance scan finished across all workflows",
    severity: "info",
    action: "Report generated",
    agent: "PII Scanner",
  },
  {
    id: "SEC-003",
    timestamp: "2024-01-15T13:45:00Z",
    event: "Authentication Failure",
    description: "Multiple failed login attempts from external source",
    severity: "high",
    action: "IP address blocked",
    agent: "Access Control",
  },
  {
    id: "SEC-004",
    timestamp: "2024-01-15T13:30:00Z",
    event: "Orchestration Validation",
    description: "All workflow nodes validated for security compliance",
    severity: "info",
    action: "Validation passed",
    agent: "Orchestration Monitor",
  },
  {
    id: "SEC-005",
    timestamp: "2024-01-15T12:20:00Z",
    event: "Agent Behavior Alert",
    description: "Anomalous response patterns detected in Agent Ada",
    severity: "medium",
    action: "Behavioral analysis initiated",
    agent: "Behavioral Monitor",
  },
]

function getSeverityBadge(severity: string) {
  const variants = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    info: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  }

  return <Badge className={`${variants[severity as keyof typeof variants]} border`}>{severity.toUpperCase()}</Badge>
}

function getStatusIcon(status: string) {
  switch (status) {
    case "healthy":
      return <CheckCircle className="h-4 w-4 text-green-400" />
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-400" />
    case "critical":
      return <XCircle className="h-4 w-4 text-red-400" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-400" />
  }
}

function ThreatIntelFeed() {
  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Threat Intelligence Feed
        </CardTitle>
        <CardDescription className="text-blue-300">Real-time security alerts and threat detection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threatIntelData.map((threat) => (
            <div key={threat.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-slate-400">{threat.id}</span>
                  {getSeverityBadge(threat.severity)}
                </div>
                <span className="text-xs text-slate-500">{new Date(threat.timestamp).toLocaleString()}</span>
              </div>
              <h4 className="text-white font-medium mb-1">{threat.type}</h4>
              <p className="text-slate-300 text-sm mb-2">{threat.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Source: {threat.source}</span>
                <Badge variant="outline" className="text-xs">
                  {threat.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PIIScanResults() {
  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <FileSearch className="h-5 w-5" />
          PII Exposure Scanner
        </CardTitle>
        <CardDescription className="text-blue-300">
          Workflow scanning results for personally identifiable information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-cyan-400">Workflow</th>
                <th className="text-left py-2 text-cyan-400">PII Detected</th>
                <th className="text-left py-2 text-cyan-400">Risk Level</th>
                <th className="text-left py-2 text-cyan-400">Compliance</th>
                <th className="text-left py-2 text-cyan-400">Data Points</th>
              </tr>
            </thead>
            <tbody>
              {piiScanData.map((scan) => (
                <tr key={scan.workflowId} className="border-b border-slate-800">
                  <td className="py-3">
                    <div>
                      <div className="text-white font-medium">{scan.workflowName}</div>
                      <div className="text-xs text-slate-400">{scan.workflowId}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    {scan.piiDetected ? (
                      <div className="space-y-1">
                        <div className="text-orange-400">Yes</div>
                        <div className="text-xs text-slate-400">{scan.piiTypes.join(", ")}</div>
                      </div>
                    ) : (
                      <span className="text-green-400">No</span>
                    )}
                  </td>
                  <td className="py-3">{getSeverityBadge(scan.riskLevel)}</td>
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className={
                        scan.complianceStatus === "compliant"
                          ? "text-green-400 border-green-500/30"
                          : "text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {scan.complianceStatus.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-300">{scan.dataPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function OrchestrationValidator() {
  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Network className="h-5 w-5" />
          Orchestration Integrity Monitor
        </CardTitle>
        <CardDescription className="text-blue-300">Security validation status for all workflow nodes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {orchestrationData.map((node) => (
            <div key={node.nodeId} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(node.status)}
                  <div>
                    <h4 className="text-white font-medium">{node.nodeName}</h4>
                    <p className="text-xs text-slate-400">
                      {node.nodeId} • {node.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">{node.securityScore}%</div>
                  <div className="text-xs text-slate-400">Security Score</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Vulnerabilities</div>
                  <div className={`font-medium ${node.vulnerabilities === 0 ? "text-green-400" : "text-red-400"}`}>
                    {node.vulnerabilities}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Connected Workflows</div>
                  <div className="text-white font-medium">{node.connectedWorkflows}</div>
                </div>
                <div>
                  <div className="text-slate-400">Last Validation</div>
                  <div className="text-white font-medium">{new Date(node.lastValidation).toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SecurityEventTimeline() {
  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Security Event Timeline
        </CardTitle>
        <CardDescription className="text-blue-300">Chronological log of security findings and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {securityTimelineData.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                {index < securityTimelineData.length - 1 && <div className="w-px h-12 bg-slate-700 mt-2"></div>}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{event.event}</span>
                  {getSeverityBadge(event.severity)}
                </div>
                <p className="text-slate-300 text-sm mb-2">{event.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {new Date(event.timestamp).toLocaleString()} • {event.agent}
                  </span>
                  <span className="text-cyan-400">{event.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function SecurityAgentPage() {
  const { currentRole } = useRole()
  const router = useRouter()

  useEffect(() => {
    console.log("Loaded: SecurityAgentPage")

    // Role-based access control - only admin and ceo
    const normalizedRole = currentRole?.toLowerCase()
    if (normalizedRole !== "admin" && normalizedRole !== "ceo") {
      console.log(`Access denied: Role ${currentRole} not authorized for Security Agent`)
      router.push("/unauthorized")
      return
    }
  }, [currentRole, router])

  // Don't render if not authorized
  const normalizedRole = currentRole?.toLowerCase()

  // RBAC Logic for Erik-controlled Security
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isErikOwner = false // Erik is an agent, not a user role
  const isCEO = normalizedRole === "ceo"
  const canExecuteSecurityActions = !isReadOnlyAdmin && isCEO

  if (normalizedRole !== "admin" && normalizedRole !== "ceo") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Security Agent</h1>
            <p className="text-blue-300">Threat detection, PII validation, and orchestration security monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
              <Shield className="h-3 w-3 mr-1" />
              System Secure
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                      disabled={!canExecuteSecurityActions}
                    >
                      <Scan className="h-4 w-4 mr-2" />
                      Run Full Scan
                    </Button>
                  </div>
                </TooltipTrigger>
                {!canExecuteSecurityActions && (
                  <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                    <p className="text-cyan-300">Only Erik (Security Agent) or the CEO may perform this action.</p>
                    <p className="text-slate-400 text-xs">Admins have view-only access.</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#0f1a2c]/80 border border-cyan-500/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="threats"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Threat Intel
            </TabsTrigger>
            <TabsTrigger value="pii" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
              PII Scanner
            </TabsTrigger>
            <TabsTrigger
              value="orchestration"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              Orchestration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatIntelFeed />
              <PIIScanResults />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrchestrationValidator />
              <SecurityEventTimeline />
            </div>
          </TabsContent>

          <TabsContent value="threats">
            <ThreatIntelFeed />
          </TabsContent>

          <TabsContent value="pii">
            <PIIScanResults />
          </TabsContent>

          <TabsContent value="orchestration">
            <OrchestrationValidator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
