"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser } from "@/lib/auth"
import { Bot, Send, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "tilo"
  timestamp: Date
}

export default function ClientTiloPage() {
  console.log("Loaded: ClientTiloChat")

  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const user = getCurrentUser()

  console.log("Chat initialized for role:", user.role)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: `Hello ${user.name}, I'm Tilo — your AI project assistant. I can help answer questions about your submissions, provide insights, or connect you with the Elevate team.`,
      sender: "tilo",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [user.name])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate Tilo response
    setTimeout(() => {
      const responses = [
        "I understand you're looking for project insights. Let me help you with that.",
        "That's a great question about your AI implementation. Based on your project details, I'd recommend focusing on user adoption strategies.",
        "I can see you're interested in the project timeline. Your submission is currently being reviewed by our team.",
        "For questions about your specific use case, I'd suggest connecting with our technical team through the dashboard.",
        "Your project shows great potential! I'm here to help guide you through the next steps.",
      ]

      const tiloMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "tilo",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, tiloMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6 px-6 py-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-cyan-400">Ask Tilo</h1>
        <p className="text-blue-300">Your AI Project Assistant</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-md h-[600px] flex flex-col">
        <div className="border-b border-cyan-500/20 p-6">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-semibold text-cyan-400">Chat with Tilo</h2>
            <Badge variant="outline" className="ml-auto border-cyan-500/30 text-cyan-400">
              {user.role}
            </Badge>
          </div>
          <p className="text-blue-300 text-sm mt-1">Get instant help with your AI project questions</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "tilo" && (
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-700/40 border border-cyan-500/20 text-white shadow-sm"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-cyan-100" : "text-blue-200"}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-slate-700/40 border border-cyan-500/20 text-white rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  <span className="text-sm text-blue-200">Tilo is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-cyan-500/20 p-6">
          <div className="flex gap-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Tilo about your project..."
              className="flex-1 min-h-[60px] resize-none bg-[#101d34]/80 border border-cyan-500/20 text-white placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="lg"
              className="px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-blue-300 mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-md p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">What can Tilo help you with?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-white">Project Status</h4>
            <p className="text-sm text-blue-200">Check on your submission progress and timeline updates</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">AI Insights</h4>
            <p className="text-sm text-blue-200">Get recommendations and insights about your AI implementation</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">Technical Questions</h4>
            <p className="text-sm text-blue-200">Ask about best practices and technical considerations</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-white">Team Connection</h4>
            <p className="text-sm text-blue-200">Get connected with the right Elevate team members</p>
          </div>
        </div>
      </div>
    </div>
  )
}
