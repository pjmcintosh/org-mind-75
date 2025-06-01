import { signatureQueue, type SignatureRequest } from "@/mock/signature-queue"
import { handleAgentFollowUp } from "@/lib/agents/handleAgentFollowUp"

export interface RegisterSignatureRequestParams {
  documentType: "NDA" | "Contract" | "Policy" | "Budget"
  project: string
  generatedBy: string
  department: "Legal" | "Finance" | "HR"
  status: "pending" | "signed" | "rejected" | "acknowledged" | "agent notified"
  dateGenerated: string
  content?: string
  confidence?: number
  tokensUsed?: number
  estimatedCost?: string
}

/**
 * Registers a new signature request in the queue
 */
export function registerSignatureRequest(params: RegisterSignatureRequestParams): SignatureRequest {
  const newRequest: SignatureRequest = {
    id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    documentType: params.documentType,
    document: `${params.project} - ${params.documentType}`,
    project: params.project,
    agent: params.generatedBy,
    department: params.department,
    status: params.status,
    date: params.dateGenerated,
    type: params.documentType,
    followUpTriggered: false,
    agentAcknowledged: false,
    followUpMessage: "",
    content: params.content,
    confidence: params.confidence,
    tokensUsed: params.tokensUsed,
    estimatedCost: params.estimatedCost,
  }

  // Add to queue (maintain 30 item limit)
  signatureQueue.unshift(newRequest)
  if (signatureQueue.length > 30) {
    signatureQueue.splice(30)
  }

  console.log("Document registered for signature tracking:", {
    id: newRequest.id,
    type: newRequest.documentType,
    project: newRequest.project,
    agent: newRequest.agent,
  })

  return newRequest
}

/**
 * Updates the status of a signature request
 */
export function updateSignatureStatus(
  id: string,
  newStatus: "pending" | "signed" | "rejected" | "acknowledged" | "agent notified",
): SignatureRequest | null {
  const requestIndex = signatureQueue.findIndex((req) => req.id === id)

  if (requestIndex === -1) {
    console.error("Signature request not found:", id)
    return null
  }

  const request = signatureQueue[requestIndex]
  const oldStatus = request.status
  request.status = newStatus

  console.log(`Signature status updated: ${oldStatus} → ${newStatus}`, {
    id: request.id,
    document: request.document,
    agent: request.agent,
  })

  // Trigger agent follow-up if status changed to signed or rejected
  if ((newStatus === "signed" || newStatus === "rejected") && !request.followUpTriggered) {
    triggerAgentFollowUp(request, newStatus)
  }

  return request
}

/**
 * Gets the current signature queue
 */
export function getSignatureQueue(): SignatureRequest[] {
  return [...signatureQueue]
}

/**
 * Triggers agent follow-up after CEO action
 */
export function triggerAgentFollowUp(request: SignatureRequest, action: "signed" | "rejected"): void {
  if (request.followUpTriggered) {
    console.log("Follow-up already triggered for:", request.id)
    return
  }

  // Generate agent follow-up message
  const followUpResponse = handleAgentFollowUp(request, action)

  // Mark follow-up as triggered and store the message
  request.followUpTriggered = true
  request.followUpMessage = followUpResponse.message
  request.followUpTimestamp = new Date().toISOString()

  // Simulate agent acknowledgment after a delay (in real implementation, this would be triggered by the agent)
  setTimeout(() => {
    if (Math.random() > 0.3) {
      // 70% chance of immediate acknowledgment
      request.agentAcknowledged = true
      console.log(`Agent ${request.agent} acknowledged the follow-up for ${request.document}`)
    }
  }, 2000)

  // Update status to reflect agent acknowledgment
  if (action === "signed") {
    request.status = "acknowledged"
  } else if (action === "rejected") {
    request.status = "agent notified"
  }

  console.log(`Agent [${request.agent}] responded to CEO ${action} of [${request.document}]`)
  console.log("Follow-up message:", followUpResponse.message)

  // In a real implementation, this would send the message to Ephrya chat
  console.log("Follow-up message delivered to Ephrya chat")
}

/**
 * Gets pending signature requests count
 */
export function getPendingSignatureCount(): number {
  return signatureQueue.filter((req) => req.status === "pending").length
}

/**
 * Gets signature requests by status
 */
export function getSignatureRequestsByStatus(
  status: "pending" | "signed" | "rejected" | "acknowledged" | "agent notified",
): SignatureRequest[] {
  return signatureQueue.filter((req) => req.status === status)
}

/**
 * Gets signature requests by department
 */
export function getSignatureRequestsByDepartment(department: "Legal" | "Finance" | "HR"): SignatureRequest[] {
  return signatureQueue.filter((req) => req.department === department)
}

/**
 * Marks an agent as having acknowledged a follow-up
 */
export function markAgentAcknowledged(id: string): SignatureRequest | null {
  const request = signatureQueue.find((req) => req.id === id)
  if (request) {
    request.agentAcknowledged = true
    console.log(`Agent acknowledgment recorded for ${request.document}`)
  }
  return request || null
}
