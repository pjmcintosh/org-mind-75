import type { SignatureRequest } from "@/mock/signature-queue"

export interface AgentFollowUpResponse {
  agent: string
  message: string
  actionButton?: {
    label: string
    action: string
  }
}

/**
 * Generates agent-specific follow-up responses based on CEO actions
 */
export function handleAgentFollowUp(request: SignatureRequest, action: "signed" | "rejected"): AgentFollowUpResponse {
  const agentName = request.agent.split(" ")[0] // Extract first name (Ada, Max, Jason, etc.)

  if (action === "signed") {
    switch (agentName) {
      case "Ada":
        return {
          agent: "Ada",
          message: "Thank you. I will begin implementation and notify the development team.",
          actionButton: {
            label: "View Implementation Plan",
            action: "view_implementation",
          },
        }

      case "Max":
        return {
          agent: "Max",
          message: "I'll archive this prompt and prepare the deployment prototype.",
          actionButton: {
            label: "View Deployment Plan",
            action: "view_deployment",
          },
        }

      case "Jason":
        return {
          agent: "Jason",
          message: "I'll finalize the document and store it in the legal archive.",
          actionButton: {
            label: "View Final Document",
            action: "view_final_document",
          },
        }

      case "Janet":
        return {
          agent: "Janet",
          message: "I'll process the budget approval and notify the finance team.",
          actionButton: {
            label: "View Budget Details",
            action: "view_budget",
          },
        }

      case "Shandry":
        return {
          agent: "Shandry",
          message: "I'll implement the policy and update the employee handbook.",
          actionButton: {
            label: "View Policy Update",
            action: "view_policy",
          },
        }

      default:
        return {
          agent: agentName,
          message: "I acknowledge your approval and will proceed with the next steps.",
          actionButton: {
            label: "View Details",
            action: "view_details",
          },
        }
    }
  } else if (action === "rejected") {
    switch (agentName) {
      case "Ada":
        return {
          agent: "Ada",
          message: "I understand. I'll revise the project plan based on your feedback.",
          actionButton: {
            label: "Provide Feedback",
            action: "provide_feedback",
          },
        }

      case "Max":
        return {
          agent: "Max",
          message: "I'll refine the prompt and create an improved version for review.",
          actionButton: {
            label: "Review Requirements",
            action: "review_requirements",
          },
        }

      case "Jason":
        return {
          agent: "Jason",
          message: "I'll review the document and address the concerns before resubmission.",
          actionButton: {
            label: "View Feedback",
            action: "view_feedback",
          },
        }

      case "Janet":
        return {
          agent: "Janet",
          message: "I'll revise the budget proposal and provide additional justification.",
          actionButton: {
            label: "Review Budget",
            action: "review_budget",
          },
        }

      case "Shandry":
        return {
          agent: "Shandry",
          message: "I'll modify the policy based on your concerns and resubmit for approval.",
          actionButton: {
            label: "Discuss Changes",
            action: "discuss_changes",
          },
        }

      default:
        return {
          agent: agentName,
          message: "I understand your concerns and will make the necessary revisions.",
          actionButton: {
            label: "Provide Feedback",
            action: "provide_feedback",
          },
        }
    }
  }

  // Fallback response
  return {
    agent: agentName,
    message: "I acknowledge your decision and will take appropriate action.",
  }
}

/**
 * Formats the follow-up message for Ephrya chat
 */
export function formatEphryaFollowUpMessage(response: AgentFollowUpResponse, documentName: string): string {
  const actionText = response.actionButton ? ` ${response.actionButton.label}` : ""
  return `${response.agent} has acknowledged your decision on ${documentName}: "${response.message}"${actionText}`
}
