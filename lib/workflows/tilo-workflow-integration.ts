import { detectIntent, logVoiceInteraction } from "./tilo-intents"

export interface TiloWorkflowContext {
  userId?: string
  role?: string
  currentPage?: string
}

export class TiloWorkflowManager {
  private context: TiloWorkflowContext

  constructor(context: TiloWorkflowContext = {}) {
    this.context = context
  }

  async processVoiceCommand(transcript: string): Promise<string> {
    const intent = detectIntent(transcript)

    // Log the interaction
    logVoiceInteraction(transcript, intent)

    // Process based on intent type
    switch (intent.type) {
      case "approve_poc":
        return await this.handlePOCApproval("approved", transcript)

      case "reject_poc":
        return await this.handlePOCApproval("rejected", transcript)

      case "get_status":
        return await this.getStatusReport()

      case "get_todo":
        return await this.getActionItems()

      case "delegate_task":
        return await this.delegateTask(intent.entities?.agent, transcript)

      case "show_dashboard":
        return this.navigateToPage("/admin/dashboard")

      case "agent_status":
        return await this.getAgentStatus()

      case "show_approvals":
        return this.navigateToPage("/admin/ceo")

      case "show_help":
        return this.getHelpText()

      default:
        return "I'm not sure how to help with that yet. Try saying 'help' to see what I can do."
    }
  }

  private async handlePOCApproval(decision: "approved" | "rejected", transcript: string): Promise<string> {
    // In a real implementation, this would call the POC approval API
    console.log(`POC ${decision} via voice:`, transcript)
    return `POC ${decision} - I've processed your request.`
  }

  private async getStatusReport(): Promise<string> {
    // In a real implementation, this would fetch actual status data
    return "Status Report: All agents are operational. 3 pending approvals, 2 completed tasks today."
  }

  private async getActionItems(): Promise<string> {
    // In a real implementation, this would fetch actual action items
    return "Priority Items: 1) Review POC proposal from Ada, 2) Approve budget allocation, 3) Check agent performance metrics."
  }

  private async delegateTask(agent: string | null, transcript: string): Promise<string> {
    if (!agent) {
      return "Which agent should I delegate this task to? Available agents: Ada, Bob, Max, Ephrya, Eve, Janet, Lexi, Shandry, Erik."
    }

    // In a real implementation, this would create a task assignment
    console.log(`Delegating task to ${agent}:`, transcript)
    return `Task delegated to ${agent}. They will be notified shortly.`
  }

  private navigateToPage(path: string): string {
    // In a real implementation, this would trigger navigation
    console.log(`Navigating to: ${path}`)
    return `Opening ${path}...`
  }

  private async getAgentStatus(): Promise<string> {
    // In a real implementation, this would fetch actual agent status
    return "Agent Status: 9 agents online, 0 offline. Average response time: 1.2s."
  }

  private getHelpText(): string {
    return `I can help you with:
    • POC approvals ("approve the proof of concept")
    • Status reports ("what's the status?")
    • Action items ("what's next?")
    • Task delegation ("delegate this to Ada")
    • Navigation ("show dashboard")
    • Agent monitoring ("agent status")
    
    Just speak naturally and I'll understand!`
  }
}

// Export a default instance
export const tiloWorkflowManager = new TiloWorkflowManager()
