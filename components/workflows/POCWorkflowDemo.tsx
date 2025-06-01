"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { bobRequirementsHandler } from "@/agents/bob/BobRequirementsHandler"
import { adaEvaluator } from "@/agents/ada/AdaEvaluator"
import { maxPromptGenerator } from "@/agents/max/MaxPromptGenerator"
import TiloApproval from "@/agents/tilo/TiloApproval"
import { getAllPOCs, type POCRequest } from "@/lib/workflows/pocApprovalWorkflow"

export const POCWorkflowDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bob")
  const [showTiloApproval, setShowTiloApproval] = useState(false)
  const [pocRequests, setPocRequests] = useState<POCRequest[]>([])
  const [sampleRequirements, setSampleRequirements] = useState(
    `Client: Acme Corp
Project: Customer Dashboard Redesign
Requirements: Create a proof-of-concept for a modern customer dashboard that displays user analytics, order history, and support tickets. The interface should be responsive and follow our brand guidelines.
Timeline: 2 weeks
Budget: $15,000
Priority: High`,
  )

  // Load POC requests
  useEffect(() => {
    const loadPOCs = () => {
      const pocs = getAllPOCs()
      setPocRequests(pocs)
    }

    loadPOCs()

    // Set up interval to refresh POCs
    const interval = setInterval(loadPOCs, 2000)
    return () => clearInterval(interval)
  }, [])

  // Handle Bob's requirements submission
  const handleBobSubmit = () => {
    const newRequest = bobRequirementsHandler.handleNewRequirements(sampleRequirements)
    setPocRequests([...getAllPOCs()])
    setActiveTab("ada")
  }

  // Handle Ada's evaluation
  const handleAdaEvaluate = (pocId: string) => {
    const poc = pocRequests.find((p) => p.id === pocId)
    if (poc) {
      adaEvaluator.processRequest(poc)
      setPocRequests([...getAllPOCs()])
      setActiveTab("max")
    }
  }

  // Handle Max's prompt generation
  const handleMaxGenerate = (pocId: string) => {
    const poc = pocRequests.find((p) => p.id === pocId)
    if (poc) {
      maxPromptGenerator.processPOCRequest(poc)
      setPocRequests([...getAllPOCs()])
      setActiveTab("tilo")
    }
  }

  // Handle Tilo's approval flow
  const handleTiloApproval = () => {
    setShowTiloApproval(true)
  }

  // Handle approval completion
  const handleApprovalComplete = (approved: boolean, pocId: string) => {
    setPocRequests([...getAllPOCs()])
    setTimeout(() => {
      setShowTiloApproval(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">POC Approval Workflow Demo</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="bob">1. Bob (Requirements)</TabsTrigger>
          <TabsTrigger value="ada">2. Ada (Evaluation)</TabsTrigger>
          <TabsTrigger value="max">3. Max (Prompt)</TabsTrigger>
          <TabsTrigger value="tilo">4. Tilo (CEO Approval)</TabsTrigger>
          <TabsTrigger value="status">Workflow Status</TabsTrigger>
        </TabsList>

        {/* Bob's Tab */}
        <TabsContent value="bob">
          <Card>
            <CardHeader>
              <CardTitle>Bob - Requirements Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block mb-2">Client Requirements:</label>
                <textarea
                  className="w-full h-40 p-2 border rounded bg-slate-800 text-white"
                  value={sampleRequirements}
                  onChange={(e) => setSampleRequirements(e.target.value)}
                />
              </div>
              <Button onClick={handleBobSubmit}>Submit Requirements</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ada's Tab */}
        <TabsContent value="ada">
          <Card>
            <CardHeader>
              <CardTitle>Ada - Requirements Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pocRequests
                  .filter((poc) => poc.status === "pending-eval")
                  .map((poc) => (
                    <div key={poc.id} className="p-4 border rounded bg-slate-800">
                      <h3 className="font-medium mb-2">POC Request: {poc.id.substring(0, 8)}</h3>
                      <pre className="whitespace-pre-wrap text-sm mb-4">{poc.requirements}</pre>
                      <Button onClick={() => handleAdaEvaluate(poc.id)}>Evaluate Requirements</Button>
                    </div>
                  ))}

                {pocRequests.filter((poc) => poc.status === "pending-eval").length === 0 && (
                  <p>No pending evaluations. Submit requirements with Bob first.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Max's Tab */}
        <TabsContent value="max">
          <Card>
            <CardHeader>
              <CardTitle>Max - v0.dev Prompt Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pocRequests
                  .filter((poc) => poc.status === "poc-needed")
                  .map((poc) => (
                    <div key={poc.id} className="p-4 border rounded bg-slate-800">
                      <h3 className="font-medium mb-2">POC Request: {poc.id.substring(0, 8)}</h3>
                      <div className="mb-4">
                        <strong>Requirements:</strong>
                        <pre className="whitespace-pre-wrap text-sm mt-1">{poc.requirements}</pre>
                      </div>
                      <Button onClick={() => handleMaxGenerate(poc.id)}>Generate v0.dev Prompt</Button>
                    </div>
                  ))}

                {pocRequests.filter((poc) => poc.status === "poc-needed").length === 0 && (
                  <p>No POCs needing prompts. Complete evaluation with Ada first.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tilo's Tab */}
        <TabsContent value="tilo">
          <Card>
            <CardHeader>
              <CardTitle>Tilo - CEO Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pocRequests
                  .filter((poc) => poc.status === "awaiting-ceo-approval")
                  .map((poc) => (
                    <div key={poc.id} className="p-4 border rounded bg-slate-800">
                      <h3 className="font-medium mb-2">POC Request: {poc.id.substring(0, 8)}</h3>
                      <div className="mb-4">
                        <strong>v0.dev Prompt:</strong>
                        <pre className="whitespace-pre-wrap text-sm mt-1">{poc.voPrompt}</pre>
                      </div>
                      <div className="mb-4">
                        <strong>Budget:</strong> ${poc.budget || "Not specified"}
                      </div>
                      <Button onClick={handleTiloApproval}>Start CEO Approval Flow</Button>
                    </div>
                  ))}

                {pocRequests.filter((poc) => poc.status === "awaiting-ceo-approval").length === 0 && (
                  <p>No POCs awaiting CEO approval. Generate prompts with Max first.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pocRequests.length === 0 ? (
                  <p>No POC requests in the system.</p>
                ) : (
                  pocRequests.map((poc) => (
                    <div key={poc.id} className="p-4 border rounded bg-slate-800">
                      <h3 className="font-medium mb-2">POC ID: {poc.id.substring(0, 8)}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <strong>Status:</strong>
                        </div>
                        <div
                          className={`
                          ${poc.status === "approved" ? "text-green-400" : ""}
                          ${poc.status === "rejected" ? "text-red-400" : ""}
                        `}
                        >
                          {poc.status}
                        </div>

                        <div>
                          <strong>Assigned To:</strong>
                        </div>
                        <div>{poc.assignedTo}</div>

                        <div>
                          <strong>Created:</strong>
                        </div>
                        <div>{poc.createdAt.toLocaleString()}</div>

                        <div>
                          <strong>Updated:</strong>
                        </div>
                        <div>{poc.updatedAt.toLocaleString()}</div>

                        {poc.approvalInfo && (
                          <>
                            <div>
                              <strong>Approval:</strong>
                            </div>
                            <div className={poc.approvalInfo.approved ? "text-green-400" : "text-red-400"}>
                              {poc.approvalInfo.approved ? "Approved" : "Rejected"} by {poc.approvalInfo.actor}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tilo Approval Modal */}
      {showTiloApproval && (
        <TiloApproval onComplete={handleApprovalComplete} onExit={() => setShowTiloApproval(false)} />
      )}
    </div>
  )
}

export default POCWorkflowDemo
