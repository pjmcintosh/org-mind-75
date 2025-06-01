"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { performanceData } from "@/mock/agent-performance"

export function PerformanceTrends() {
  // Transform data for the chart
  const chartData = performanceData.reduce((acc, item) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Token Usage Trends */}
          <div>
            <h3 className="text-sm font-medium mb-3">Token Usage Over Time</h3>
            <ChartContainer
              config={{
                Bob_tokens: { label: "Bob", color: "hsl(var(--chart-1))" },
                Max_tokens: { label: "Max", color: "hsl(var(--chart-2))" },
                Ada_tokens: { label: "Ada", color: "hsl(var(--chart-3))" },
                Eve_tokens: { label: "Eve", color: "hsl(var(--chart-4))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="Bob_tokens" stroke="var(--color-Bob_tokens)" name="Bob" />
                  <Line type="monotone" dataKey="Max_tokens" stroke="var(--color-Max_tokens)" name="Max" />
                  <Line type="monotone" dataKey="Ada_tokens" stroke="var(--color-Ada_tokens)" name="Ada" />
                  <Line type="monotone" dataKey="Eve_tokens" stroke="var(--color-Eve_tokens)" name="Eve" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Request Volume Trends */}
          <div>
            <h3 className="text-sm font-medium mb-3">Request Volume Over Time</h3>
            <ChartContainer
              config={{
                Bob_requests: { label: "Bob", color: "hsl(var(--chart-1))" },
                Max_requests: { label: "Max", color: "hsl(var(--chart-2))" },
                Ada_requests: { label: "Ada", color: "hsl(var(--chart-3))" },
                Eve_requests: { label: "Eve", color: "hsl(var(--chart-4))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="Bob_requests" stroke="var(--color-Bob_requests)" name="Bob" />
                  <Line type="monotone" dataKey="Max_requests" stroke="var(--color-Max_requests)" name="Max" />
                  <Line type="monotone" dataKey="Ada_requests" stroke="var(--color-Ada_requests)" name="Ada" />
                  <Line type="monotone" dataKey="Eve_requests" stroke="var(--color-Eve_requests)" name="Eve" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
