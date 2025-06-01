"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertTriangle, Brain, Clock, RotateCcw } from "lucide-react"
import type { SimulationResult } from "@/lib/workflow-simulator"

interface SimulationResultsProps {
  result: SimulationResult
  onTestAgain: () => void
}

export function SimulationResults({ result, onTestAgain }: SimulationResultsProps) {
  const getStepIcon = (type: string, status: string) => {
    if (type === "ephrya_fallback") {
      return <Brain className="h-4 w-4 text-purple-600" />
    }

    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failure":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "fallback":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStepColor = (type: string, status: string) => {
    if (type === "ephrya_fallback") {
      return "border-l-purple-500 bg-purple-50"
    }

    switch (status) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "failure":
        return "border-l-red-500 bg-red-50"
      case "fallback":
        return "border-l-yellow-500 bg-yellow-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getStatusBadge = (type: string, status: string) => {
    if (type === "ephrya_fallback") {
      return <Badge className="bg-purple-100 text-purple-800">🧠 AI Decision</Badge>
    }

    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">✅ Success</Badge>
      case "failure":
        return <Badge className="bg-red-100 text-red-800">❌ Failed</Badge>
      case "fallback":
        return <Badge className="bg-yellow-100 text-yellow-800">⚠️ Fallback</Badge>
      default:
        return <Badge variant="outline">Processing</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Simulation Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Simulation Results
              {result.success ? (
                <Badge className="bg-green-100 text-green-800">✅ Completed</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">❌ Failed</Badge>
              )}
            </CardTitle>
            <Button variant="outline" onClick={onTestAgain} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Test Again
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Trigger:</span> {result.triggerAgent} → {result.triggerEvent}
            </div>
            <div>
              <span className="font-medium">Final Agent:</span> {result.finalAgent || "None"}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {result.totalDuration}ms
            </div>
            <div>
              <span className="font-medium">Ephrya Used:</span> {result.ephryaFallbackUsed ? "Yes" : "No"}
            </div>
          </div>

          {/* Mock Conditions Used */}
          {Object.keys(result.mockConditions).length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Mock Conditions:</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(result.mockConditions).map(([key, value]) => (
                  <Badge key={key} variant="outline" className="text-xs">
                    {key}: {value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Simulation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.steps.map((step, index) => (
              <div key={step.id}>
                <div className={`border-l-4 pl-4 py-3 rounded-r-lg ${getStepColor(step.type, step.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getStepIcon(step.type, step.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(step.type, step.status)}
                          {step.agent && (
                            <Badge variant="outline" className="text-xs">
                              {step.agent}
                            </Badge>
                          )}
                          {step.action && (
                            <Badge variant="secondary" className="text-xs">
                              {step.action}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{step.reasoning}</p>
                        {step.metadata && (
                          <div className="mt-2 text-xs text-gray-500">
                            {step.metadata.workflowName && <span>Workflow: {step.metadata.workflowName}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {step.duration}ms
                    </div>
                  </div>
                </div>
                {index < result.steps.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simulation Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Simulation Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{result.steps.filter((s) => s.status === "success").length} successful steps</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <span>{result.steps.filter((s) => s.status === "failure").length} failed steps</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              <span>{result.steps.filter((s) => s.type === "ephrya_fallback").length} Ephrya decisions</span>
            </div>
            {result.ephryaFallbackUsed && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 text-purple-800">
                  <Brain className="h-4 w-4" />
                  <span className="font-medium">Ephrya Fallback Used</span>
                </div>
                <p className="text-sm text-purple-700 mt-1">
                  No explicit workflow rules matched the conditions. Ephrya's intelligent routing was used to determine
                  the next action.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
