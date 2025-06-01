"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, HelpCircle, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { type WorkflowCondition, metricOptions } from "@/mock/workflow-rules"

interface ConditionBuilderProps {
  conditions: WorkflowCondition[]
  onChange: (conditions: WorkflowCondition[]) => void
}

export function ConditionBuilder({ conditions, onChange }: ConditionBuilderProps) {
  const [jsonPreview, setJsonPreview] = useState(false)

  const addCondition = () => {
    const newCondition: WorkflowCondition = {
      id: `c${Date.now()}`,
      metric: "",
      comparator: "=",
      value: "",
      logicalOperator: conditions.length > 0 ? "AND" : undefined,
    }
    onChange([...conditions, newCondition])
  }

  const updateCondition = (id: string, field: keyof WorkflowCondition, value: any) => {
    const updated = conditions.map((condition) => (condition.id === id ? { ...condition, [field]: value } : condition))
    onChange(updated)
  }

  const removeCondition = (id: string) => {
    const filtered = conditions.filter((condition) => condition.id !== id)
    // Remove logical operator from first condition if it exists
    if (filtered.length > 0 && filtered[0].logicalOperator) {
      filtered[0] = { ...filtered[0], logicalOperator: undefined }
    }
    onChange(filtered)
  }

  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(conditions, null, 2))
    console.log("Conditions JSON copied to clipboard")
  }

  const getMetricInfo = (metricValue: string) => {
    return metricOptions.find((option) => option.value === metricValue)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Workflow Conditions</h4>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setJsonPreview(!jsonPreview)}>
            {jsonPreview ? "Hide" : "Show"} JSON
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={addCondition} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Condition
          </Button>
        </div>
      </div>

      {conditions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground mb-4">No conditions defined</p>
            <Button onClick={addCondition} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add First Condition
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {conditions.map((condition, index) => {
            const metricInfo = getMetricInfo(condition.metric)

            return (
              <Card key={condition.id} className="p-4">
                <div className="flex items-center gap-3">
                  {/* Logical Operator */}
                  {index > 0 && (
                    <Select
                      value={condition.logicalOperator || "AND"}
                      onValueChange={(value) => updateCondition(condition.id, "logicalOperator", value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {/* Metric */}
                  <div className="flex-1">
                    <Select
                      value={condition.metric}
                      onValueChange={(value) => updateCondition(condition.id, "metric", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Performance</div>
                          {metricOptions
                            .filter((m) =>
                              ["tokenUsage", "requestCount", "responseTime", "errorRate"].includes(m.value),
                            )
                            .map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                        </div>
                        <div className="p-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Financial</div>
                          {metricOptions
                            .filter((m) =>
                              ["projectBudget", "costPerToken", "totalCost", "budgetRemaining"].includes(m.value),
                            )
                            .map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                        </div>
                        <div className="p-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Status</div>
                          {metricOptions
                            .filter((m) =>
                              ["agentStatus", "taskStatus", "projectStatus", "approvalStatus"].includes(m.value),
                            )
                            .map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                        </div>
                        <div className="p-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Quality</div>
                          {metricOptions
                            .filter((m) =>
                              ["confidenceScore", "successRate", "userRating", "completionRate"].includes(m.value),
                            )
                            .map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Comparator */}
                  <Select
                    value={condition.comparator}
                    onValueChange={(value) => updateCondition(condition.id, "comparator", value as any)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value=">">&gt;</SelectItem>
                      <SelectItem value="<">&lt;</SelectItem>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="!=">!=</SelectItem>
                      <SelectItem value=">=">&gt;=</SelectItem>
                      <SelectItem value="<=">&lt;=</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Value */}
                  <div className="flex-1">
                    <Input
                      type={metricInfo?.type === "number" ? "number" : "text"}
                      placeholder={metricInfo?.type === "number" ? "Enter number" : "Enter value"}
                      value={condition.value}
                      onChange={(e) =>
                        updateCondition(
                          condition.id,
                          "value",
                          metricInfo?.type === "number" ? Number(e.target.value) : e.target.value,
                        )
                      }
                    />
                  </div>

                  {/* Help */}
                  {metricInfo && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{metricInfo.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {/* Remove */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(condition.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* JSON Preview */}
      {jsonPreview && conditions.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">JSON Preview</CardTitle>
              <Button variant="outline" size="sm" onClick={copyJsonToClipboard} className="flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{JSON.stringify(conditions, null, 2)}</pre>
          </CardContent>
        </Card>
      )}

      {/* Condition Summary */}
      {conditions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {conditions.map((condition, index) => (
            <div key={condition.id} className="flex items-center gap-1">
              {index > 0 && (
                <Badge variant="outline" className="text-xs">
                  {condition.logicalOperator}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {condition.metric} {condition.comparator} {condition.value}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
