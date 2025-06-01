import type { TiloIntent } from "@/lib/workflows/tilo-intents"

export function handleClientIntent(intent: TiloIntent, transcript: string, userRole: string): string {
  // Restrict client access to basic intents only
  const allowedClientIntents = ["get_help", "get_status", "project_status", "basic_question"]

  if (!allowedClientIntents.includes(intent.type)) {
    return "I'm here to help with project updates, intake summaries, or answering basic questions. Certain system features are only available to staff members."
  }

  switch (intent.type) {
    case "get_help":
      return "I can help you with project status updates, answer questions about your intake, or provide general assistance. What would you like to know?"

    case "get_status":
    case "project_status":
      return "Let me check your project status. Your intake is currently being reviewed by our team, and you should receive an update within 24 hours."

    case "basic_question":
      return "I'm here to help! Feel free to ask me about your project, our services, or any questions you might have."

    default:
      return "I can help with project updates and basic questions. Is there something specific about your project I can assist with?"
  }
}
