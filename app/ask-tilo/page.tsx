"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Send, User, Brain, Sparkles, Shield, Zap } from "lucide-react"
import TiloAvatar from "@/components/tilo/TiloAvatar"
import MicButton from "@/components/tilo/MicButton"
import { speakText, getTimeBasedGreeting, getCEOStatusUpdate } from "@/lib/tilo/audio-utils"
import { useUserRole } from "@/lib/useUserRole"

interface Message {
  id: string
  type: "user" | "tilo"
  content: string
  timestamp: Date
  restricted?: boolean
}

export default function AskTiloPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [tiloState, setTiloState] = useState<"idle" | "listening" | "alert">("idle")
  const [speechError, setSpeechError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { role, roleConfig, isLoading, hasCapability, hasRestriction } = useUserRole()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

  // Add welcome message based on role
  useEffect(() => {
    if (!isLoading && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "tilo",
        content: getWelcomeMessage(role),
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isLoading, role, messages.length])

  function getWelcomeMessage(userRole: string): string {
    switch (userRole) {
      case "admin":
        return `${getTimeBasedGreeting()} I'm Tilo, your organizational mind. I have full access to system data, agent performance, and operational insights. How can I assist you today?`
      case "ceo":
        return `${getTimeBasedGreeting()} Welcome back. I'm ready to provide executive briefings, strategic insights, and priority updates. What would you like to know?`
      case "client":
        return `${getTimeBasedGreeting()} I'm Tilo, your dedicated assistant. I'm here to help with your projects, reports, and any questions about our services. How can I help you today?`
      case "new client":
        return `${getTimeBasedGreeting()} Welcome to our platform! I'm Tilo, and I'm here to help you get started. I can guide you through our services, schedule calls, and answer any questions you have.`
      default:
        return `${getTimeBasedGreeting()} I'm Tilo, your AI assistant. How can I help you today?`
    }
  }

  // Unified handler for both voice and text input
  function handleUserInput(input: string) {
    if (!input.trim()) return

    // Clear any previous speech errors
    setSpeechError(null)

    // Add user message to chat history
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("") // Clear text input

    // Process the message through Tilo's response system
    processUserMessage(input)
  }

  // Handle voice transcript from MicButton
  function handleVoiceTranscript(transcript: string) {
    console.log("Voice transcript received in main component:", transcript)
    handleUserInput(transcript)
  }

  // Handle listening state changes from MicButton
  function handleListeningChange(listening: boolean) {
    setIsListening(listening)
  }

  // Handle speech recognition errors
  function handleSpeechError(error: string) {
    console.error("Speech recognition error:", error)
    setSpeechError(error)

    // Show browser alert for critical errors
    if (error.includes("not supported") || error.includes("denied")) {
      alert(error + "\n\nRecommendation: Use Chrome or Edge browser and allow microphone access.")
    }
  }

  function handleQuickAction(action: string) {
    handleUserInput(action)
  }

  async function processUserMessage(content: string) {
    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let response = ""
    let isRestricted = false

    // Generate role-aware responses
    const lowerContent = content.toLowerCase()

    // Check for restricted content first
    if (
      hasRestriction("no_internal_data") &&
      (lowerContent.includes("agent") || lowerContent.includes("system") || lowerContent.includes("internal"))
    ) {
      response =
        "I'm sorry, but I don't have access to internal system information. I can help you with account-related questions, project status, or connect you with your account manager."
      isRestricted = true
    } else if (
      hasRestriction("no_system_access") &&
      (lowerContent.includes("admin") || lowerContent.includes("logs") || lowerContent.includes("monitoring"))
    ) {
      response =
        "I don't have access to system administration features. For technical support, I can connect you with our support team."
      isRestricted = true
    } else {
      // Generate role-appropriate responses
      response = generateRoleAwareResponse(content, role)
    }

    const tiloMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "tilo",
      content: response,
      timestamp: new Date(),
      restricted: isRestricted,
    }

    setMessages((prev) => [...prev, tiloMessage])
    setIsProcessing(false)

    // Speak the response if it's not too long and not restricted
    if (response.length < 200 && !isRestricted) {
      speakText(response)
    }
  }

  function generateRoleAwareResponse(content: string, userRole: string): string {
    const lowerContent = content.toLowerCase()

    // Role-specific response logic
    switch (userRole) {
      case "admin":
        return generateAdminResponse(lowerContent)
      case "ceo":
        return generateExecutiveResponse(lowerContent)
      case "client":
        return generateClientResponse(lowerContent)
      case "new client":
        return generateNewClientResponse(lowerContent)
      default:
        return "I understand your request. How can I assist you further?"
    }
  }

  function generateAdminResponse(content: string): string {
    if (content.includes("status") || content.includes("report")) {
      return `System Status Report:\n\n🟢 All 7 agents operational (94% avg efficiency)\n🟢 12 active projects (8 on track, 3 attention needed, 1 at risk)\n🟢 Security systems nominal\n🟡 3 pending approvals require your review\n\nWould you like detailed insights on any specific area?`
    } else if (content.includes("agent")) {
      return `Agent Performance Overview:\n\n• Ada (Legal) - 98% efficiency, 3 active cases\n• Bob (Client Relations) - 92% efficiency, handling 15 clients\n• Ephrya (Strategic Analysis) - 96% efficiency, 2 major analyses\n• Eve (Operations) - 94% efficiency, monitoring 8 processes\n• Janet (Finance) - 97% efficiency, Q1 reporting complete\n• Lexi (Compliance) - 95% efficiency, all audits current\n• Max (Technical) - 91% efficiency, 4 development projects\n\nAll agents are performing within optimal parameters.`
    } else if (content.includes("project") || content.includes("approval")) {
      return `Project Management Dashboard:\n\n📋 Pending Approvals (3):\n• Digital Transformation Initiative - Budget review needed\n• Security Protocol Update - Implementation approval\n• Client Onboarding Automation - Resource allocation\n\n📊 Active Projects (12):\n• 8 projects on schedule\n• 3 projects requiring attention\n• 1 project at risk (PRJ-007 - timeline concerns)\n\nWould you like to review any specific project?`
    }
    return `As an admin, I can provide system monitoring, agent management, project oversight, and compliance reporting. What specific area would you like to explore?`
  }

  function generateExecutiveResponse(content: string): string {
    if (content.includes("briefing") || content.includes("status") || content.includes("priority")) {
      const statusData = getCEOStatusUpdate()
      return `Executive Briefing:\n\n${statusData.summary}\n\nYour Priority Action Items:\n${statusData.actionItems.map((item, i) => `${i + 1}. ${item}`).join("\n")}\n\nAI Confidence Score: 94% (High)\nRecommendation: Focus on Project Micron-A timeline decision.`
    } else if (content.includes("confidence") || content.includes("ai score")) {
      return `AI Confidence Metrics:\n\n🎯 Overall System Confidence: 94%\n📊 Decision Support Accuracy: 97%\n🔍 Predictive Analysis: 91%\n⚡ Response Time: 1.2s avg\n\nHigh confidence across all organizational functions. System is performing optimally for strategic decision support.`
    } else if (content.includes("performance") || content.includes("quarterly")) {
      return `Q1 Performance Summary:\n\n📈 Revenue: 112% of target\n👥 Team Efficiency: 94% average\n🎯 Project Delivery: 89% on-time\n💡 Innovation Index: 96%\n🔒 Security Score: 98%\n\nStrong performance across all metrics. Recommend maintaining current strategic direction.`
    }
    return `As your executive assistant, I can provide strategic briefings, performance metrics, AI confidence scores, and decision support. What insights do you need?`
  }

  function generateClientResponse(content: string): string {
    if (content.includes("project") || content.includes("status")) {
      return `Your Project Status:\n\n📋 Active Projects (2):\n• Digital Marketing Campaign - 75% complete, on schedule\n• Website Redesign - 40% complete, design phase\n\n📊 Recent Deliverables:\n• Q4 Analytics Report - Delivered Dec 15\n• Brand Guidelines Update - Delivered Jan 8\n\nYour account manager Sarah Johnson is available for detailed discussions. Would you like me to schedule a call?`
    } else if (content.includes("report") || content.includes("deliverable")) {
      return `Your Recent Reports:\n\n📄 Available Reports:\n• Monthly Performance Report (Jan 2024)\n• Campaign Analytics Summary (Dec 2023)\n• ROI Analysis Report (Q4 2023)\n\n📥 Upcoming Deliverables:\n• February Performance Report - Due Feb 5\n• Campaign Optimization Plan - Due Feb 12\n\nWould you like me to send any of these reports to your email?`
    } else if (content.includes("contact") || content.includes("manager")) {
      return `Your Account Team:\n\n👤 Account Manager: Sarah Johnson\n📧 Email: sarah.johnson@company.com\n📞 Direct: (555) 123-4567\n\n👤 Technical Lead: Mike Chen\n📧 Email: mike.chen@company.com\n📞 Direct: (555) 123-4568\n\nWould you like me to schedule a call or send them a message?`
    }
    return `I'm here to help with your account, projects, and reports. I can also connect you with your account team or provide support. What do you need assistance with?`
  }

  function generateNewClientResponse(content: string): string {
    if (content.includes("start") || content.includes("onboard")) {
      return `Welcome to our platform! Here's how to get started:\n\n✅ Step 1: Complete your profile setup\n✅ Step 2: Review our service catalog\n✅ Step 3: Schedule your onboarding call\n✅ Step 4: Access your client portal\n\n📞 Your onboarding specialist will contact you within 24 hours. Would you like me to schedule a specific time for your call?`
    } else if (content.includes("service") || content.includes("available")) {
      return `Our Services:\n\n🎯 Digital Marketing\n• Campaign management\n• Analytics and reporting\n• Social media strategy\n\n💻 Web Development\n• Custom websites\n• E-commerce solutions\n• Mobile applications\n\n📊 Data Analytics\n• Business intelligence\n• Performance tracking\n• Predictive modeling\n\nWould you like detailed information about any of these services?`
    } else if (content.includes("call") || content.includes("schedule")) {
      return `I'd be happy to schedule your onboarding call!\n\n📅 Available time slots:\n• Tomorrow 2:00 PM - 3:00 PM\n• Thursday 10:00 AM - 11:00 AM\n• Friday 1:00 PM - 2:00 PM\n\nYour onboarding specialist will cover:\n• Platform overview\n• Service selection\n• Timeline planning\n• Q&A session\n\nWhich time works best for you?`
    }
    return `Welcome! I'm here to help you get started. I can provide information about our services, schedule your onboarding call, or answer any questions you have about our platform.`
  }

  function handleSendMessage() {
    if (inputValue.trim()) {
      handleUserInput(inputValue)
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <TiloAvatar state="idle" size="lg" />
          <p className="text-cyan-300">Loading your personalized experience...</p>
        </div>
      </div>
    )
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
          {isListening && <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-pulse" />}
          {isProcessing && <div className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-pulse" />}
        </div>

        {/* Title and Subtitle */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Brain className="w-8 h-8 text-cyan-400" />
            Ask Tilo
          </h1>
          <p className="text-lg text-cyan-300 max-w-2xl text-center">{roleConfig.subtitle}</p>
        </div>

        {/* Role Context */}
        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-900/30 rounded-full border border-cyan-700">
          <User className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300">
            Role: <span className="font-semibold text-white capitalize">{role}</span>
          </span>
          {hasCapability("full_access") && <Shield className="w-4 h-4 text-green-400 ml-2" />}
          {hasCapability("executive_briefing") && <Zap className="w-4 h-4 text-yellow-400 ml-2" />}
        </div>
      </div>

      {/* Quick Actions */}
      {roleConfig.menuOptions.length > 0 && (
        <div className="w-full max-w-4xl mb-6">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {roleConfig.menuOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleQuickAction(option)}
                  variant="ghost"
                  className="text-left justify-start text-cyan-300 hover:text-white hover:bg-cyan-900/30 text-sm"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

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
                        : message.restricted
                          ? "bg-red-900/50 text-red-100 border border-red-700"
                          : "bg-gray-700/80 text-gray-100 border border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "tilo" && (
                        <Brain
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${message.restricted ? "text-red-400" : "text-cyan-400"}`}
                        />
                      )}
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
              disabled={isProcessing || isListening}
            />

            {/* Voice Button */}
            <MicButton
              onTranscript={handleVoiceTranscript}
              onListeningChange={handleListeningChange}
              onError={handleSpeechError}
              disabled={isProcessing}
              size="md"
              className="flex-shrink-0"
            />

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing || isListening}
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

        {/* Role Capabilities Footer */}
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            <span className="text-cyan-400">Capabilities:</span> {roleConfig.capabilities.join(", ")}
            {roleConfig.restrictions.length > 0 && (
              <span className="ml-4">
                <span className="text-red-400">Restrictions:</span> {roleConfig.restrictions.join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
