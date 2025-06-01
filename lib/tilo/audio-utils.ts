"use client"

/**
 * Speaks text using the browser's native Speech Synthesis API
 */
export function speakText(text: string): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0
    utterance.lang = "en-US"

    // Optional: Select a voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (voice) => voice.name.includes("Google") || voice.name.includes("Female") || voice.name.includes("Samantha"),
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    window.speechSynthesis.speak(utterance)
  }
}

/**
 * Returns a greeting based on the time of day
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning."
  if (hour < 18) return "Good afternoon."
  return "Good evening."
}

/**
 * Returns mock CEO status update data
 */
export function getCEOStatusUpdate(): { summary: string; actionItems: string[] } {
  return {
    summary:
      "All systems operational. 7 active agents at 94% efficiency. 12 projects in progress with 8 on track. Q1 targets at 112% completion. Security posture strong.",
    actionItems: [
      "Review Digital Transformation Initiative budget proposal (due tomorrow)",
      "Approve new client onboarding for Acme Corp",
      "Decision needed on Project Micron-A timeline extension",
    ],
  }
}
