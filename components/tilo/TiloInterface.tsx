"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { detectIntent, logVoiceInteraction, type TiloIntent } from "@/lib/workflows/tilo-intents"
import { webkitSpeechRecognition } from "some-speech-recognition-library" // Declare or import the variable here

interface TiloInterfaceProps {
  onTextChange: (text: string) => void
}

const TiloInterface: React.FC<TiloInterfaceProps> = ({ onTextChange }) => {
  const [text, setText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText)

    // If this text came from voice recognition, process it as an intent
    if (newText && newText !== text) {
      const intent = detectIntent(newText)
      if (intent.confidence > 0.5) {
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

  const handleVoiceIntent = (intent: TiloIntent, transcript: string) => {
    // Log the interaction for audit purposes
    logVoiceInteraction(transcript, intent)

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
      case "show_dashboard":
        navigateToDashboard()
        break
      case "agent_status":
        fetchAgentStatus()
        break
      case "show_approvals":
        navigateToApprovals()
        break
      case "show_help":
        showTiloHelp()
        break
      default:
        handleFallback(transcript)
    }
  }

  // Agent action functions
  const submitPOCApproval = (decision: "approved" | "rejected", transcript: string) => {
    console.log(`POC ${decision} via voice:`, transcript)
    // In real implementation, this would call the POC approval API
    setText(`POC ${decision} - processing your request...`)
    onTextChange(`POC ${decision} - processing your request...`)
  }

  const fetchTiloStatusReport = () => {
    console.log("Fetching status report")
    setText("Generating status report...")
    onTextChange("Generating status report...")
  }

  const fetchTiloActionItems = () => {
    console.log("Fetching action items")
    setText("Here are your priority action items...")
    onTextChange("Here are your priority action items...")
  }

  const handleTaskDelegation = (agent: string | null, transcript: string) => {
    if (agent) {
      console.log(`Delegating task to ${agent}:`, transcript)
      setText(`Delegating task to ${agent}...`)
      onTextChange(`Delegating task to ${agent}...`)
    } else {
      setText("Which agent should I delegate this to?")
      onTextChange("Which agent should I delegate this to?")
    }
  }

  const navigateToDashboard = () => {
    console.log("Navigating to dashboard")
    setText("Opening dashboard...")
    onTextChange("Opening dashboard...")
    // In real implementation: router.push('/admin/dashboard')
  }

  const fetchAgentStatus = () => {
    console.log("Fetching agent status")
    setText("Checking agent status...")
    onTextChange("Checking agent status...")
  }

  const navigateToApprovals = () => {
    console.log("Navigating to approvals")
    setText("Opening approval queue...")
    onTextChange("Opening approval queue...")
    // In real implementation: router.push('/admin/ceo')
  }

  const showTiloHelp = () => {
    const helpText =
      "I can help with: POC approvals, status reports, task delegation, agent monitoring, and navigation."
    setText(helpText)
    onTextChange(helpText)
  }

  const handleFallback = (transcript: string) => {
    const fallbackText = "I'm not sure how to help with that yet. Try saying 'help' to see what I can do."
    setText(fallbackText)
    onTextChange(fallbackText)
  }

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
