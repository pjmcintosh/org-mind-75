"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { detectIntent, getIntentResponse, logVoiceInteraction, type TiloIntent } from "@/lib/workflows/tilo-intents"
import { useTiloState } from "./useTiloState"
import { webkitSpeechRecognition } from "some-speech-recognition-library" // Declare the variable here

interface TiloInterfaceProps {
  onTextChange: (text: string) => void
}

const TiloInterface: React.FC<TiloInterfaceProps> = ({ onTextChange }) => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { tiloState, setTiloState } = useTiloState()

  function handleVoiceIntent(intent: TiloIntent, transcript: string) {
    // Log the interaction
    logVoiceInteraction({
      transcript,
      intent,
      action: intent.type,
    })

    // Set Tilo to alert state when processing
    setTiloState("alert")

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
        onTextChange(response)
        setTimeout(() => setTiloState("idle"), 2000)
    }
  }

  // Agent action functions
  function submitPOCApproval(decision: "approved" | "rejected", transcript: string) {
    // Simulate POC approval workflow
    const response = `POC ${decision}. I've updated the approval queue and notified the relevant stakeholders.`
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 3000)
  }

  function fetchTiloStatusReport() {
    const response = "Current status: 3 POCs pending approval, 2 agents require attention, 1 compliance review due."
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function fetchTiloActionItems() {
    const response =
      "Priority items: Review Ada's compliance report, approve Max's budget request, delegate security audit to Eve."
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function handleTaskDelegation(agent: string | null, transcript: string) {
    if (agent) {
      const response = `Task delegated to ${agent.charAt(0).toUpperCase() + agent.slice(1)}. I've created the workflow and sent notifications.`
      onTextChange(response)
    } else {
      const response =
        "Which agent should I delegate this task to? Available: Ada, Bob, Max, Eve, Ephrya, Janet, Lexi, Shandry, Erik."
      onTextChange(response)
    }
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function fetchFinancialData() {
    const response =
      "Financial summary: Budget utilization at 67%, projected savings of $45K this quarter, 2 cost optimization opportunities identified."
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function fetchComplianceStatus() {
    const response = "Compliance status: All agents compliant, next audit in 30 days, 1 policy update pending review."
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function fetchPerformanceMetrics() {
    const response =
      "Performance overview: Average agent efficiency 94%, 3 agents exceeding targets, 1 optimization recommendation available."
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
  }

  function showTiloHelp() {
    const response =
      "I can help with: POC approvals ('approve proof of concept'), status updates ('what's the status'), task delegation ('delegate to Ada'), and more. What would you like to do?"
    onTextChange(response)
    setTimeout(() => setTiloState("idle"), 2000)
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
    if (webkitSpeechRecognition) {
      const recognition = new webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        let interimTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            setText((prevText) => prevText + event.results[i][0].transcript)
            onTextChange((prevText) => prevText + event.results[i][0].transcript)
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
        if (textareaRef.current) {
          textareaRef.current.value = text + interimTranscript
        }
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      console.log("Speech Recognition Not Available")
    }
  }

  const stopListening = () => {
    if (webkitSpeechRecognition) {
      // Find the active recognition instance and stop it.  This is a bit hacky
      // because we don't have a direct reference to the recognition object.
      // A better approach would be to store the recognition object in state.
      const recognitions = (window as any).webkitSpeechRecognitionInstances || []
      if (recognitions.length > 0) {
        recognitions[recognitions.length - 1].stop()
      }
      setIsListening(false)
    }
  }

  useEffect(() => {
    // Hack to store recognition instances for stopping.
    if (typeof window !== "undefined" && webkitSpeechRecognition) {
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
      if (typeof window !== "undefined" && webkitSpeechRecognition) {
        ;(window as any).webkitSpeechRecognitionInstances = []
      }
    }
  }, [])

  return (
    <div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Type or speak here..."
        rows={5}
        cols={50}
      />
      <div>
        <button onClick={isListening ? stopListening : startListening}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
    </div>
  )
}

export default TiloInterface
