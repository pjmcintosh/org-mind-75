"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, User, Brain, Sparkles } from "lucide-react"
import TiloAvatar from "@/components/tilo/TiloAvatar"
import MicButton from "@/components/tilo/MicButton"
import { speakText, getTimeBasedGreeting, getCEOStatusUpdate } from "@/lib/tilo/audio-utils"
import { useUserRole } from "@/lib/useUserRole"

interface Message {
  id: string
  type: "user" | "tilo"
  content: string
  timestamp: Date
}

export default function DesktopTiloPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [currentRole, setCurrentRole] = useState("Admin")
  const [showTips, setShowTips] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tiloState, setTiloState] = useState<"idle" | "listening" | "alert">("idle")
  const [speechError, setSpeechError] = useState<string | null>(null)
  const { role } = useUserRole()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load user role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("tilo-current-role") || "Admin"
    setCurrentRole(storedRole)
  }, [])

  // Update Tilo state based on listening and processing states
  useEffect(() => {
    if (isListening) {
      setTiloState("listening")
    } else if (isProcessing) {
      setTiloState("alert")
    } else {
      setTiloState("idle")
    }
  }, [isListening, isProcessing])

  // Handle voice input - using useCallback to prevent recreation on each render
  const handleVoiceInput = useCallback((transcript: string) => {
    console.log("Voice transcript received:", transcript)
    if (transcript.trim()) {
      // Create user message object
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: transcript,
        timestamp: new Date(),
      }

      // Add message to state
      setMessages((prev) => [...prev, userMessage])
      setShowTips(false)

      // Process the message
      processUserMessage(transcript)
    }
  }, [])

  // Process user message - using useCallback to prevent recreation on each render
  const processUserMessage = useCallback(
    async (content: string) => {
      setIsProcessing(true)

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let response = ""

      // Generate contextual responses based on user input
      const lowerContent = content.toLowerCase()

      if (lowerContent.includes("status") || lowerContent.includes("update") || lowerContent.includes("briefing")) {
        const statusData = getCEOStatusUpdate()
        response = `${getTimeBasedGreeting()} Here's your current status update:\n\n${statusData.summary}\n\nYour immediate action items:\n${statusData.actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}`
      } else if (lowerContent.includes("hello") || lowerContent.includes("hi") || lowerContent.includes("hey")) {
        response = `${getTimeBasedGreeting()} I'm Tilo, your organizational mind. I'm here to help you with insights, decisions, and operational updates. What would you like to know?`
      } else if (lowerContent.includes("agent") || lowerContent.includes("team")) {
        response = `Currently monitoring 7 active agents across your organization:\n\n• Ada (Legal) - 98% efficiency\n• Bob (Client Relations) - 92% efficiency\n• Ephrya (Strategic Analysis) - 96% efficiency\n• Eve (Operations) - 94% efficiency\n• Janet (Finance) - 97% efficiency\n• Lexi (Compliance) - 95% efficiency\n• Max (Technical) - 91% efficiency\n\nAll agents are performing within optimal parameters. Would you like detailed insights on any specific agent?`
      } else if (lowerContent.includes("project") || lowerContent.includes("initiative")) {
        response = `I'm tracking 12 active projects across your organization:\n\n🟢 8 projects on schedule\n🟡 3 projects requiring attention\n🔴 1 project at risk\n\nThe Digital Transformation Initiative (PRJ-001) is currently under review and may need your executive decision. Would you like me to provide detailed analysis?`
      } else if (lowerContent.includes("help") || lowerContent.includes("what can you do")) {
        response = `As your organizational mind, I can help you with:\n\n• Real-time status updates and briefings\n• Agent performance monitoring and insights\n• Project tracking and risk assessment\n• Strategic decision support\n• Operational efficiency analysis\n• Compliance and regulatory guidance\n• Financial performance summaries\n\nWhat specific area would you like to explore?`
      } else {
        response = `I understand you're asking about "${content}". As your organizational mind, I'm analyzing this request in the context of your ${currentRole} role. Let me provide you with relevant insights and recommendations based on current organizational data.`
      }

      const tiloMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "tilo",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, tiloMessage])
      setIsProcessing(false)

      // Speak the response if it's not too long
      if (response.length < 200) {
        speakText(response)
      }
    },
    [currentRole],
  )

  function handleUserMessage(content: string) {
    if (!content.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setShowTips(false)

    // Process the message
    processUserMessage(content)
  }

  function handleSendMessage() {
    if (inputValue.trim() && !isProcessing) {
      handleUserMessage(inputValue)
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  function handleListeningChange(listening: boolean) {
    setIsListening(listening)
  }

  function handleSpeechError(error: string) {
    console.error("Speech recognition error:", error)
    setSpeechError(error)

    // Auto-clear non-critical errors after 5 seconds
    setTimeout(() => {
      setSpeechError(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 px-6 py-10 text-white flex flex-col items-center justify-start">
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Button onClick={() => router.back()} variant="ghost" className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center space-y-6 mb-8">
        {/* Avatar */}
        <div className="relative">
          <TiloAvatar state={tiloState} size="lg" className="w-24 h-24" />
          {isProcessing && <div className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-pulse" />}
        </div>

        {/* Title and Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Brain className="w-8 h-8 text-cyan-400" />
            Ask Tilo
          </h1>
          <p className="text-lg text-cyan-300 max-w-md">
            I'm your organizational mind — ask anything, from insights to decisions.
          </p>
        </div>

        {/* Role Context */}
        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-900/30 rounded-full border border-cyan-700">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300">
            Interacting as: <span className="font-semibold text-white">{role}</span>
          </span>
        </div>
      </div>

      {/* Main Interaction Panel */}
      <div className="w-full max-w-4xl flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 bg-gray-800/70 rounded-xl p-6 shadow-2xl border border-cyan-900/50 backdrop-blur-md mb-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Sparkles className="w-12 h-12 text-cyan-400 opacity-50" />
              <div className="space-y-2">
                <p className="text-xl text-gray-300">Ready to assist you</p>
                <p className="text-sm text-gray-500">Start a conversation by typing or speaking your request</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-700/80 text-gray-100 border border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "tilo" && <Brain className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-60 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/80 text-gray-100 border border-gray-600 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyan-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="bg-gray-700/60 rounded-xl p-4 shadow-inner border border-gray-600">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white placeholder-cyan-400 outline-none text-lg"
              placeholder="Type or speak your request…"
              disabled={isProcessing}
            />

            {/* Voice Button */}
            <MicButton
              onTranscript={handleVoiceInput}
              onListeningChange={handleListeningChange}
              onError={handleSpeechError}
              disabled={isProcessing}
              size="md"
            />

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="p-3 rounded-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 shadow-lg shadow-cyan-500/30"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>

          {/* Error Display */}
          {speechError && (
            <div className="mt-2 text-sm text-amber-400 bg-amber-900/20 px-3 py-2 rounded-md">{speechError}</div>
          )}
        </div>

        {/* Interaction Tips */}
        {showTips && (
          <div className="mt-6 text-center">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-white font-medium mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                How to interact with Tilo
              </h3>
              <div className="text-gray-400 text-sm space-y-1">
                <p>• Ask for briefings, operational updates, or help with decisions</p>
                <p>• Request agent status, project insights, or organizational analysis</p>
                <p>• Tilo adapts responses to your role: executive, analyst, coordinator, and more</p>
                <p>• Use voice commands or type your questions naturally</p>
              </div>
              <Button
                onClick={() => setShowTips(false)}
                variant="ghost"
                className="mt-3 text-xs text-gray-500 hover:text-gray-300"
              >
                Hide tips
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
