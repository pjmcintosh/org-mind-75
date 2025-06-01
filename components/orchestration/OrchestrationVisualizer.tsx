"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"
import { humanLabels } from "@/lib/humanLabels"

interface Node {
  id: string
  name: string
  type: EntityType
  x?: number
  y?: number
}

interface Edge {
  source: string
  target: string
  label?: string
}

interface OrchestrationVisualizerProps {
  nodes: Node[]
  edges: Edge[]
}

export function OrchestrationVisualizer({ nodes, edges }: OrchestrationVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getEntityColor = (type: EntityType) => {
    const color = entityTypes[type].color
    switch (color) {
      case "cyan":
        return "#22d3ee"
      case "yellow":
        return "#facc15"
      case "green":
        return "#4ade80"
      case "purple":
        return "#a78bfa"
      case "blue":
        return "#60a5fa"
      default:
        return "#94a3b8"
    }
  }

  const getEdgeColor = (sourceType: EntityType, targetType: EntityType) => {
    if (sourceType === "AGENT" && targetType === "AGENT") {
      return "#60a5fa" // blue
    } else if (sourceType === "PARTNER" && targetType === "AGENT") {
      return "#4ade80" // green
    } else if (sourceType === "OBSERVER") {
      return "#facc15" // yellow
    } else {
      return "#94a3b8" // gray
    }
  }

  const getEdgeDash = (sourceType: EntityType) => {
    return sourceType === "OBSERVER" ? [5, 5] : []
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Position nodes in a circle
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8
    const nodeCount = nodes.length

    // Position nodes
    nodes.forEach((node, i) => {
      const angle = (i / nodeCount) * 2 * Math.PI
      node.x = centerX + radius * Math.cos(angle)
      node.y = centerY + radius * Math.sin(angle)
    })

    // Draw edges
    edges.forEach((edge) => {
      const source = nodes.find((n) => n.id === edge.source)
      const target = nodes.find((n) => n.id === edge.target)

      if (!source || !target || !source.x || !source.y || !target.x || !target.y) return

      const edgeColor = getEdgeColor(source.type, target.type)
      const edgeDash = getEdgeDash(source.type)

      // Draw edge
      ctx.beginPath()
      ctx.moveTo(source.x, source.y)
      ctx.lineTo(target.x, target.y)
      ctx.strokeStyle = edgeColor

      if (edgeDash.length) {
        ctx.setLineDash(edgeDash)
      } else {
        ctx.setLineDash([])
      }

      ctx.lineWidth = 2
      ctx.stroke()

      // Draw arrow
      const angle = Math.atan2(target.y - source.y, target.x - source.x)
      const arrowSize = 10

      ctx.beginPath()
      ctx.moveTo(
        target.x - arrowSize * Math.cos(angle) + arrowSize * Math.sin(angle) * 0.5,
        target.y - arrowSize * Math.sin(angle) - arrowSize * Math.cos(angle) * 0.5,
      )
      ctx.lineTo(target.x - arrowSize * Math.cos(angle), target.y - arrowSize * Math.sin(angle))
      ctx.lineTo(
        target.x - arrowSize * Math.cos(angle) - arrowSize * Math.sin(angle) * 0.5,
        target.y - arrowSize * Math.sin(angle) + arrowSize * Math.cos(angle) * 0.5,
      )
      ctx.fillStyle = edgeColor
      ctx.fill()

      // Draw edge label
      if (edge.label) {
        const midX = (source.x + target.x) / 2
        const midY = (source.y + target.y) / 2

        ctx.font = "12px sans-serif"
        ctx.fillStyle = "#94a3b8"
        ctx.textAlign = "center"
        ctx.fillText(edge.label, midX, midY - 5)
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      if (!node.x || !node.y) return

      const nodeColor = getEntityColor(node.type)

      // Draw node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = nodeColor + "33" // Add transparency
      ctx.fill()
      ctx.strokeStyle = nodeColor
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw node label
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.fillText(node.name, node.x, node.y + 5)
    })
  }, [nodes, edges])

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-cyan-400">
          {humanLabels.navigation.orchestration || "Orchestration Visualizer"}
        </CardTitle>
        <CardDescription className="text-blue-300">Visualize how your team members work together</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Connection Types:</div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-400"></div>
              <span className="text-xs text-gray-300">Agent → Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-400"></div>
              <span className="text-xs text-gray-300">Partner → Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-yellow-400 border-t border-dashed"></div>
              <span className="text-xs text-gray-300">Observer (dotted line)</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Team Member Types:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(entityTypes).map(([type, info]) => (
              <Badge
                key={type}
                className={`bg-${info.color}-500/20 text-${info.color}-400 border-${info.color}-500/30`}
              >
                {info.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="relative w-full" style={{ height: "500px" }}>
          <canvas ref={canvasRef} className="w-full h-full" style={{ background: "rgba(15, 23, 42, 0.3)" }} />
        </div>
      </CardContent>
    </Card>
  )
}
