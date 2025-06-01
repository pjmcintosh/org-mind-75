"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { performanceData, type AgentMetrics } from "@/mock/agent-performance"

interface CompactPerformanceTrendsProps {
  filteredAgents: AgentMetrics[]
}

export function CompactPerformanceTrends({ filteredAgents }: CompactPerformanceTrendsProps) {
  const [activeView, setActiveView] = useState<"tokens" | "requests">("tokens")

  // Filter performance data based on selected agents
  const filteredPerformanceData = performanceData.filter((item) =>
    filteredAgents.some((agent) => agent.name === item.agent),
  )

  // Transform data for the chart
  const chartData = filteredPerformanceData.reduce((acc, item) => {
    const existingDate = acc.find((d) => d.date === item.date)
    if (existingDate) {
      existingDate[`${item.agent}_tokens`] = item.tokens
      existingDate[`${item.agent}_requests`] = item.requests
    } else {
      acc.push({
        date: item.date,
        [`${item.agent}_tokens`]: item.tokens,
        [`${item.agent}_requests`]: item.requests,
      })
    }
    return acc
  }, [] as any[])

  const getChartConfig = () => {
    const config: any = {}
    filteredAgents.forEach((agent, index) => {
      const colorVar = `--chart-${(index % 4) + 1}`
      config[`${agent.name}_${activeView}`] = {
        label: agent.name,
        color: `hsl(var(${colorVar}))`,
      }
    })
    return config
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            Performance Trends
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={activeView === "tokens" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("tokens")}
            >
              Token Usage
            </Button>
            <Button
              variant={activeView === "requests" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("requests")}
            >
              Request Volume
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={getChartConfig()} className="h-[250px] max-h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {filteredAgents.map((agent) => (
                <Line
                  key={agent.name}
                  type="monotone"
                  dataKey={`${agent.name}_${activeView}`}
                  stroke={`var(--color-${agent.name}_${activeView})`}
                  name={agent.name}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
