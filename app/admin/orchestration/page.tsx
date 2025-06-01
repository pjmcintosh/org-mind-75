"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrchestrationVisualizer } from "@/components/orchestration/OrchestrationVisualizer"
import { entityTypes, type EntityType } from "@/lib/constants/entityTypes"
import { humanLabels } from "@/lib/humanLabels"

interface Node {
  id: string
  name: string
  type: EntityType
}

interface Edge {
  source: string
  target: string
  label?: string
}

// Sample data for visualization
const allNodes: Node[] = [
  { id: "ada", name: "Ada", type: "SPECIALIST" },
  { id: "bob", name: "Bob", type: "AGENT" },
  { id: "ephrya", name: "Ephrya", type: "ORCHESTRATOR" },
  { id: "erik", name: "Erik", type: "SPECIALIST" },
  { id: "eve", name: "Eve", type: "OBSERVER" },
  { id: "janet", name: "Janet", type: "SPECIALIST" },
  { id: "lexi", name: "Lexi", type: "SPECIALIST" },
  { id: "max", name: "Max", type: "AGENT" },
  { id: "shandry", name: "Shandry", type: "SPECIALIST" },
  { id: "openai-legal", name: "OpenAI Legal", type: "PARTNER" },
]

const allEdges: Edge[] = [
  { source: "ephrya", target: "ada", label: "Coordinates" },
  { source: "ephrya", target: "bob", label: "Coordinates" },
  { source: "ephrya", target: "janet", label: "Coordinates" },
  { source: "ephrya", target: "lexi", label: "Coordinates" },
  { source: "ephrya", target: "max", label: "Coordinates" },
  { source: "ephrya", target: "shandry", label: "Coordinates" },
  { source: "eve", target: "ephrya", label: "Monitors" },
  { source: "eve", target: "ada", label: "Monitors" },
  { source: "eve", target: "bob", label: "Monitors" },
  { source: "eve", target: "janet", label: "Monitors" },
  { source: "eve", target: "lexi", label: "Monitors" },
  { source: "eve", target: "max", label: "Monitors" },
  { source: "eve", target: "shandry", label: "Monitors" },
  { source: "erik", target: "openai-legal", label: "Secures" },
  { source: "openai-legal", target: "lexi", label: "Advises" },
  { source: "ada", target: "bob", label: "Analyzes" },
  { source: "bob", target: "max", label: "Requests" },
  { source: "max", target: "ada", label: "Optimizes" },
]

// Predefined views
const views = {
  all: {
    name: "All Connections",
    nodes: allNodes,
    edges: allEdges,
  },
  ephrya: {
    name: "Ephrya's Orchestration",
    nodes: allNodes,
    edges: allEdges.filter((edge) => edge.source === "ephrya" || edge.target === "ephrya"),
  },
  eve: {
    name: "Eve's Monitoring",
    nodes: allNodes,
    edges: allEdges.filter((edge) => edge.source === "eve"),
  },
  security: {
    name: "Security Flow",
    nodes: allNodes.filter((node) => ["erik", "lexi", "openai-legal", "eve"].includes(node.id)),
    edges: allEdges.filter(
      (edge) =>
        ["erik", "lexi", "openai-legal", "eve"].includes(edge.source) &&
        ["erik", "lexi", "openai-legal", "eve"].includes(edge.target),
    ),
  },
}

export default function OrchestrationPage() {
  const [currentView, setCurrentView] = useState<keyof typeof views>("all")
  const [selectedNode, setSelectedNode] = useState<string | null>("") // Updated default value to be a non-empty string

  const handleViewChange = (view: keyof typeof views) => {
    setCurrentView(view)
    setSelectedNode(null)
  }

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId)
  }

  // Filter nodes and edges based on selected node
  const getFilteredData = () => {
    if (!selectedNode) {
      return views[currentView]
    }

    const relatedEdges = allEdges.filter((edge) => edge.source === selectedNode || edge.target === selectedNode)

    const relatedNodeIds = new Set<string>([selectedNode])
    relatedEdges.forEach((edge) => {
      relatedNodeIds.add(edge.source)
      relatedNodeIds.add(edge.target)
    })

    return {
      name: `${allNodes.find((n) => n.id === selectedNode)?.name}'s Connections`,
      nodes: allNodes.filter((node) => relatedNodeIds.has(node.id)),
      edges: relatedEdges,
    }
  }

  const { nodes, edges } = getFilteredData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-400 mb-4">{humanLabels.navigation.orchestration}</h1>
          <p className="text-blue-300 text-sm mb-6">
            Visualize how your team members work together and understand their relationships.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Tabs defaultValue="predefined" className="w-full">
              <TabsList className="bg-slate-800/50 border border-slate-700/40">
                <TabsTrigger value="predefined">Predefined Views</TabsTrigger>
                <TabsTrigger value="custom">Custom View</TabsTrigger>
              </TabsList>

              <TabsContent value="predefined" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(views).map(([key, view]) => (
                    <Button
                      key={key}
                      variant={currentView === key ? "default" : "outline"}
                      onClick={() => handleViewChange(key as keyof typeof views)}
                      className={currentView === key ? "bg-cyan-600" : "border-slate-600 text-slate-300"}
                    >
                      {view.name}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="mt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedNode || "all"} onValueChange={handleNodeSelect}>
                    <SelectTrigger className="w-full sm:w-64 bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select a team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Team Members</SelectItem>
                      {allNodes.map((node) => (
                        <SelectItem key={node.id} value={node.id}>
                          {node.name} ({entityTypes[node.type].label})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Visualizer */}
        <OrchestrationVisualizer nodes={nodes} edges={edges} />

        {/* Legend */}
        <Card className="bg-slate-800/50 border-slate-600 mt-6">
          <CardHeader>
            <CardTitle className="text-cyan-400">Team Member Types</CardTitle>
            <CardDescription className="text-blue-300">
              Understanding the different roles in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(entityTypes).map(([type, info]) => (
                <div key={type} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full bg-${info.color}-400`}></div>
                    <span className="font-medium text-white">{info.label}</span>
                  </div>
                  <p className="text-sm text-gray-300">{info.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
