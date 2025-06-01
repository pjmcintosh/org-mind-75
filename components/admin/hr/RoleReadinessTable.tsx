"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"

interface RoleReadiness {
  role: string
  totalEmployees: number
  curriculumCompleted: number
  readinessScore: number
  riskLevel: "low" | "medium" | "high"
  lastAssessment: string
  criticalGaps: string[]
}

interface RoleReadinessTableProps {
  canExecuteActions: boolean
}

export function RoleReadinessTable({ canExecuteActions }: RoleReadinessTableProps) {
  const [roleData] = useState<RoleReadiness[]>([
    {
      role: "CEO",
      totalEmployees: 1,
      curriculumCompleted: 85,
      readinessScore: 92,
      riskLevel: "low",
      lastAssessment: "2024-01-20",
      criticalGaps: [],
    },
    {
      role: "Admin",
      totalEmployees: 3,
      curriculumCompleted: 78,
      readinessScore: 84,
      riskLevel: "low",
      lastAssessment: "2024-01-18",
      criticalGaps: ["AI Ethics"],
    },
    {
      role: "Developer",
      totalEmployees: 8,
      curriculumCompleted: 89,
      readinessScore: 91,
      riskLevel: "low",
      lastAssessment: "2024-01-22",
      criticalGaps: [],
    },
    {
      role: "Analyst",
      totalEmployees: 12,
      curriculumCompleted: 67,
      readinessScore: 73,
      riskLevel: "medium",
      lastAssessment: "2024-01-19",
      criticalGaps: ["Prompt Engineering", "Automation Workflows"],
    },
    {
      role: "Manager",
      totalEmployees: 6,
      curriculumCompleted: 45,
      readinessScore: 58,
      riskLevel: "high",
      lastAssessment: "2024-01-15",
      criticalGaps: ["AI Leadership", "Automation Workflows", "AI Ethics"],
    },
    {
      role: "Client",
      totalEmployees: 15,
      curriculumCompleted: 23,
      readinessScore: 34,
      riskLevel: "high",
      lastAssessment: "2024-01-10",
      criticalGaps: ["AI Fundamentals", "AI Ethics"],
    },
    {
      role: "Agent Authority",
      totalEmployees: 3,
      curriculumCompleted: 95,
      readinessScore: 97,
      riskLevel: "low",
      lastAssessment: "2024-01-22",
      criticalGaps: [],
    },
  ])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-400/30"
    }
  }

  const getReadinessColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-cyan-400" />
            <div>
              <CardTitle className="text-cyan-400">AI Readiness by Role</CardTitle>
              <p className="text-sm text-blue-300">Training completion and readiness assessment</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-300"
                  disabled={!canExecuteActions}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reassess All
                </Button>
              </TooltipTrigger>
              {!canExecuteActions && (
                <TooltipContent>
                  <p>
                    Only the HR Agent (Shandry) or CEO may trigger readiness assessments. Admins have view-only access.
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-cyan-500/20">
              <TableHead className="text-cyan-300">Role</TableHead>
              <TableHead className="text-cyan-300">Employees</TableHead>
              <TableHead className="text-cyan-300">Curriculum</TableHead>
              <TableHead className="text-cyan-300">Readiness</TableHead>
              <TableHead className="text-cyan-300">Risk Level</TableHead>
              <TableHead className="text-cyan-300">Last Assessment</TableHead>
              <TableHead className="text-cyan-300">Critical Gaps</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roleData.map((role) => (
              <TableRow key={role.role} className="border-cyan-500/10">
                <TableCell className="font-medium text-white">{role.role}</TableCell>
                <TableCell className="text-slate-300">{role.totalEmployees}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{role.curriculumCompleted}%</span>
                    </div>
                    <Progress value={role.curriculumCompleted} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${getReadinessColor(role.readinessScore)}`}>
                      {role.readinessScore}%
                    </span>
                    {role.readinessScore >= 80 && <CheckCircle className="h-4 w-4 text-green-400" />}
                    {role.readinessScore < 60 && <AlertTriangle className="h-4 w-4 text-red-400" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRiskColor(role.riskLevel)}>{role.riskLevel}</Badge>
                </TableCell>
                <TableCell className="text-slate-300">{formatDate(role.lastAssessment)}</TableCell>
                <TableCell>
                  {role.criticalGaps.length > 0 ? (
                    <div className="space-y-1">
                      {role.criticalGaps.slice(0, 2).map((gap) => (
                        <Badge key={gap} variant="outline" className="text-xs border-orange-500/30 text-orange-300">
                          {gap}
                        </Badge>
                      ))}
                      {role.criticalGaps.length > 2 && (
                        <Badge variant="outline" className="text-xs border-slate-500/30 text-slate-400">
                          +{role.criticalGaps.length - 2} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">No gaps</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
