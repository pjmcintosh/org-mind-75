"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Mic, MicOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import TiloAvatar from "@/components/tilo/TiloAvatar"
import { useSpeechRecognition } from "@/components/tilo/useSpeechRecognition"
import { getPendingPOCsForCEO, recordApproval, type POCRequest } from "@/lib/workflows/pocApprovalWorkflow"

interface TiloApprovalProps {
  onComplete?: (approved: boolean, pocId: string) => void
  onExit?: () => void
}

export const TiloApproval: React.FC<TiloApprovalProps> = ({ onComplete, onExit }) => {
  const [tiloState, setTiloState] = useState<"idle" | "listening" | "alert">("idle")
  const [pendingPOCs, setPendingPOCs] = useState<POCRequest[]>([])
  const [currentPOC, setCurrentPOC] = useState<POCRequest | null>(null)
  const [stage, setStage] = useState<"initial" | "review" | "decision" | "complete">("initial")
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  // Speech recognition hook
  const { isListening, startListening, stopListening, isSupported } = useSpeechRecognition(handleVoiceInput)

  // Load pending POCs on mount
  useEffect(() => {
    const loadPendingPOCs = () => {
      try {
        const pocs = getPendingPOCsForCEO()
        setPendingPOCs(pocs)

        if (pocs.length > 0) {
          setCurrentPOC(pocs[0])
          setStage("initial")
          setMessage(`You have ${pocs.length} proof-of-concept${pocs.length > 1 ? "s" : ""} awaiting your approval.`)

          // Auto-speak the greeting after a delay
          setTimeout(() => {
            speakText(
              `Hi. You have ${pocs.length} proof-of-concept${pocs.length > 1 ? "s" : ""} awaiting your approval. Would you like to review it now?`,
            )

            // Auto-start listening after speaking
            setTimeout(() => {
              startListening()
              setTiloState("listening")
            }, 4000)
          }, 1000)
        } else {
          setMessage("You have no pending proof-of-concepts to review.")
        }
      } catch (err) {
        console.error("Error loading pending POCs:", err)
        setError("Failed to load pending approvals.")
      }
    }

    loadPendingPOCs()
  }, [])

  // Handle voice input
  function handleVoiceInput(transcript: string) {
    if (!transcript.trim()) return

    console.log(`[Tilo] Voice input: "${transcript}"`)
    setTiloState("alert")

    // Process based on current stage
    switch (stage) {
      case "initial":
        handleInitialResponse(transcript)
        break
      case "review":
        handleReviewResponse(transcript)
        break
      case "decision":
        handleDecisionResponse(transcript)
        break
    }
  }

  // Handle initial "Would you like to review it now?" response
  function handleInitialResponse(transcript: string) {
    const response = transcript.toLowerCase()

    if (response.includes("yes") || response.includes("sure") || response.includes("okay")) {
      setIsProcessing(true)

      // Show POC details
      setTimeout(() => {
        setStage("review")
        setIsProcessing(false)

        if (currentPOC) {
          const message = `Here's the proof-of-concept for review: ${currentPOC.voPrompt?.substring(0, 100)}... Budget: $${currentPOC.budget || "Not specified"}. Would you like to see more details?`
          setMessage(message)
          speakText(message)

          // Auto-start listening after speaking
          setTimeout(() => {
            startListening()
            setTiloState("listening")
          }, 6000)
        }
      }, 1500)
    } else if (response.includes("no") || response.includes("not now") || response.includes("later")) {
      setMessage("No problem. I'll keep the POCs in your queue for later review.")
      speakText("No problem. I'll keep the POCs in your queue for later review.")

      if (onExit) {
        setTimeout(onExit, 3000)
      }
    } else {
      // Unclear response
      setMessage(
        "I didn't catch that. Would you like to review the pending proof-of-concept now? Please say yes or no.",
      )
      speakText("I didn't catch that. Would you like to review the pending proof-of-concept now? Please say yes or no.")

      // Auto-start listening after speaking
      setTimeout(() => {
        startListening()
        setTiloState("listening")
      }, 4000)
    }
  }

  // Handle "Would you like to see more details?" response
  function handleReviewResponse(transcript: string) {
    const response = transcript.toLowerCase()

    if (response.includes("yes") || response.includes("sure") || response.includes("more")) {
      // Show full POC details
      if (currentPOC) {
        const fullDetails = `
          Project: ${extractProjectTitle(currentPOC.requirements)}
          Budget: $${currentPOC.budget || "Not specified"}
          Complexity: ${currentPOC.complexity || "Not specified"}
          
          ${currentPOC.voPrompt}
        `

        setMessage(fullDetails)
        speakText("Here are the full details. Do you approve this proof-of-concept?")

        setStage("decision")

        // Auto-start listening after speaking
        setTimeout(() => {
          startListening()
          setTiloState("listening")
        }, 3000)
      }
    } else {
      // Skip to decision
      setMessage("Do you approve this proof-of-concept?")
      speakText("Do you approve this proof-of-concept?")

      setStage("decision")

      // Auto-start listening after speaking
      setTimeout(() => {
        startListening()
        setTiloState("listening")
      }, 2000)
    }
  }

  // Handle final approval decision
  function handleDecisionResponse(transcript: string) {
    const response = transcript.toLowerCase()

    if (!currentPOC) return

    setIsProcessing(true)

    if (response.includes("yes") || response.includes("approve") || response.includes("approved")) {
      // Record approval
      recordApproval({
        pocId: currentPOC.id,
        approved: true,
        actor: "CEO",
        comments: "Approved via voice interface",
      })

      setMessage(`Proof-of-concept approved. I'll notify the team to proceed.`)
      speakText(`Proof-of-concept approved. I'll notify the team to proceed.`)

      if (onComplete) {
        onComplete(true, currentPOC.id)
      }
    } else if (response.includes("no") || response.includes("reject") || response.includes("denied")) {
      // Record rejection
      recordApproval({
        pocId: currentPOC.id,
        approved: false,
        actor: "CEO",
        comments: "Rejected via voice interface",
      })

      setMessage(`Proof-of-concept rejected. I'll notify the team.`)
      speakText(`Proof-of-concept rejected. I'll notify the team.`)

      if (onComplete) {
        onComplete(false, currentPOC.id)
      }
    } else {
      // Unclear response
      setIsProcessing(false)
      setMessage("I need a clear yes or no. Do you approve this proof-of-concept?")
      speakText("I need a clear yes or no. Do you approve this proof-of-concept?")

      // Auto-start listening after speaking
      setTimeout(() => {
        startListening()
        setTiloState("listening")
      }, 3000)

      return
    }

    setStage("complete")
    setIsProcessing(false)
    setTiloState("idle")

    // Exit after a delay
    if (onExit) {
      setTimeout(onExit, 5000)
    }
  }

  // Helper to extract project title from requirements
  function extractProjectTitle(requirements: string): string {
    const match = requirements.match(/Project:\s*([^\n]+)/)
    return match ? match[1] : "Untitled Project"
  }

  // Helper to speak text using browser TTS
  function speakText(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  // Render error if speech not supported
  if (!isSupported) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white p-6">
        <TiloAvatar state="idle" size="lg" className="w-28 h-28" />
        <h2 className="text-2xl font-bold mt-6">Voice Approval Unavailable</h2>
        <p className="text-center mt-2 text-red-400">
          Your browser doesn't support speech recognition, which is required for CEO voice approvals.
        </p>
        <Button onClick={onExit} className="mt-6">
          Return to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white p-6 overflow-hidden">
      {/* Exit Button */}
      <button onClick={onExit} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
        <X className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center space-y-6 max-w-sm w-full">
        {/* Avatar */}
        <div className="relative">
          <TiloAvatar state={tiloState} size="lg" className="w-28 h-28" />
          {isListening && <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-pulse" />}
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Tilo - POC Approval</h1>
          <p className="text-sm text-cyan-300 max-w-xs text-center">
            {isListening
              ? "Listening... Speak now"
              : isProcessing
                ? "Processing your response..."
                : stage === "decision"
                  ? "Say 'yes' to approve or 'no' to reject"
                  : "Voice interface for CEO approvals"}
          </p>
        </div>

        {/* Voice Button */}
        <Button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing || stage === "complete"}
          className={`w-16 h-16 rounded-full shadow-xl transition-all duration-300 touch-manipulation active:scale-95 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/50"
              : stage === "decision"
                ? "bg-green-600 hover:bg-green-700 shadow-green-500/50"
                : "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/50"
          } ${isProcessing || stage === "complete" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
        </Button>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-2 text-cyan-400 text-sm">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <span>Processing...</span>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-center text-amber-400 text-xs max-w-xs bg-amber-900/20 px-3 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className="max-w-sm w-full">
            <div className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-slate-700 max-h-60 overflow-y-auto">
              <p className="text-slate-100 text-sm whitespace-pre-line">{message}</p>
            </div>
          </div>
        )}

        {/* Decision Buttons (shown during decision stage) */}
        {stage === "decision" && (
          <div className="flex space-x-4 mt-4">
            <Button
              onClick={() => handleDecisionResponse("yes")}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Approve
            </Button>
            <Button
              onClick={() => handleDecisionResponse("no")}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              <X className="w-4 h-4" /> Reject
            </Button>
          </div>
        )}
      </div>

      {/* POC Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          CEO POC Approval
        </div>
      </div>
    </div>
  )
}

export default TiloApproval
