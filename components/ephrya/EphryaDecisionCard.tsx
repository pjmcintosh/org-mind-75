import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

interface EphryaDecision {
  id: string
  title: string
  description: string
  status: "approved" | "pending" | "rejected"
  timestamp: string
  impact: "high" | "medium" | "low"
  department: string
}

interface EphryaDecisionCardProps {
  decision: EphryaDecision
}

export function EphryaDecisionCard({ decision }: EphryaDecisionCardProps) {
  const getStatusIcon = () => {
    switch (decision.status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (decision.status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{decision.title}</CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <Badge className={getStatusColor()}>{decision.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{decision.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{decision.department}</span>
          <span>{new Date(decision.timestamp).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
