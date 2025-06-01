export interface TiloIntent {
  type: string
  confidence: number
  entities?: Record<string, any>
}

export function detectIntent(transcript: string): TiloIntent {
  const lower = transcript.toLowerCase().trim()

  // POC Approval intents
  if (lower.includes("approve") && (lower.includes("poc") || lower.includes("proof"))) {
    return { type: "approve_poc", confidence: 0.9 }
  }

  if (lower.includes("reject") && (lower.includes("poc") || lower.includes("proof"))) {
    return { type: "reject_poc", confidence: 0.9 }
  }

  // Status and updates
  if (lower.includes("status") || lower.includes("update") || lower.includes("report")) {
    return { type: "get_status", confidence: 0.8 }
  }

  // Priority and todo items
  if (
    lower.includes("what is next") ||
    lower.includes("priority") ||
    lower.includes("todo") ||
    lower.includes("action items")
  ) {
    return { type: "get_todo", confidence: 0.8 }
  }

  // Agent delegation
  if (lower.includes("delegate") || lower.includes("assign")) {
    const agentMatch = extractAgentName(lower)
    return {
      type: "delegate_task",
      confidence: agentMatch ? 0.8 : 0.6,
      entities: { agent: agentMatch },
    }
  }

  // Financial queries
  if (lower.includes("budget") || lower.includes("cost") || lower.includes("financial")) {
    return { type: "get_financial", confidence: 0.7 }
  }

  // Compliance queries
  if (lower.includes("compliance") || lower.includes("audit") || lower.includes("regulation")) {
    return { type: "get_compliance", confidence: 0.7 }
  }

  // Agent performance
  if (lower.includes("performance") || lower.includes("metrics") || lower.includes("analytics")) {
    return { type: "get_performance", confidence: 0.7 }
  }

  // Help and guidance
  if (lower.includes("help") || lower.includes("how") || lower.includes("what can")) {
    return { type: "get_help", confidence: 0.9 }
  }

  return { type: "fallback", confidence: 0.1 }
}

function extractAgentName(transcript: string): string | null {
  const agents = ["ada", "bob", "max", "eve", "ephrya", "janet", "lexi", "shandry", "erik"]

  for (const agent of agents) {
    if (transcript.includes(agent)) {
      return agent
    }
  }

  return null
}

export function getIntentResponse(intent: TiloIntent, transcript: string): string {
  switch (intent.type) {
    case "approve_poc":
      return "Processing POC approval. I'll route this to the appropriate workflow."
    case "reject_poc":
      return "Processing POC rejection. I'll document the decision and notify stakeholders."
    case "get_status":
      return "Gathering current status across all active projects and agents."
    case "get_todo":
      return "Retrieving your priority action items and next steps."
    case "delegate_task":
      const agent = intent.entities?.agent
      return agent
        ? `Delegating task to ${agent.charAt(0).toUpperCase() + agent.slice(1)}. I'll set up the workflow.`
        : "I'll help you delegate this task. Which agent should handle it?"
    case "get_financial":
      return "Pulling financial data and budget information."
    case "get_compliance":
      return "Checking compliance status and audit requirements."
    case "get_performance":
      return "Analyzing agent performance metrics and trends."
    case "get_help":
      return "I can help with POC approvals, status updates, task delegation, and more. What would you like to do?"
    default:
      return "I'm not sure how to help with that yet. Try asking about status, approvals, or delegating tasks."
  }
}

// Audit logging for voice interactions
export interface VoiceInteractionLog {
  timestamp: Date
  transcript: string
  intent: TiloIntent
  action: string
  userId?: string
}

export function logVoiceInteraction(log: Omit<VoiceInteractionLog, "timestamp">): void {
  const fullLog: VoiceInteractionLog = {
    ...log,
    timestamp: new Date(),
  }

  // In a real implementation, this would go to a database
  console.log("Voice Interaction:", fullLog)

  // Store in localStorage for demo purposes
  const existingLogs = JSON.parse(localStorage.getItem("tilo-voice-logs") || "[]")
  existingLogs.push(fullLog)
  localStorage.setItem("tilo-voice-logs", JSON.stringify(existingLogs.slice(-100))) // Keep last 100
}
