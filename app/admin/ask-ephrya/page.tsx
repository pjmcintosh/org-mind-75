"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Send, Brain, AlertTriangle, Clock, Users } from "lucide-react"

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const SUGGESTED_PROMPTS = ["What's at risk this week?", "Are any projects behind schedule?", "Who needs my attention?"]

const MOCK_EPHRYA_RESPONSES = [
  "Based on current data analysis, I've identified 3 projects requiring immediate attention. Janet's budget allocation shows a 15% overrun, and the Q4 compliance review is 2 days behind schedule.",
  "I'm monitoring 12 active projects across all departments. The legal review pipeline has a bottleneck - Ada is handling 40% more cases than optimal capacity.",
  "Priority alert: The client onboarding process has slowed by 23% this week. I recommend reviewing Max's workload distribution and consider escalating to Bob for process optimization.",
  "All systems are operating within normal parameters. Current organizational efficiency is at 87%. I suggest focusing on the pending approvals queue - there are 5 items awaiting CEO review.",
  "I've detected some interesting patterns in cross-departmental collaboration. Would you like me to generate a detailed analysis of agent interaction efficiency?",
]

export default function AskEphryaChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm Tilo, your Organizational Mind. I have real-time insights across all departments and agents. How can I assist you today?",
      isUser: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("Loaded: AskEphryaChatPage")
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const simulateEphryaResponse = () => {
    setIsTyping(true)

    setTimeout(
      () => {
        const randomResponse = MOCK_EPHRYA_RESPONSES[Math.floor(Math.random() * MOCK_EPHRYA_RESPONSES.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: randomResponse,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // 1.5-2.5 second delay
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate Ephrya response
    simulateEphryaResponse()
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-0 m-0 w-full">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm flex-1 flex flex-col">
            <CardHeader className="pb-4 border-b border-slate-700/50">
              <CardTitle className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/ephrya-avatar.png" />
                  <AvatarFallback className="bg-purple-900 text-purple-100">
                    <Brain className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                Ask Tilo – Organizational Mind
              </CardTitle>
              <p className="text-blue-300 text-sm mt-1">
                Ask questions, get insights from your Organizational AI partner.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/20">
                  CEO speaking with Tilo
                </Badge>
                <Badge variant="outline" className="text-blue-300 border-blue-500/20">
                  Real-time insights enabled
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Chat Interface */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium">Organizational Intelligence Chat</span>
                  </div>
                  <Badge variant="outline" className="text-xs text-blue-300 border-blue-500/20">
                    Mock Mode
                  </Badge>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] ${message.isUser ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isUser
                              ? "bg-cyan-900/70 text-white border border-cyan-500/30"
                              : "bg-slate-800/70 text-white border border-slate-600/30"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isUser ? "text-cyan-300" : "text-blue-300"}`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>

                      {!message.isUser && (
                        <Avatar className="h-8 w-8 order-1 mr-2">
                          <AvatarImage src="/ephrya-avatar.png" />
                          <AvatarFallback className="bg-purple-900 text-purple-100 text-xs">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/ephrya-avatar.png" />
                        <AvatarFallback className="bg-purple-900 text-purple-100 text-xs">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-slate-800/70 rounded-lg p-3 border border-slate-600/30">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Prompts */}
                <div className="px-4 py-2 border-t border-slate-700/50 bg-slate-800/50">
                  <p className="text-sm text-blue-300 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_PROMPTS.map((prompt, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestedPrompt(prompt)}
                              className="text-xs h-8 bg-slate-900/70 border-cyan-500/20 text-cyan-300 hover:bg-cyan-900/20 hover:border-cyan-500/30"
                            >
                              {index === 0 && <AlertTriangle className="h-3 w-3 mr-1 text-amber-400" />}
                              {index === 1 && <Clock className="h-3 w-3 mr-1 text-blue-400" />}
                              {index === 2 && <Users className="h-3 w-3 mr-1 text-cyan-400" />}
                              {prompt}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-900 text-cyan-300 border-cyan-500/20">
                            <p>Click to use this prompt</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                  <div className="flex gap-2">
                    <Textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Tilo about organizational insights, agent status, or project risks..."
                      className="min-h-[60px] resize-none bg-slate-900/70 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-500/30"
                      disabled={isTyping}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="h-[60px] px-4 bg-cyan-900/70 hover:bg-cyan-800/70 text-white border border-cyan-500/30"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 text-cyan-300 border-cyan-500/20">
                          <p>Send message (Enter)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
