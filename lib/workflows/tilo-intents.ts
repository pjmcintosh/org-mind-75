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

  // Status and reporting intents
  if (lower.includes("status") || lower.includes("update") || lower.includes("report")) {
    return { type: "get_status", confidence: 0.8 }
  }

  // Priority and todo intents
  if (lower.includes("what") && (lower.includes("next") || lower.includes("priority"))) {
    return { type: "get_todo", confidence: 0.8 }
  }

  if (lower.includes("todo") || lower.includes("action items")) {
    return { type: "get_todo", confidence: 0.8 }
  }

  // Agent delegation intents
  if (lower.includes("delegate") || lower.includes("assign")) {
    const agentMatch = extractAgentName(lower)
    return {
      type: "delegate_task",
      confidence: 0.7,
      entities: { agent: agentMatch },
    }
  }

  // Dashboard and navigation intents
  if (lower.includes("show") && (lower.includes("dashboard") || lower.includes("overview"))) {
    return { type: "show_dashboard", confidence: 0.8 }
  }

  // Agent status intents
  if (lower.includes("agent") && lower.includes("status")) {
    return { type: "agent_status", confidence: 0.8 }
  }

  // Approval queue intents
  if (lower.includes("approval") && lower.includes("queue")) {
    return { type: "show_approvals", confidence: 0.8 }
  }

  // Help intents
  if (lower.includes("help") || lower.includes("what can you do")) {
    return { type: "show_help", confidence: 0.9 }
  }

  return { type: "fallback", confidence: 0.1 }
}

function extractAgentName(transcript: string): string | null {
  const agents = ["ada", "bob", "max", "ephrya", "eve", "janet", "lexi", "shandry", "erik"]

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
      return "I'll process the POC approval for you."
    case "reject_poc":
      return "I'll process the POC rejection."
    case "get_status":
      return "Let me get the latest status report."
    case "get_todo":
      return "Here are your priority action items."
    case "delegate_task":
      const agent = intent.entities?.agent
      return agent ? `I'll delegate this task to ${agent}.` : "Which agent should I delegate this to?"
    case "show_dashboard":
      return "Opening the dashboard overview."
    case "agent_status":
      return "Here's the current agent status."
    case "show_approvals":
      return "Showing the approval queue."
    case "show_help":
      return "Here's what I can help you with: POC approvals, status reports, task delegation, and more."
    default:
      return "I'm not sure how to help with that yet. Try saying 'help' to see what I can do."
  }
}

// Store transcript and intent for audit purposes
export function logVoiceInteraction(transcript: string, intent: TiloIntent) {
  const interaction = {
    timestamp: new Date().toISOString(),
    transcript,
    intent: intent.type,
    confidence: intent.confidence,
    entities: intent.entities,
  }

  // In a real app, this would go to a database
  console.log("Voice Interaction:", interaction)

  // Store in localStorage for demo purposes
  const existing = JSON.parse(localStorage.getItem("tilo-voice-log") || "[]")
  existing.push(interaction)
  localStorage.setItem("tilo-voice-log", JSON.stringify(existing.slice(-100))) // Keep last 100
}
