"use client"

/**
 * Speech synthesis utility for Tilo with UK female voice preference
 */

let voicesLoaded = false
let preferredVoice: SpeechSynthesisVoice | null = null

/**
 * Initialize voice loading and selection
 */
function initializeVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices()

    if (voices.length === 0) return // Voices not loaded yet

    // Priority order for UK female voices
    preferredVoice =
      voices.find((v) => v.name === "Google UK English Female") ||
      voices.find((v) => v.name === "Microsoft Hazel - English (Great Britain)") ||
      voices.find((v) => v.name.includes("Hazel")) ||
      voices.find((v) => v.lang === "en-GB" && v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.lang === "en-GB" && v.name.toLowerCase().includes("woman")) ||
      voices.find((v) => v.lang === "en-GB") ||
      voices.find((v) => v.lang.startsWith("en-") && v.name.toLowerCase().includes("female")) ||
      null

    voicesLoaded = true

    if (preferredVoice) {
      console.log(`Tilo voice selected: ${preferredVoice.name} (${preferredVoice.lang})`)
    } else {
      console.warn("No suitable UK female voice found. Using system default.")
    }
  }

  // Load voices immediately if available
  loadVoices()

  // Chrome loads voices asynchronously
  if (!voicesLoaded) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices()
    }
  }
}

/**
 * Speak text using Tilo's preferred UK female voice
 */
export function speak(
  text: string,
  options?: {
    rate?: number
    pitch?: number
    volume?: number
  },
) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis not available")
    return
  }

  // Initialize voices if not already done
  if (!voicesLoaded) {
    initializeVoices()
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  // Set voice parameters
  utterance.rate = options?.rate ?? 0.9 // Slightly slower for clarity
  utterance.pitch = options?.pitch ?? 1.1 // Slightly higher for friendliness
  utterance.volume = options?.volume ?? 1.0
  utterance.lang = "en-GB"

  // Apply preferred voice if available
  if (preferredVoice) {
    utterance.voice = preferredVoice
  }

  // Error handling
  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error)
  }

  utterance.onend = () => {
    console.log("Tilo finished speaking")
  }

  // Speak the text
  window.speechSynthesis.speak(utterance)
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Get information about the currently selected voice
 */
export function getSelectedVoice(): SpeechSynthesisVoice | null {
  return preferredVoice
}

/**
 * Get all available voices for debugging
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return []
  return window.speechSynthesis.getVoices()
}

/**
 * Initialize voices when the module loads
 */
if (typeof window !== "undefined") {
  initializeVoices()
}
