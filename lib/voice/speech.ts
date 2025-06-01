"use client"

/**
 * Speech synthesis utility for Tilo with UK female voice preference
 */

// Track initialization state
let initialized = false
let voicesLoaded = false
let preferredVoice: SpeechSynthesisVoice | null = null
const debugMode = true // Set to true to see detailed logs

/**
 * Log debug information if debug mode is enabled
 */
function debugLog(...args: any[]) {
  if (debugMode && typeof console !== "undefined") {
    console.log("[Tilo Voice]", ...args)
  }
}

/**
 * Initialize voice loading and selection
 */
export function initializeVoices(): Promise<boolean> {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    debugLog("Speech synthesis not available")
    return Promise.resolve(false)
  }

  if (initialized) {
    debugLog("Voices already initialized")
    return Promise.resolve(voicesLoaded)
  }

  initialized = true

  return new Promise((resolve) => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()

      if (voices.length === 0) {
        debugLog("No voices available yet")
        return false
      }

      debugLog(`Found ${voices.length} voices`)

      // Log all available voices in debug mode
      if (debugMode) {
        voices.forEach((voice, i) => {
          debugLog(`Voice ${i + 1}: ${voice.name} (${voice.lang})${voice.default ? " - DEFAULT" : ""}`)
        })
      }

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
        debugLog(`Selected voice: ${preferredVoice.name} (${preferredVoice.lang})`)
      } else {
        debugLog("No suitable UK female voice found. Using system default.")
      }

      return true
    }

    // Try to load voices immediately
    if (loadVoices()) {
      resolve(true)
      return
    }

    // If voices aren't available immediately, set up the event listener
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      debugLog("Waiting for voices to load...")

      window.speechSynthesis.onvoiceschanged = () => {
        debugLog("Voices changed event fired")
        const success = loadVoices()
        resolve(success)
      }

      // Set a timeout in case the event never fires
      setTimeout(() => {
        if (!voicesLoaded) {
          debugLog("Voice loading timed out, trying one more time")
          const success = loadVoices()
          resolve(success)
        }
      }, 1000)
    } else {
      // Browser doesn't support onvoiceschanged
      debugLog("Browser doesn't support onvoiceschanged event")

      // Try again after a short delay
      setTimeout(() => {
        const success = loadVoices()
        resolve(success)
      }, 500)
    }
  })
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
    onStart?: () => void
    onEnd?: () => void
    onError?: (error: any) => void
  },
): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      debugLog("Speech synthesis not available")
      if (options?.onError) options.onError("Speech synthesis not available")
      resolve(false)
      return
    }

    // Initialize voices if not already done
    if (!initialized) {
      initializeVoices().then((success) => {
        if (success) {
          performSpeech()
        } else {
          if (options?.onError) options.onError("Failed to initialize voices")
          resolve(false)
        }
      })
    } else {
      performSpeech()
    }

    function performSpeech() {
      try {
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

        // Event handlers
        utterance.onstart = () => {
          debugLog("Started speaking:", text.substring(0, 20) + "...")
          if (options?.onStart) options.onStart()
        }

        utterance.onend = () => {
          debugLog("Finished speaking")
          if (options?.onEnd) options.onEnd()
          resolve(true)
        }

        utterance.onerror = (event) => {
          debugLog("Speech synthesis error:", event)
          if (options?.onError) options.onError(event)
          resolve(false)
        }

        // Speak the text
        window.speechSynthesis.speak(utterance)

        // Chrome bug workaround: speech can sometimes cut off
        if (text.length > 100) {
          const resumeInfinity = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
              clearInterval(resumeInfinity)
            } else {
              window.speechSynthesis.pause()
              window.speechSynthesis.resume()
            }
          }, 5000)
        }
      } catch (error) {
        debugLog("Error in speech synthesis:", error)
        if (options?.onError) options.onError(error)
        resolve(false)
      }
    }
  })
}

/**
 * Stop any ongoing speech
 */
export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel()
    debugLog("Speech cancelled")
  }
}

/**
 * Get information about the currently selected voice
 */
export function getSelectedVoice(): SpeechSynthesisVoice | null {
  return preferredVoice
}

/**
 * Get all available voices
 */
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return []
  return window.speechSynthesis.getVoices()
}

/**
 * Test if speech synthesis is working
 */
export function testSpeech(): Promise<boolean> {
  debugLog("Running speech test...")
  return speak("Hello, I am Tilo. Can you hear me?", {
    onStart: () => debugLog("Test speech started"),
    onEnd: () => debugLog("Test speech completed successfully"),
    onError: (err) => debugLog("Test speech failed:", err),
  })
}

/**
 * Initialize voices when the module loads
 */
if (typeof window !== "undefined") {
  debugLog("Initializing speech synthesis")
  initializeVoices()
}
