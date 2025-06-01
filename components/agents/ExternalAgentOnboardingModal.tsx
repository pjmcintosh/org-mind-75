"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalAgentConfigForm } from "@/components/agents/ExternalAgentConfigForm"
import { addExternalAgent, type ExternalAgentDefinition } from "@/mock/external-agents"

interface ExternalAgentOnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onAgentAdded: (agent: ExternalAgentDefinition) => void
  onEphryaAnnouncement: (message: string) => void
}

export function ExternalAgentOnboardingModal({
  isOpen,
  onClose,
  onAgentAdded,
  onEphryaAnnouncement,
}: ExternalAgentOnboardingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (agentData: Omit<ExternalAgentDefinition, "id" | "createdAt">) => {
    setIsSubmitting(true)

    try {
      // Add the agent to the store
      const newAgent = addExternalAgent(agentData)

      // Log the onboarding
      console.log(`External agent onboarded: ${newAgent.name}, access: ${newAgent.accessLevel}`)
      console.log(`Provider: ${newAgent.sourceProvider}`)
      console.log(`Department: ${newAgent.department}`)
      console.log(`Scope: ${newAgent.scopeOfResponsibility.join(", ")}`)
      console.log(`Governance settings:`, newAgent.governanceSettings)

      // Generate Ephrya announcement
      const announcement = `A new third-party agent has been onboarded: ${newAgent.name}. Source: ${newAgent.sourceProvider}. Scope: ${newAgent.scopeOfResponsibility.join(", ")}. Oversight: ${newAgent.governanceSettings.monitoredByEve ? "Eve" : "Manual"}. Status: ${newAgent.approvalStatus}.`

      // Simulate async processing
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Notify parent components
      onAgentAdded(newAgent)
      onEphryaAnnouncement(announcement)

      // Close modal
      onClose()
    } catch (error) {
      console.error("Failed to onboard external agent:", error)
      alert("Failed to add external agent. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>External Agent Onboarding</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ExternalAgentConfigForm onSave={handleSave} onCancel={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
