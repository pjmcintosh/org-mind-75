import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Activity, Clock } from "lucide-react"
import Link from "next/link"

export default function LexiAgentPage() {
  console.log("Loaded: LexiAgentPage")

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto space-y-6">
      {/* Cinematic Agent Header */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center ring-4 ring-cyan-300/50 overflow-hidden">
              <img
                src="/lexi-avatar.png"
                alt="Lexi avatar"
                className="w-full h-full object-cover object-center"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent text-3xl font-bold">
                Lexi
              </h1>
              <p className="text-cyan-300 text-lg mt-1">Compliance & Audit Agent</p>
              <p className="text-blue-300 text-sm">AWS-Leased • Dynamic Audit System</p>
            </div>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-lg px-4 py-2">Active</Badge>
        </div>
      </Card>

      {/* Agent Overview */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 p-4">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Agent Overview
          </CardTitle>
          <CardDescription className="text-blue-300">
            Specialized compliance monitoring and regulatory audit management.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-white text-sm space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-cyan-300 font-medium">Primary Function</p>
              <p className="text-blue-200">Regulatory Compliance Monitoring</p>
            </div>
            <div>
              <p className="text-cyan-300 font-medium">Specialization</p>
              <p className="text-blue-200">SOC2, GDPR, EU AI Act, ISO 27001</p>
            </div>
            <div>
              <p className="text-cyan-300 font-medium">Deployment</p>
              <p className="text-blue-200">AWS-Leased Infrastructure</p>
            </div>
            <div>
              <p className="text-cyan-300 font-medium">Status</p>
              <p className="text-green-400">Operational • Real-time Monitoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Interactions */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 p-4">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Interactions
          </CardTitle>
          <CardDescription className="text-blue-300">
            Latest compliance activities and system interactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-white text-sm space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-cyan-500/10 rounded">
              <span className="text-blue-200">Completed SOC2 audit scan for Max agent</span>
              <span className="text-cyan-400 text-xs">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded">
              <span className="text-blue-200">Flagged GDPR compliance drift in Bob's data handling</span>
              <span className="text-cyan-400 text-xs">4 hours ago</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-500/10 rounded">
              <span className="text-blue-200">Generated compliance report for Q4 audit</span>
              <span className="text-cyan-400 text-xs">6 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DAS Responsibilities */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 p-4">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-semibold">
            Dynamic Audit System (DAS) Responsibilities
          </CardTitle>
          <CardDescription className="text-blue-300">
            Core functions within the organizational compliance framework.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-white text-sm space-y-3">
          <ul className="list-disc list-inside space-y-2 text-blue-200">
            <li>Real-time regulatory compliance monitoring across all agents</li>
            <li>Automated audit trail generation and evidence collection</li>
            <li>Regulatory drift detection and early warning systems</li>
            <li>Multi-standard compliance validation (SOC2, GDPR, EU AI Act, ISO 27001)</li>
            <li>Audit readiness assessment and gap analysis</li>
            <li>Compliance posture reporting and executive briefings</li>
          </ul>
        </CardContent>
      </Card>

      {/* Compliance Dashboard Delegation */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 p-4">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-semibold">Compliance Operations Center</CardTitle>
          <CardDescription className="text-blue-300">Centralized compliance management and monitoring.</CardDescription>
        </CardHeader>
        <CardContent className="text-white text-sm space-y-4">
          <p className="text-blue-200 leading-relaxed">
            Lexi monitors and manages all system compliance activities via the Compliance Dashboard. All compliance
            events, audit logs, and posture reviews are handled through her dashboard.
          </p>
          <div className="flex gap-3">
            <Link href="/admin/compliance">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Access Compliance Dashboard
              </Button>
            </Link>
          </div>
          <div className="text-xs text-blue-300 mt-2">
            Dashboard includes: DAS monitoring, agent compliance status, regulatory drift detection, and audit timeline.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
