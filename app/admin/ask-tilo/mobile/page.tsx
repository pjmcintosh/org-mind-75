"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import TiloAvatar from "@/components/tilo/TiloAvatar"
import { useTiloState } from "@/components/tilo/useTiloState"
import { speakText, getTimeBasedGreeting, getCEOStatusUpdate } from "@/lib/tilo/audio-utils"
import { getPendingPOCsForCEO, type POCRequest } from "@/lib/workflows/pocApprovalWorkflow"
import TiloApproval from "@/agents/tilo/TiloApproval"
import { useUserRole, setUserRole } from "@/lib/useUserRole"

interface Message {
  id: string
  type: "user" | "tilo"
  content: string
  timestamp: Date
}

export default function MobileAskTiloPage() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [hasGreeted, setHasGreeted] = useState(false)
  const [awaitingStatusResponse, setAwaitingStatusResponse] = useState(false)
  const [pendingPOCs, setPendingPOCs] = useState<POCRequest[]>([])
  const [showPOCApproval, setShowPOCApproval] = useState(false)
  const { tiloState, isListening, isProcessing, speechSupported, speechError, startListening, setProcessing } =
    useTiloState({
      onTranscript: handleVoiceInput,
      onError: (error) => console.error("Speech error:", error),
    })
  const { role } = useUserRole()

  // Check for mobile demo mode and pending POCs
  useEffect(() => {
    const isMobileDemo = localStorage.getItem("tilo-mobile-demo") === "true"

    // Set user role
    if (role) {
      setUserRole(role)
    }

    // Check for pending POCs if CEO
    if (role === "CEO") {
      try {
        const pocs = getPendingPOCsForCEO()
        setPendingPOCs(pocs)

        if (pocs.length > 0 && !hasGreeted) {
          setHasGreeted(true)

          // Start POC approval flow after a delay
          setTimeout(() => {
            setShowPOCApproval(true)
          }, 1000)

          return // Skip normal greeting flow
        }
      } catch (err) {
        console.error("Error checking pending POCs:", err)
      }
    }

    // Normal greeting flow
    if (isMobileDemo && role === "CEO" && !hasGreeted && speechSupported) {
      setHasGreeted(true)

      // Clean up demo flag
      localStorage.removeItem("tilo-mobile-demo")

      // Start CEO greeting flow
      setTimeout(() => {
        const greeting = getTimeBasedGreeting()
        const fullGreeting = `${greeting} Would you like a status update and your immediate action items?`

        const greetingMessage: Message = {
          id: "ceo-greeting",
          type: "tilo",
          content: fullGreeting,
          timestamp: new Date(),
        }
        setMessages([greetingMessage])

        speakText(fullGreeting)
        setAwaitingStatusResponse(true)

        // Auto-start listening after greeting
        setTimeout(() => {
          startListening()
        }, 3000)
      }, 1000)
    } else if (!hasGreeted) {
      // Standard mobile greeting
      const welcomeMessage: Message = {
        id: "welcome",
        type: "tilo",
        content: "Hello! I'm Tilo, your organizational mind. Tap the microphone to speak with me.",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
      setHasGreeted(true)
    }
  }, [hasGreeted, speechSupported, startListening, role])

  function handleVoiceInput(transcript: string) {
    if (transcript.trim()) {
      handleUserMessage(transcript)
    }
  }

  async function handleUserMessage(content: string) {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Handle CEO status response
    if (awaitingStatusResponse && role === "CEO") {
      await handleCEOStatusRequest(content)
      return
    }

    setProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response = generateResponse(content)
    const tiloMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "tilo",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, tiloMessage])
    setProcessing(false)

    // Speak the response
    speakText(response)
  }

  async function handleCEOStatusRequest(userResponse: string) {
    const response = userResponse.toLowerCase()

    if (response.includes("yes") || response.includes("sure") || response.includes("okay")) {
      setProcessing(true)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const statusData = getCEOStatusUpdate()
      const statusMessage = `Here's your status update: ${statusData.summary}\n\nYour immediate action items:\n${statusData.actionItems
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n")}`

      const tiloResponse: Message = {
        id: Date.now().toString(),
        type: "tilo",
        content: statusMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, tiloResponse])

      const spokenUpdate = `${statusData.summary} Your top action items are: ${statusData.actionItems.join(". ")}`
      speakText(spokenUpdate)

      setAwaitingStatusResponse(false)
      setProcessing(false)
    } else if (response.includes("no") || response.includes("not now") || response.includes("later")) {
      const tiloResponse: Message = {
        id: Date.now().toString(),
        type: "tilo",
        content: "Understood. Let me know when you're ready for your briefing.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, tiloResponse])
      speakText("Understood. Let me know when you're ready for your briefing.")

      setAwaitingStatusResponse(false)
    } else {
      const clarificationMessage: Message = {
        id: Date.now().toString(),
        type: "tilo",
        content: "I didn't catch that. Would you like your status update? Please say yes or no.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, clarificationMessage])
      speakText("I didn't catch that. Would you like your status update? Please say yes or no.")
    }
  }

  function generateResponse(content: string): string {
    const responses = [
      "I understand your request. Let me help you with that organizational challenge.",
      "That's an interesting question. Here's what I can tell you based on our current data.",
      "Based on our organizational insights, I recommend the following approach.",
      "I've analyzed the situation and here are some insights that might help.",
      "Let me connect you with the right resources for this request.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  function exitDemo() {
    localStorage.removeItem("tilo-mobile-demo")
    localStorage.removeItem("tilo-current-role")
    router.push("/select-role")
  }

  function handlePOCApprovalComplete(approved: boolean, pocId: string) {
    // Update pending POCs
    const updatedPOCs = getPendingPOCsForCEO()
    setPendingPOCs(updatedPOCs)

    // Hide approval interface
    setShowPOCApproval(false)

    // Show confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      type: "tilo",
      content: `POC ${approved ? "approved" : "rejected"}. ${updatedPOCs.length > 0 ? `You have ${updatedPOCs.length} more POCs awaiting approval.` : "No more POCs awaiting approval."}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, confirmationMessage])
  }

  // If showing POC approval interface
  if (showPOCApproval) {
    return <TiloApproval onComplete={handlePOCApprovalComplete} onExit={() => setShowPOCApproval(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4 py-6 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button onClick={() => router.back()} variant="ghost" className="text-slate-400 hover:text-white p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-white">Tilo Mobile</h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <TiloAvatar state={tiloState} size="lg" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            {/* Message content */}
            {message.type === "user" ? (
              <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-end">
                <span className="text-white">{message.content}</span>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-3 flex items-center">
                <span className="text-white">{message.content}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 rounded-lg p-3 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none"
          placeholder="Message Tilo..."
        />
        <Button
          onClick={startListening}
          disabled={isProcessing || !speechSupported}
          className={`ml-2 p-2 rounded-full ${isListening ? "bg-red-500" : "bg-cyan-500"}`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Button
          onClick={() => {
            if (inputValue.trim()) {
              handleUserMessage(inputValue)
              setInputValue("")
            }
          }}
          disabled={!inputValue.trim()}
          className="ml-2 p-2 rounded-full bg-cyan-600"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
