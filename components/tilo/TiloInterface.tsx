"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { detectIntent, getIntentResponse, logVoiceInteraction, type TiloIntent } from "@/lib/workflows/tilo-intents"
import { useTiloState } from "./useTiloState"
import { speak, stopSpeaking, initializeVoices, testSpeech } from "@/lib/voice/speech"
import { Button } from "@/components/ui/button"
import { canUseTiloFeature } from "@/lib/auth/roles"

// Web Speech API type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface TiloInterfaceProps {
  onTextChange: (text: string) => void
}

const TiloInterface: React.FC<TiloInterfaceProps> = ({ onTextChange }) => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [userRole, setUserRole] = useState<string>("client") // Default to client for demo

  const { tiloState, setTiloState } = useTiloState()

  // Initialize voice on component mount
  useEffect(() => {
    const initVoice = async () => {
      const success = await initializeVoices()
      setVoiceReady(success)
      console.log("Voice initialization:", success ? "SUCCESS" : "FAILED")
    }

    initVoice()

    return () => {
      // Stop any ongoing speech when component unmounts
      stopSpeaking()
    }
  }, [])

  // Add this useEffect to detect user role
  useEffect(() => {
    // In a real app, get this from context/session
    const role =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("ephrya-user-role="))
        ?.split("=")[1] || "client"
    setUserRole(role)
  }, [])

  // Helper function to respond with both text and speech
  const respondWithSpeech = (response: string, delay = 2000) => {
    onTextChange(response)
    setIsSpeaking(true)
    setTiloState("alert")

    console.log("Speaking response:", response)

    speak(response, {
      onStart: () => {
        console.log("Speech started")
        setIsSpeaking(true)
      },
      onEnd: () => {
        console.log("Speech ended")
        setIsSpeaking(false)
        setTiloState("idle")
      },
      onError: (error) => {
        console.error("Speech error:", error)
        setIsSpeaking(false)
        setTiloState("idle")
        // Fallback to timeout if speech fails
        setTimeout(() => setTiloState("idle"), delay)
      },
    })
  }

  function handleVoiceIntent(intent: TiloIntent, transcript: string) {
    // Log the interaction
    logVoiceInteraction({
      transcript,
      intent,
      action: intent.type,
    })

    // Set Tilo to alert state when processing
    setTiloState("alert")

    // Check if client role and handle appropriately
    if (userRole === "client" || userRole === "new client") {
      const response = getIntentResponse(intent, transcript, userRole)
      respondWithSpeech(response)
      return
    }

    // Existing admin/staff handling...
    switch (intent.type) {
      case "approve_poc":
        submitPOCApproval("approved", transcript)
        break
      case "reject_poc":
        submitPOCApproval("rejected", transcript)
        break
      case "get_status":
        fetchTiloStatusReport()
        break
      case "get_todo":
        fetchTiloActionItems()
        break
      case "delegate_task":
        handleTaskDelegation(intent.entities?.agent, transcript)
        break
      case "get_financial":
        fetchFinancialData()
        break
      case "get_compliance":
        fetchComplianceStatus()
        break
      case "get_performance":
        fetchPerformanceMetrics()
        break
      case "get_help":
        showTiloHelp()
        break
      default:
        const response = getIntentResponse(intent, transcript)
        respondWithSpeech(response)
    }
  }

  // Agent action functions with speech integration
  function submitPOCApproval(decision: "approved" | "rejected", transcript: string) {
    const response = `POC ${decision}. I've updated the approval queue and notified the relevant stakeholders.`
    respondWithSpeech(response, 3000)
  }

  function fetchTiloStatusReport() {
    const response = "Current status: 3 POCs pending approval, 2 agents require attention, 1 compliance review due."
    respondWithSpeech(response)
  }

  function fetchTiloActionItems() {
    const response =
      "Priority items: Review Ada's compliance report, approve Max's budget request, delegate security audit to Eve."
    respondWithSpeech(response)
  }

  function handleTaskDelegation(agent: string | null, transcript: string) {
    let response: string
    if (agent) {
      response = `Task delegated to ${agent.charAt(0).toUpperCase() + agent.slice(1)}. I've created the workflow and sent notifications.`
    } else {
      response =
        "Which agent should I delegate this task to? Available: Ada, Bob, Max, Eve, Ephrya, Janet, Lexi, Shandry, Erik."
    }
    respondWithSpeech(response)
  }

  function fetchFinancialData() {
    const response =
      "Financial summary: Budget utilisation at 67%, projected savings of £45,000 this quarter, 2 cost optimisation opportunities identified."
    respondWithSpeech(response)
  }

  function fetchComplianceStatus() {
    const response = "Compliance status: All agents compliant, next audit in 30 days, 1 policy update pending review."
    respondWithSpeech(response)
  }

  function fetchPerformanceMetrics() {
    const response =
      "Performance overview: Average agent efficiency 94%, 3 agents exceeding targets, 1 optimisation recommendation available."
    respondWithSpeech(response)
  }

  function showTiloHelp() {
    const response =
      "I can help with: POC approvals, status updates, task delegation, and more. What would you like to do?"
    respondWithSpeech(response)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText)

    // Process as voice command if it looks like a command
    if (newText.trim().length > 0) {
      const intent = detectIntent(newText)
      if (intent.confidence > 0.6) {
        handleVoiceIntent(intent, newText)
      }
    }
  }

  const startListening = () => {
    // Stop any ongoing speech before listening
    stopSpeaking()
    setIsSpeaking(false)

    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-GB" // UK English for input as well

      recognition.onstart = () => {
        setIsListening(true)
        setTiloState("listening")
      }

      recognition.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        if (finalTranscript) {
          setText((prevText) => prevText + finalTranscript)
          onTextChange((prevText) => prevText + finalTranscript)

          // Process the final transcript for intents
          const intent = detectIntent(finalTranscript)
          if (intent.confidence > 0.6) {
            handleVoiceIntent(intent, finalTranscript)
          }
        }

        if (textareaRef.current) {
          textareaRef.current.value = text + finalTranscript + interimTranscript
        }
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
        setTiloState("idle")
      }

      recognition.onend = () => {
        setIsListening(false)
        if (!isSpeaking) {
          setTiloState("idle")
        }
      }

      recognition.start()
    } else {
      console.log("Speech Recognition Not Available")
    }
  }

  const stopListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognitions = (window as any).webkitSpeechRecognitionInstances || []
      if (recognitions.length > 0) {
        recognitions[recognitions.length - 1].stop()
      }
      setIsListening(false)
      if (!isSpeaking) {
        setTiloState("idle")
      }
    }
  }

  useEffect(() => {
    // Initialize speech recognition instances tracking
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      if (!(window as any).webkitSpeechRecognitionInstances) {
        ;(window as any).webkitSpeechRecognitionInstances = []
      }

      const originalWebkitSpeechRecognition = window.webkitSpeechRecognition
      window.webkitSpeechRecognition = (() => {
        const instance = new originalWebkitSpeechRecognition()
        ;(window as any).webkitSpeechRecognitionInstances.push(instance)
        return instance
      }) as any
    }

    return () => {
      if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
        ;(window as any).webkitSpeechRecognitionInstances = []
      }
      // Stop any ongoing speech when component unmounts
      stopSpeaking()
    }
  }, [])

  // Function to test speech
  const runSpeechTest = async () => {
    setIsSpeaking(true)
    const success = await testSpeech()
    setTimeout(() => setIsSpeaking(false), 3000)
    return success
  }

  return (
    <div className="space-y-4">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Type or speak here..."
        rows={5}
        cols={50}
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={isListening ? stopListening : startListening}
          variant={isListening ? "destructive" : "default"}
          className="transition-colors"
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </Button>

        {isSpeaking && (
          <Button
            onClick={() => {
              stopSpeaking()
              setIsSpeaking(false)
              setTiloState("idle")
            }}
            variant="outline"
            className="transition-colors"
          >
            Stop Speaking
          </Button>
        )}

        {/* Show advanced features only for admin/staff */}
        {canUseTiloFeature(userRole as any, "advanced") && (
          <Button onClick={runSpeechTest} variant="outline" className="ml-auto">
            Test Voice
          </Button>
        )}
      </div>

      <div className="text-sm text-gray-600 flex items-center gap-2">
        {isListening && <span className="flex items-center">🎤 Listening...</span>}
        {isSpeaking && <span className="flex items-center">🔊 Speaking...</span>}
        <span className={`ml-auto ${voiceReady ? "text-green-600" : "text-amber-600"}`}>
          Voice: {voiceReady ? "Ready" : "Initializing..."}
        </span>
      </div>

      {/* Show client-friendly help text */}
      {(userRole === "client" || userRole === "new client") && (
        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
          💡 Try asking: "What's my project status?" or "Can you help me?"
        </div>
      )}
    </div>
  )
}

export default TiloInterface
