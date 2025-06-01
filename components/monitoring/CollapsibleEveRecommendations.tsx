"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { eveRecommendations, type EveRecommendation } from "@/mock/eve-recommendations"

const getPriorityColor = (priority: EveRecommendation["priority"]) => {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "secondary"
    case "low":
      return "outline"
    default:
      return "outline"
  }
}

const getCategoryIcon = (category: EveRecommendation["category"]) => {
  switch (category) {
    case "performance":
      return "⚡"
    case "coordination":
      return "🤝"
    case "optimization":
      return "🎯"
    case "alert":
      return "🚨"
    default:
      return "💡"
  }
}

export function CollapsibleEveRecommendations() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTakeAction = (recommendationId: string) => {
    console.log(`Taking action on recommendation: ${recommendationId}`)
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    console.log(`Eve's panel ${isExpanded ? "collapsed" : "expanded"}`)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const topRecommendation = eveRecommendations[0]
  const recommendationsToShow = isExpanded ? eveRecommendations : [topRecommendation]
  const highPriorityCount = eveRecommendations.filter((r) => r.priority === "high").length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            Eve's Recommendations
            <Badge variant="outline" className="text-xs">
              {eveRecommendations.length} insights
            </Badge>
            {highPriorityCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {highPriorityCount} high priority
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleToggle} className="flex items-center gap-1">
            {isExpanded ? "Show Less" : "Show All Insights"}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="transition-all duration-300 ease-in-out">
        <div className="space-y-4">
          {recommendationsToShow.map((recommendation) => (
            <div key={recommendation.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(recommendation.category)}</span>
                  <div>
                    <h3 className="font-semibold">{recommendation.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getPriorityColor(recommendation.priority)} className="text-xs">
                        {recommendation.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {recommendation.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{formatTimestamp(recommendation.timestamp)}</span>
              </div>

              <p className="text-sm text-muted-foreground">{recommendation.description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Impact: {recommendation.impact}</p>
                  <p className="text-xs text-muted-foreground">
                    Affected agents: {recommendation.affectedAgents.join(", ")}
                  </p>
                </div>

                {recommendation.actionRequired && (
                  <Button size="sm" onClick={() => handleTakeAction(recommendation.id)} className="text-xs">
                    Take Action
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isExpanded && eveRecommendations.length > 1 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" onClick={handleToggle}>
              View {eveRecommendations.length - 1} more recommendations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
