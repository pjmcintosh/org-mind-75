"use client"

import React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Smartphone, Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"


// Text-to-Speech utility
function speakText(text: string) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    utterance.volume = 0.8
    speechSynthesis.speak(utterance)
  }
}

// Mobile CEO Demo Page - Standalone component with no layout
function MobileCEODemo() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [awaitingStatusResponse, setAwaitingStatusResponse] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [lastResponse, setLastResponse] = useState<string>("")
  const [speechError, setSpeechError] = useState<string>("")

  const recognitionRef = React.useRef<SpeechRecognition | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"
        recognition.maxAlternatives = 1

        recognition.onstart = () => {
          console.log("Speech recognition started")
          setIsListening(true)
          setSpeechError("")
        }

        recognition.onresult = (event) => {
          console.log("Speech recognition result:", event.results[0][0].transcript)
          const transcript = event.results[0][0].transcript
          handleVoiceResponse(transcript)
        }

        recognition.onend = () => {
          console.log("Speech recognition ended")
          setIsListening(false)
        }

        recognition.onerror = (event) => {
          console.log("Speech recognition error:", event.error)
          setIsListening(false)

          // Handle different error types gracefully
          switch (event.error) {
            case "no-speech":
              // This is normal - user didn't speak within timeout
              if (awaitingStatusResponse) {
                setSpeechError("No speech detected. Please try again.")
                setTimeout(() => {
                  const message = "I didn't hear anything. Would you like your status update? Please say yes or no."
                  setLastResponse(message)
                  speakText(message)
                  setSpeechError("")
                }, 1000)
              }
              break

            case "audio-capture":
              setSpeechError("Microphone access denied. Please allow microphone access and try again.")
              break

            case "not-allowed":
              setSpeechError("Microphone permission denied. Please enable microphone access in your browser settings.")
              break

            case "network":
              setSpeechError("Network error. Please check your connection and try again.")
              break

            case "aborted":
              // User stopped recognition - this is normal
              break

            default:
              setSpeechError("Speech recognition error. Please try again.")
              break
          }
        }

        recognitionRef.current = recognition
      }
    }

    return () => {
      // Cleanup recognition on effect cleanup
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          // Ignore errors during cleanup
        }
      }
    }
  }, [awaitingStatusResponse])

  // Demo mode greeting logic
  useEffect(() => {
    if (!hasGreeted && speechSupported) {
      setHasGreeted(true)

      // Delay greeting to allow component to fully mount
      const greetingTimer = setTimeout(() => {
        const greeting = getTimeBasedGreeting()
        const fullGreeting = `${greeting} Would you like a status update and your immediate action items?`

        setLastResponse(fullGreeting)
        speakText(fullGreeting)
        setAwaitingStatusResponse(true)

        // Auto-start listening after greeting with additional delay
        setTimeout(() => {
          if (recognitionRef.current && !isListening) {
            startListening()
          }
        }, 4000) // Increased delay to ensure TTS finishes
      }, 1500) // Increased initial delay

      return () => clearTimeout(greetingTimer)
    }
  }, [hasGreeted, speechSupported, isListening])

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning."
    if (hour < 17) return "Good afternoon."
    return "Good evening."
  }

  const getCEOStatusUpdate = () => {
    return {
      summary: `All systems operational. 7 active agents performing at 94% efficiency. 3 projects on track, 1 requiring attention.`,
      actionItems: [
        "Review Q1 budget variance report - 15 minutes",
        "Approve new security protocol implementation",
        "Decision needed on Project Micron-A timeline extension",
      ],
    }
  }

  const startListening = () => {
    if (!speechSupported || !recognitionRef.current || isListening) {
      return
    }

    try {
      // Stop any existing recognition first
      recognitionRef.current.stop()

      // Small delay before starting new recognition
      setTimeout(() => {
        if (recognitionRef.current && !isListening) {
          recognitionRef.current.start()
        }
      }, 100)
    } catch (error) {
      console.error("Failed to start speech recognition:", error)
      setSpeechError("Failed to start voice recognition. Please try again.")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Failed to stop speech recognition:", error)
      }
    }
  }

  const handleVoiceResponse = async (transcript: string) => {
    const response = transcript.toLowerCase().trim()
    console.log("Processing voice response:", response)

    if (awaitingStatusResponse) {
      if (
        response.includes("yes") ||
        response.includes("sure") ||
        response.includes("okay") ||
        response.includes("yeah")
      ) {
        setIsProcessing(true)
        setAwaitingStatusResponse(false)

        // Simulate brief processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const statusData = getCEOStatusUpdate()
        const statusMessage = `Here's your status update: ${statusData.summary}\n\nYour immediate action items:\n${statusData.actionItems
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")}`

        setLastResponse(statusMessage)

        // Speak the status update
        const spokenUpdate = `${statusData.summary} Your top action items are: ${statusData.actionItems.join(". ")}`
        speakText(spokenUpdate)

        setIsProcessing(false)
      } else if (
        response.includes("no") ||
        response.includes("not now") ||
        response.includes("later") ||
        response.includes("nope")
      ) {
        const responseMessage = "Understood. Let me know when you're ready for your briefing."
        setLastResponse(responseMessage)
        speakText(responseMessage)
        setAwaitingStatusResponse(false)
      } else {
        // Didn't understand, ask again
        const clarificationMessage = "I didn't catch that. Would you like your status update? Please say yes or no."
        setLastResponse(clarificationMessage)
        speakText(clarificationMessage)

        // Restart listening after clarification
        setTimeout(() => {
          if (!isListening) {
            startListening()
          }
        }, 3000)
      }
    }
  }

  const toggleVoiceRecognition = () => {
    if (!speechSupported) {
      setSpeechError("Speech recognition is not supported in your browser.")
      return
    }

    if (isListening) {
      stopListening()
    } else {
      setSpeechError("")
      startListening()
    }
  }

  const handleExitDemo = () => {
    // Stop any ongoing recognition
    stopListening()

    // Clean up demo flags
    if (typeof window !== "undefined") {
      localStorage.removeItem("tilo-current-role")
      localStorage.removeItem("tilo-mobile-demo") // Extra cleanup
      delete (window as any).__IS_MOBILE_APP__
      delete (window as any).__IS_MOBILE_DEMO__
    }
    router.push("/select-role")
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center h-screen w-screen bg-black text-white p-6 pb-10 overflow-hidden">
      {/* Exit button - top right with consistent style */}
      <button
        onClick={handleExitDemo}
        className="absolute top-4 right-4 text-sm text-white underline flex items-center gap-1 z-10 touch-manipulation"
      >
        <ArrowLeft className="w-3 h-3" />
        Exit Demo
      </button>

      {/* Main content - centered with optimized spacing */}
      <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto">
        {/* Avatar - larger and more prominent */}
        <div className="relative">
          <video
            src={
              isListening
                ? "/tilo/listening-loop1.webm"
                : isProcessing
                  ? "/tilo/alert-loop1.webm"
                  : "/tilo/idle-loop1.webm"
            }
            autoPlay
            muted
            loop
            playsInline
            className="w-28 h-28 rounded-full border-2 border-cyan-400 shadow-xl object-cover"
          />
          {isListening && (
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 animate-pulse shadow-lg"></div>
          )}
        </div>

        {/* Title and status */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-white tracking-wide">Tilo</h2>
          <p className="text-sm text-slate-300 font-medium">Executive Assistant</p>

          {/* Dynamic status message */}
          {awaitingStatusResponse && (
            <p className="text-sm text-cyan-300 text-center max-w-xs leading-relaxed px-2">
              Would you like a status update and your immediate action items?
            </p>
          )}
        </div>

        {/* Status indicator with animation */}
        <div className="text-center">
          <p
            className={cn(
              "text-xs text-slate-400 text-center transition-all duration-300",
              isListening && "text-cyan-300 animate-pulse",
              awaitingStatusResponse && "text-green-300 animate-pulse",
              speechError && "text-amber-300",
            )}
          >
            {isListening
              ? "Listening... Speak now"
              : isProcessing
                ? "Processing..."
                : awaitingStatusResponse
                  ? "Say 'yes' or 'no'"
                  : speechError
                    ? speechError
                    : "Tap to speak"}
          </p>
        </div>

        {/* Mic button - optimized for touch */}
        <button
          onClick={toggleVoiceRecognition}
          disabled={isProcessing || !speechSupported}
          className={cn(
            "mt-6 w-16 h-16 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center touch-manipulation active:scale-95",
            isListening && "bg-red-500 animate-pulse shadow-red-500/30",
            isProcessing && "bg-slate-500 opacity-50 cursor-not-allowed",
            awaitingStatusResponse && !isListening && "bg-green-500 animate-pulse shadow-green-500/30",
            !isListening && !isProcessing && !awaitingStatusResponse && "bg-cyan-400 shadow-cyan-400/30",
            speechError && "bg-amber-500 shadow-amber-500/30",
          )}
        >
          {isListening ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
        </button>

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex items-center gap-3 text-cyan-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
            <span className="font-medium">Thinking...</span>
          </div>
        )}

        {/* Error display */}
        {speechError && (
          <div className="text-center text-amber-300 text-sm max-w-xs bg-amber-900/20 rounded-xl p-4 border border-amber-600/30 backdrop-blur-sm">
            <p className="font-medium">{speechError}</p>
          </div>
        )}

        {/* Last Response - compact for mobile */}
        {lastResponse && !awaitingStatusResponse && !speechError && (
          <div className="max-w-xs text-center">
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-600/50 max-h-32 overflow-y-auto backdrop-blur-sm">
              <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-line">{lastResponse}</p>
            </div>
          </div>
        )}

        {/* Speech support warning */}
        {!speechSupported && (
          <div className="text-center text-amber-300 text-sm max-w-xs bg-amber-900/20 rounded-xl p-4 border border-amber-600/30">
            <p className="font-medium">Voice not supported in this browser</p>
          </div>
        )}
      </div>

      {/* Demo indicator - minimal and positioned for safe area */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-purple-600/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs border border-purple-400/30">
          <Smartphone className="w-3 h-3" />
          <span className="font-medium">CEO Demo</span>
        </div>
      </div>
    </div>
  )
}

export default function AskTiloPage() {
  const router = useRouter()
  const [isMobileDemo, setIsMobileDemo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for mobile demo mode or screen size
    const checkDeviceAndRedirect = () => {
      if (typeof window !== "undefined") {
        const isMobileDemo = localStorage.getItem("tilo-mobile-demo") === "true"
        const isMobile = window.innerWidth < 768

        if (isMobileDemo) {
          // Set global flag for TiloInterface to detect
          ;(window as any).__IS_MOBILE_APP__ = true
          ;(window as any).__IS_MOBILE_DEMO__ = true
          router.push("/admin/ask-tilo/mobile")
        } else if (isMobile) {
          router.push("/admin/ask-tilo/mobile")
        } else {
          router.push("/admin/ask-tilo/desktop")
        }
      }
    }

    checkDeviceAndRedirect()
  }, [router])

  // Loading state while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting to appropriate Tilo interface...</div>
    </div>
  )
}
