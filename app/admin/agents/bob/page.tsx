"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUserRole } from "@/hooks/use-user-role"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"
import { FileText, CheckCircle, Clock, Users, ArrowRight, AlertCircle, Calendar, MessageSquare } from "lucide-react"

export default function BobProfilePage() {
  const { role } = useUserRole()
  const canEdit = role === "admin"

  useEffect(() => {
    console.log("Loaded: BobProfilePage with standardized layout")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      <AgentProfileHeader
        name="Bob"
        role="Client Intake Specialist"
        avatarSrc="/bob-avatar.png"
        fallbackInitials="B"
        description="Responsible for collecting and validating client intake data before project initiation."
        statusBadges={["Active", "External-Facing", "Client Workflow"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Intakes */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Intakes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">TechCorp Legal Review</h4>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Complete
                  </Badge>
                </div>
                <p className="text-blue-300 text-sm mb-2">Contract analysis and compliance review</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />2 hours ago
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Handed to Ada
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">StartupXYZ Onboarding</h4>
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    In Progress
                  </Badge>
                </div>
                <p className="text-blue-300 text-sm mb-2">Initial client documentation and requirements</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />4 hours ago
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Pending validation
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">GlobalCorp Merger</h4>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Queued
                  </Badge>
                </div>
                <p className="text-blue-300 text-sm mb-2">Due diligence and regulatory compliance</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />6 hours ago
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Awaiting assignment
                  </span>
                </div>
              </div>
            </div>

            {canEdit && (
              <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                View All Intakes
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Validation History */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Validation History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Document completeness check</p>
                  <p className="text-slate-400 text-xs">TechCorp Legal Review - All required docs present</p>
                </div>
                <span className="text-xs text-slate-400">2h ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Client information verification</p>
                  <p className="text-slate-400 text-xs">StartupXYZ - Pending additional contact details</p>
                </div>
                <span className="text-xs text-slate-400">4h ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Compliance requirements check</p>
                  <p className="text-slate-400 text-xs">GlobalCorp - Initial screening complete</p>
                </div>
                <span className="text-xs text-slate-400">6h ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Risk assessment validation</p>
                  <p className="text-slate-400 text-xs">MidSize Corp - Low risk profile confirmed</p>
                </div>
                <span className="text-xs text-slate-400">1d ago</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-600/30">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Validation Rate</span>
                <span className="text-green-400">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collaboration with Ada */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Collaboration with Ada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Handoffs Today</h4>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      3
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">Projects transferred to strategic planning</p>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Pending Reviews</h4>
                    <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      2
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">Awaiting Ada's strategic assessment</p>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Success Rate</h4>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      96%
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">Successful handoff completion rate</p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-blue-300 font-medium">Recent Handoff Log</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                    <div className="flex-1">
                      <span className="text-white text-sm">TechCorp Legal Review</span>
                      <span className="text-slate-400 text-xs ml-2">→ Ada (Strategic Planning)</span>
                    </div>
                    <span className="text-xs text-slate-400">2h ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                    <div className="flex-1">
                      <span className="text-white text-sm">MidSize Corp Expansion</span>
                      <span className="text-slate-400 text-xs ml-2">→ Ada (Risk Assessment)</span>
                    </div>
                    <span className="text-xs text-slate-400">5h ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                    <div className="flex-1">
                      <span className="text-white text-sm">RetailChain Compliance</span>
                      <span className="text-slate-400 text-xs ml-2">→ Ada (Compliance Review)</span>
                    </div>
                    <span className="text-xs text-slate-400">1d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
