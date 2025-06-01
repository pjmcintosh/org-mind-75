"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Check, X, Edit, Clock, TrendingUp } from "lucide-react"

interface TiloDecision {
  id: string
  title: string
  description: string
  status: "approved" | "pending" | "rejected"
  timestamp: string
  impact: "high" | "medium" | "low"
  department: string
  confidence: number
  reasoning: string
  recommendedAction: string
  alternatives: string[]
  decisionFactors: string[]
}

interface TiloDecisionCardProps {
  decision: TiloDecision
  onDecisionUpdate?: () => void
}

export function TiloDecisionCard({ decision, onDecisionUpdate }: TiloDecisionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAccept = async () => {
    setIsProcessing(true)
    console.log(`Admin accepted Tilo's recommendation: ${decision.recommendedAction}`)
    onDecisionUpdate?.()
    setIsProcessing(false)
  }

  const handleReject = async () => {
    setIsProcessing(true)
    console.log(`Admin rejected Tilo's recommendation: ${decision.recommendedAction}`)
    onDecisionUpdate?.()
    setIsProcessing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600"
    if (confidence >= 0.7) return "text-yellow-600"
    return "text-red-600"
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="h-4 w-4 text-blue-500" />
            <Badge variant="secondary" className="text-xs">
              🧠 Tilo Decision
            </Badge>
            <span className="font-medium">{decision.title}</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusColor(decision.status)} className="text-xs">
              {decision.status}
            </Badge>
            <span className={`text-sm font-medium ${getConfidenceColor(decision.confidence)}`}>
              {Math.round(decision.confidence * 100)}% confidence
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Recommended Action:</span>
            <Badge variant="outline" className="font-medium">
              {decision.recommendedAction}
            </Badge>
          </div>

          <p className="text-sm">{decision.description}</p>
          <p className="text-sm text-muted-foreground">{decision.reasoning}</p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {formatTimestamp(decision.timestamp)}
            <span>•</span>
            <span>{decision.department}</span>
          </div>
        </div>

        {decision.status === "pending" && (
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleAccept} disabled={isProcessing} className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReject}
              disabled={isProcessing}
              className="flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Reject
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1"
            >
              <Edit className="h-3 w-3" />
              {isExpanded ? "Hide Details" : "Show Details"}
            </Button>
          </div>
        )}

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t">
            <div>
              <h4 className="text-sm font-medium mb-2">Decision Factors</h4>
              <div className="flex flex-wrap gap-1">
                {decision.decisionFactors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Alternative Options</h4>
              <div className="flex flex-wrap gap-1">
                {decision.alternatives.map((alt, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {alt}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-muted-foreground">Confidence Score: {Math.round(decision.confidence * 100)}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
