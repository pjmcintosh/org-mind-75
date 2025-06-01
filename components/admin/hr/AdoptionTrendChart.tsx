"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp } from "lucide-react"

interface AdoptionData {
  month: string
  overall: number
  ceo: number
  admin: number
  developer: number
  analyst: number
  manager: number
  client: number
}

export function AdoptionTrendChart() {
  const [selectedRole, setSelectedRole] = useState("overall")

  const adoptionData: AdoptionData[] = [
    {
      month: "Aug 2023",
      overall: 15,
      ceo: 45,
      admin: 25,
      developer: 35,
      analyst: 10,
      manager: 5,
      client: 2,
    },
    {
      month: "Sep 2023",
      overall: 28,
      ceo: 65,
      admin: 40,
      developer: 55,
      analyst: 20,
      manager: 12,
      client: 8,
    },
    {
      month: "Oct 2023",
      overall: 42,
      ceo: 78,
      admin: 58,
      developer: 72,
      analyst: 35,
      manager: 25,
      client: 15,
    },
    {
      month: "Nov 2023",
      overall: 56,
      ceo: 85,
      admin: 68,
      developer: 85,
      analyst: 48,
      manager: 38,
      client: 22,
    },
    {
      month: "Dec 2023",
      overall: 67,
      ceo: 92,
      admin: 75,
      developer: 89,
      analyst: 62,
      manager: 45,
      client: 28,
    },
    {
      month: "Jan 2024",
      overall: 78,
      ceo: 95,
      admin: 84,
      developer: 91,
      analyst: 73,
      manager: 58,
      client: 34,
    },
  ]

  const roleColors = {
    overall: "#06b6d4",
    ceo: "#a855f7",
    admin: "#ef4444",
    developer: "#3b82f6",
    analyst: "#10b981",
    manager: "#f59e0b",
    client: "#6b7280",
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "overall":
        return "Overall Organization"
      case "ceo":
        return "CEO"
      case "admin":
        return "Admin"
      case "developer":
        return "Developer"
      case "analyst":
        return "Analyst"
      case "manager":
        return "Manager"
      case "client":
        return "Client"
      default:
        return role
    }
  }

  const currentValue = adoptionData[adoptionData.length - 1][selectedRole as keyof AdoptionData]
  const previousValue = adoptionData[adoptionData.length - 2][selectedRole as keyof AdoptionData]
  const growth = currentValue - previousValue

  return (
    <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-cyan-400" />
            <div>
              <CardTitle className="text-cyan-400">AI Adoption Trends</CardTitle>
              <p className="text-sm text-blue-300">Monthly adoption progress by role</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30">+{growth}% this month</Badge>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-cyan-500/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-cyan-500/30">
                <SelectItem value="overall">Overall Organization</SelectItem>
                <SelectItem value="ceo">CEO</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adoptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #06b6d4",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
              <Legend />
              {selectedRole === "overall" ? (
                <>
                  <Line
                    type="monotone"
                    dataKey="overall"
                    stroke={roleColors.overall}
                    strokeWidth={3}
                    name="Overall"
                    dot={{ fill: roleColors.overall, strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ceo"
                    stroke={roleColors.ceo}
                    strokeWidth={2}
                    name="CEO"
                    dot={{ fill: roleColors.ceo, strokeWidth: 2, r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="developer"
                    stroke={roleColors.developer}
                    strokeWidth={2}
                    name="Developer"
                    dot={{ fill: roleColors.developer, strokeWidth: 2, r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="analyst"
                    stroke={roleColors.analyst}
                    strokeWidth={2}
                    name="Analyst"
                    dot={{ fill: roleColors.analyst, strokeWidth: 2, r: 3 }}
                  />
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey={selectedRole}
                  stroke={roleColors[selectedRole as keyof typeof roleColors]}
                  strokeWidth={3}
                  name={getRoleLabel(selectedRole)}
                  dot={{
                    fill: roleColors[selectedRole as keyof typeof roleColors],
                    strokeWidth: 2,
                    r: 5,
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
