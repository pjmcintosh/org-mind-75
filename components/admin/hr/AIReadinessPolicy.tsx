"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Zap } from "lucide-react"

export function AIReadinessPolicy() {
  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30">
            <Shield className="h-6 w-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-purple-400">AI-First Organizational Policy</h3>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">CEO Directive</Badge>
            </div>
            <div className="space-y-3">
              <p className="text-white text-lg leading-relaxed">
                "This organization follows an <strong>AI-First policy</strong>. All roles are expected to evaluate AI
                applicability before pursuing manual or traditional methods."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-cyan-400 font-medium">Efficiency First</p>
                    <p className="text-cyan-200 text-sm">Leverage AI for optimal productivity</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Shield className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">Responsible Usage</p>
                    <p className="text-green-200 text-sm">Ethical AI implementation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-orange-400 font-medium">Continuous Learning</p>
                    <p className="text-orange-200 text-sm">Mandatory training compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
