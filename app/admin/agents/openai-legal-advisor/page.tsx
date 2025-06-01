"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scale, ExternalLink, Shield, Globe, AlertTriangle, Clock, Lock, FileCheck, Bot } from "lucide-react"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"

export default function OpenAILegalAdvisorProfilePage() {
  console.log("Loaded: OpenAI Legal Advisor profile with standardized layout")

  const recentDocuments = [
    {
      id: 1,
      title: "Client Partnership NDA",
      type: "Non-Disclosure Agreement",
      date: "2024-01-26",
      status: "Reviewed",
      confidence: 92,
      issues: 2,
    },
    {
      id: 2,
      title: "Software License Agreement",
      type: "Contract",
      date: "2024-01-25",
      status: "Flagged",
      confidence: 78,
      issues: 5,
    },
    {
      id: 3,
      title: "Employment Contract Template",
      type: "Template",
      date: "2024-01-24",
      status: "Approved",
      confidence: 96,
      issues: 0,
    },
  ]

  const jurisdictions = [
    {
      id: 1,
      name: "United States",
      status: "Primary",
      issues: "None",
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      name: "European Union",
      status: "Active",
      issues: "GDPR Compliance",
      lastUpdated: "2024-01-15",
    },
    {
      id: 3,
      name: "United Kingdom",
      status: "Active",
      issues: "Post-Brexit Regulations",
      lastUpdated: "2024-01-10",
    },
    {
      id: 4,
      name: "Canada",
      status: "Limited",
      issues: "Provincial Variations",
      lastUpdated: "2023-12-28",
    },
  ]

  const autonomyLimitations = [
    "Cannot provide legal advice constituting attorney-client relationship",
    "Limited to document review and template generation",
    "Requires human review for all final documents",
    "Cannot represent clients in legal proceedings",
    "Limited to jurisdictions with approved training data",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      <AgentProfileHeader
        name="OpenAI Legal Advisor"
        role="Third-Party Legal Assistant"
        avatarSrc="/openai-legal-advisor-avatar.png"
        fallbackInitials="OA"
        description="Assists with contract analysis, NDA generation, and legal language review using external AI."
        statusBadges={["External", "Limited Autonomy", "Legal"]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Recent Documents Reviewed */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Recent Documents Reviewed
            </CardTitle>
            <CardDescription className="text-blue-300">Legal documents analyzed in the past 7 days</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2 space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-3 border border-slate-700/50 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{doc.title}</h4>
                    <p className="text-sm text-slate-300">{doc.type}</p>
                  </div>
                  <Badge
                    className={`
                      ${
                        doc.status === "Approved"
                          ? "bg-green-500/20 text-green-300"
                          : doc.status === "Flagged"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-blue-500/20 text-blue-300"
                      }
                    `}
                  >
                    {doc.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-slate-300">{doc.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="text-slate-300">{doc.confidence}% confidence</span>
                    </div>
                    {doc.issues > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-slate-300">{doc.issues} issues</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70"
            >
              View All Documents
            </Button>
          </CardContent>
        </Card>

        {/* Jurisdictional Insights */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Jurisdictional Insights
            </CardTitle>
            <CardDescription className="text-blue-300">
              Cross-border legal coverage and compliance status
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2">
            <div className="grid grid-cols-1 gap-3">
              {jurisdictions.map((jurisdiction) => (
                <div
                  key={jurisdiction.id}
                  className="flex items-center justify-between p-3 border border-slate-700/50 rounded-lg bg-slate-800/30"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`
                        ${
                          jurisdiction.status === "Primary"
                            ? "bg-cyan-500/20 text-cyan-300"
                            : jurisdiction.status === "Active"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-slate-500/20 text-slate-300"
                        }
                      `}
                    >
                      {jurisdiction.status}
                    </Badge>
                    <div>
                      <h4 className="font-medium text-white">{jurisdiction.name}</h4>
                      <p className="text-xs text-slate-400">Updated: {jurisdiction.lastUpdated}</p>
                    </div>
                  </div>
                  <div>
                    <p className={`text-sm ${jurisdiction.issues === "None" ? "text-green-300" : "text-amber-300"}`}>
                      {jurisdiction.issues}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Autonomy Level */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Autonomy Level
            </CardTitle>
            <CardDescription className="text-blue-300">Operational limitations and required oversight</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">Current Autonomy Level</span>
                <Badge className="bg-amber-500/20 text-amber-300">Limited</Badge>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                <div className="bg-amber-500/70 h-2.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Restricted</span>
                <span>Limited</span>
                <span>Supervised</span>
                <span>Full</span>
              </div>
            </div>

            <h4 className="font-medium text-white mb-2">Operational Limitations</h4>
            <ul className="space-y-2">
              {autonomyLimitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">{limitation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* OpenAI Terms Link */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <Bot className="h-5 w-5" />
              OpenAI Terms & Compliance
            </CardTitle>
            <CardDescription className="text-blue-300">
              External service integration details and compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pt-2">
            <div className="p-3 border border-slate-700/50 rounded-lg bg-slate-800/30 mb-4">
              <div className="flex items-start gap-3">
                <ExternalLink className="h-5 w-5 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">External Service Integration</h4>
                  <p className="text-sm text-slate-300 mt-1">
                    This agent operates through secure API integration with OpenAI's legal models. All data is processed
                    according to OpenAI's enterprise data handling policies.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">Compliance Status</span>
              </div>
              <Badge className="bg-green-500/20 text-green-300">Compliant</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 border border-slate-700/50 rounded-lg bg-slate-800/30 text-center">
                <p className="text-xs text-slate-400">Last Audit</p>
                <p className="text-sm font-medium text-white">January 15, 2024</p>
              </div>
              <div className="p-2 border border-slate-700/50 rounded-lg bg-slate-800/30 text-center">
                <p className="text-xs text-slate-400">Next Review</p>
                <p className="text-sm font-medium text-white">April 15, 2024</p>
              </div>
              <div className="p-2 border border-slate-700/50 rounded-lg bg-slate-800/30 text-center">
                <p className="text-xs text-slate-400">Data Retention</p>
                <p className="text-sm font-medium text-white">30 Days</p>
              </div>
              <div className="p-2 border border-slate-700/50 rounded-lg bg-slate-800/30 text-center">
                <p className="text-xs text-slate-400">API Version</p>
                <p className="text-sm font-medium text-white">v4.2.1</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 border-slate-700 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View OpenAI Terms of Service
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
