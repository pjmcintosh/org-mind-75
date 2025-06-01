"use client"

import { speak as tiloSpeak } from "@/lib/voice/speech"

/**
 * Speaks text using Tilo's UK female voice
 */
export function speakText(text: string): void {
  console.log("Speaking text via audio-utils:", text)
  tiloSpeak(text, {
    onStart: () => console.log("Started speaking via audio-utils"),
    onEnd: () => console.log("Finished speaking via audio-utils"),
    onError: (err) => console.error("Speech error in audio-utils:", err),
  })
}

/**
 * Returns a greeting based on the time of day (UK style)
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning."
  if (hour < 17) return "Good afternoon."
  return "Good evening."
}

/**
 * Returns mock CEO status update data (UK terminology)
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
