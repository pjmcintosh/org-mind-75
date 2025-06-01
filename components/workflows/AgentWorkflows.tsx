"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, ArrowRight, Play, Shield } from "lucide-react"
import { WorkflowEditor } from "./WorkflowEditor"
import { WorkflowSimulator } from "./WorkflowSimulator"
import { type WorkflowRule, sampleWorkflowRules } from "@/mock/workflow-rules"

export function AgentWorkflows() {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(sampleWorkflowRules)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState<WorkflowRule | undefined>()
  const [simulatingWorkflow, setSimulatingWorkflow] = useState<WorkflowRule | undefined>()

  const handleCreateWorkflow = () => {
    setEditingWorkflow(undefined)
    setIsEditorOpen(true)
  }

  const handleEditWorkflow = (workflow: WorkflowRule) => {
    setEditingWorkflow(workflow)
    setIsEditorOpen(true)
  }

  const handleSimulateWorkflow = (workflow?: WorkflowRule) => {
    setSimulatingWorkflow(workflow)
    setIsSimulatorOpen(true)
    console.log(`Opening simulator for workflow: ${workflow?.name || "General Testing"}`)
  }

  const handleSaveWorkflow = (workflow: WorkflowRule) => {
    if (editingWorkflow) {
      // Update existing workflow
      setWorkflows((prev) => prev.map((w) => (w.id === workflow.id ? workflow : w)))
    } else {
      // Add new workflow
      setWorkflows((prev) => [...prev, workflow])
    }
    setIsEditorOpen(false)
    setEditingWorkflow(undefined)
  }

  const handleDeleteWorkflow = (id: string) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows((prev) => prev.filter((w) => w.id !== id))
      console.log(`Deleted workflow: ${id}`)
    }
  }

  const handleToggleWorkflow = (id: string, isActive: boolean) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, isActive } : w)))
    console.log(`${isActive ? "Enabled" : "Disabled"} workflow: ${id}`)
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent Workflows</h2>
          <p className="text-muted-foreground">Define and orchestrate multi-agent workflows with conditional logic</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => handleSimulateWorkflow()} variant="outline" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Test All Workflows
          </Button>
          <Button onClick={handleCreateWorkflow} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{workflows.length}</div>
            <p className="text-xs text-muted-foreground">Total Workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{workflows.filter((w) => w.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Active Workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{workflows.filter((w) => !w.isActive).length}</div>
            <p className="text-xs text-muted-foreground">Inactive Workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{workflows.filter((w) => w.lastTriggered).length}</div>
            <p className="text-xs text-muted-foreground">Recently Triggered</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No workflows created yet</h3>
                <p className="text-muted-foreground mb-4">Create your first workflow to automate agent coordination</p>
                <Button onClick={handleCreateWorkflow}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Workflow
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          workflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <Badge className={getStatusColor(workflow.isActive)}>
                      {workflow.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {workflow.conditions.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {workflow.conditions.length} condition{workflow.conditions.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={workflow.isActive}
                      onCheckedChange={(checked) => handleToggleWorkflow(workflow.id, checked)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSimulateWorkflow(workflow)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Simulate Workflow"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditWorkflow(workflow)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Workflow Chain */}
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline">{workflow.triggerAgent}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">{workflow.targetAgent}</Badge>
                </div>

                {/* Workflow Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Trigger Event:</span> {workflow.triggerEvent}
                  </div>
                  <div>
                    <span className="font-medium">Action:</span> {workflow.actionType}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {formatDate(workflow.createdAt)}
                  </div>
                  <div>
                    <span className="font-medium">Last Triggered:</span>{" "}
                    {workflow.lastTriggered ? formatDate(workflow.lastTriggered) : "Never"}
                  </div>
                </div>

                {/* Conditions Summary */}
                {workflow.conditions.length > 0 && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-2">Conditions:</div>
                    <div className="flex flex-wrap gap-2">
                      {workflow.conditions.map((condition, index) => (
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
                  </div>
                )}

                {/* Simulate Workflow Button */}
                <div className="mt-4 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSimulateWorkflow(workflow)}
                    className="w-full flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Simulate Workflow
                  </Button>
                </div>
                {workflow.triggerAgent === "shandry" ||
                  (workflow.name.toLowerCase().includes("training") && (
                    <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-400 font-medium">Controlled by: HR Agent (Shandry)</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Workflow Editor Modal */}
      <WorkflowEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveWorkflow}
        workflow={editingWorkflow}
      />

      {/* Workflow Simulator Modal */}
      <WorkflowSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        workflows={workflows}
        selectedWorkflow={simulatingWorkflow}
      />
    </div>
  )
}
