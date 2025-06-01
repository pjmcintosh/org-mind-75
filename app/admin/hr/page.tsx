"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, TrendingUp, Shield, AlertTriangle } from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { TrainingModuleList } from "@/components/admin/hr/TrainingModuleList"
import { RoleReadinessTable } from "@/components/admin/hr/RoleReadinessTable"
import { AdoptionTrendChart } from "@/components/admin/hr/AdoptionTrendChart"
import { AIReadinessPolicy } from "@/components/admin/hr/AIReadinessPolicy"
import { humanLabels } from "@/lib/humanLabels"

export default function HRDashboardPage() {
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const normalizedRole = currentRole.toLowerCase()

  // RBAC Logic
  const isReadOnlyAdmin = normalizedRole === "admin"
  const isHRAgent = normalizedRole === "shandry" || normalizedRole === "hr"
  const isCEO = normalizedRole === "ceo"
  const canExecuteActions = !isReadOnlyAdmin && (isHRAgent || isCEO)

  useEffect(() => {
    console.log("Loaded: HRDashboard")
  }, [])

  // Mock statistics
  const stats = {
    totalEmployees: 47,
    aiTrainingComplete: 32,
    averageReadiness: 78,
    criticalRoles: 3,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <Users className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">
                    {humanLabels?.headers?.hrDashboard || "HR Dashboard"}
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    {humanLabels?.descriptions?.hrDashboard || "AI Training Oversight & Cultural Adoption Management"}
                  </CardDescription>
                  <div className="mt-2 text-sm text-blue-200">
                    {humanLabels?.onboarding?.shandry || "Shandry manages HR and helps our team grow and develop."}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Controlled by: HR Agent (Shandry)
                </Badge>
                <Badge className={`${roleInfo.color} flex items-center gap-2`}>
                  <span>{roleInfo.icon}</span>
                  {roleInfo.label}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Total Employees</p>
                  <p className="text-2xl font-bold text-white">{stats.totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">AI Training Complete</p>
                  <p className="text-2xl font-bold text-green-400">{stats.aiTrainingComplete}</p>
                  <p className="text-xs text-green-300">
                    {Math.round((stats.aiTrainingComplete / stats.totalEmployees) * 100)}% completion
                  </p>
                </div>
                <GraduationCap className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Average Readiness</p>
                  <p className="text-2xl font-bold text-cyan-400">{stats.averageReadiness}%</p>
                  <p className="text-xs text-cyan-300">Across all roles</p>
                </div>
                <TrendingUp className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Critical Roles</p>
                  <p className="text-2xl font-bold text-orange-400">{stats.criticalRoles}</p>
                  <p className="text-xs text-orange-300">Need attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Readiness Policy */}
        <AIReadinessPolicy />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Training Modules */}
          <div className="space-y-6">
            <TrainingModuleList canExecuteActions={canExecuteActions} />
          </div>

          {/* Role Readiness & Trends */}
          <div className="space-y-6">
            <RoleReadinessTable canExecuteActions={canExecuteActions} />
            <AdoptionTrendChart />
          </div>
        </div>

        {/* Read-Only Admin Notice */}
        {isReadOnlyAdmin && (
          <Card className="bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-orange-300 font-medium">Admin View-Only Access</p>
                  <p className="text-orange-200 text-sm">
                    Only the HR Agent (Shandry) or CEO may modify training programs and readiness assessments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
