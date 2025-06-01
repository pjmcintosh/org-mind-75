"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, AlertTriangle, Users, Activity, MessageSquare, Scan, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for Erik's profile
const agentOverview = {
  status: "Active",
  deployment: "Internal Security",
  specialization: "Threat Detection & Orchestration Monitoring",
  lastActive: "2024-01-16T10:30:00Z",
  threatsMonitored: 247,
  systemsProtected: 12,
  alertsGenerated: 18,
}

const recentInteractions = [
  {
    timestamp: "2024-01-16T10:15:00Z",
    activity: "Coordinated with Ephrya on suspicious user activity pattern",
    priority: "high",
    type: "coordination",
  },
  {
    timestamp: "2024-01-16T09:45:00Z",
    activity: "Shared PII risk assessment with Lexi for compliance review",
    priority: "medium",
    type: "collaboration",
  },
  {
    timestamp: "2024-01-16T09:30:00Z",
    activity: "Validated workflow integrity for user onboarding process",
    priority: "low",
    type: "validation",
  },
  {
    timestamp: "2024-01-16T09:00:00Z",
    activity: "Escalated authentication anomaly to Legal Agent",
    priority: "high",
    type: "escalation",
  },
]

const securityScope = [
  {
    area: "Orchestration Monitoring",
    description: "Real-time validation of agent workflows and system integrity",
    status: "active",
  },
  {
    area: "Threat Intelligence",
    description: "Continuous monitoring for security threats and vulnerabilities",
    status: "active",
  },
  {
    area: "PII Protection",
    description: "Data privacy compliance and personally identifiable information security",
    status: "active",
  },
  {
    area: "Cross-Agent Security",
    description: "Coordination with Ephrya, Lexi, and Legal Agent for comprehensive protection",
    status: "active",
  },
]

const crossAgentLinks = [
  {
    agent: "Ephrya",
    relationship: "Primary Orchestrator",
    lastInteraction: "2024-01-16T10:15:00Z",
    status: "active",
  },
  {
    agent: "Lexi",
    relationship: "Compliance Coordinator",
    lastInteraction: "2024-01-16T09:45:00Z",
    status: "active",
  },
  {
    agent: "Legal Agent",
    relationship: "Risk Escalation",
    lastInteraction: "2024-01-16T09:00:00Z",
    status: "active",
  },
]

const recentScans = [
  {
    scanType: "System Integrity Check",
    timestamp: "2024-01-16T10:00:00Z",
    result: "Clean",
    itemsScanned: 1247,
  },
  {
    scanType: "PII Risk Assessment",
    timestamp: "2024-01-16T09:30:00Z",
    result: "5 Medium Risk Items",
    itemsScanned: 892,
  },
  {
    scanType: "Workflow Validation",
    timestamp: "2024-01-16T09:00:00Z",
    result: "2 Anomalies Detected",
    itemsScanned: 156,
  },
  {
    scanType: "Threat Intelligence Sweep",
    timestamp: "2024-01-16T08:30:00Z",
    result: "Clean",
    itemsScanned: 2341,
  },
]

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "medium":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "low":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

function getResultColor(result: string) {
  if (result === "Clean") {
    return "text-green-400"
  } else if (result.includes("Medium") || result.includes("Anomalies")) {
    return "text-orange-400"
  } else {
    return "text-red-400"
  }
}

export default function ErikAgentPage() {
  console.log("Loaded: ErikAgentPage")

  useEffect(() => {
    console.log("Loaded: Erik Internal Security Agent profile page")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950/30 to-slate-900 text-white px-6 py-10 max-w-screen-xl mx-auto">
      {/* Agent Profile Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-6">
          <Avatar className="h-24 w-24 ring-4 ring-red-400/50 ring-offset-4 ring-offset-slate-900">
            <AvatarImage src="/erik-avatar.png" alt="Erik" />
            <AvatarFallback className="bg-red-500/20 text-red-400 text-2xl font-bold">
              <Shield className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
              Erik
            </h1>
            <p className="text-xl text-red-300 mb-4">Internal Security Agent</p>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              Monitors orchestration threats, oversees Security Dashboard, and coordinates with Ephrya, Lexi, and Legal
              Agent for real-time system protection.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">Active</Badge>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">Internal Security</Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 border">Threat Monitor</Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 border">New</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Agent Overview */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Agent Overview
            </CardTitle>
            <CardDescription className="text-red-300">Core security functions and operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-slate-400 text-sm">Status</div>
                <div className="text-green-400 font-semibold">{agentOverview.status}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Deployment</div>
                <div className="text-white font-semibold">{agentOverview.deployment}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Specialization</div>
                <div className="text-white font-semibold">{agentOverview.specialization}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Last Active</div>
                <div className="text-white font-semibold">{new Date(agentOverview.lastActive).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Threats Monitored</div>
                <div className="text-red-400 font-semibold">{agentOverview.threatsMonitored}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Systems Protected</div>
                <div className="text-green-400 font-semibold">{agentOverview.systemsProtected}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Alerts Generated</div>
                <div className="text-orange-400 font-semibold">{agentOverview.alertsGenerated}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Operations Center */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Security Operations Center
            </CardTitle>
            <CardDescription className="text-red-300">
              Centralized security monitoring and threat management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-slate-300 text-lg leading-relaxed">
                Erik serves as the platform's security overseer. He actively manages the Security Dashboard, where
                threats, orchestration risks, and PII compliance are monitored.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/admin/security-agent">
                  <Button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 border">
                    <Shield className="h-4 w-4 mr-2" />
                    Access Security Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-2">Dashboard Features</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Real-time threat monitoring</li>
                    <li>• Orchestration validation</li>
                    <li>• PII risk assessment</li>
                    <li>• Security event timeline</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <h4 className="text-white font-medium mb-2">Integration Points</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Ephrya orchestration feeds</li>
                    <li>• Lexi compliance coordination</li>
                    <li>• Legal Agent risk escalation</li>
                    <li>• System-wide monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Scope */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Security Scope
            </CardTitle>
            <CardDescription className="text-red-300">Areas of responsibility and monitoring coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {securityScope.map((scope, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{scope.area}</h4>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
                      {scope.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm">{scope.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cross-Agent Links */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Cross-Agent Links
            </CardTitle>
            <CardDescription className="text-red-300">Security coordination with other system agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {crossAgentLinks.map((link, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium">{link.agent}</h4>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 border">
                        {link.relationship}
                      </Badge>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
                      {link.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-slate-400 text-sm">
                    Last Interaction: {new Date(link.lastInteraction).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Interactions */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Interactions
            </CardTitle>
            <CardDescription className="text-red-300">
              Latest security activities and system coordination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getPriorityColor(interaction.priority)} border`}>
                        {interaction.priority.toUpperCase()}
                      </Badge>
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 border">
                        {interaction.type.toUpperCase()}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(interaction.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-300 text-sm">{interaction.activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Scan className="h-5 w-5" />
              Recent Scans
            </CardTitle>
            <CardDescription className="text-red-300">Latest security scans and validation results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{scan.scanType}</h4>
                    <span className="text-xs text-slate-500">{new Date(scan.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Result</div>
                      <div className={`font-medium ${getResultColor(scan.result)}`}>{scan.result}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Items Scanned</div>
                      <div className="text-white font-medium">{scan.itemsScanned.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
