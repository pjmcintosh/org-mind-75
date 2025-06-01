"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MessageCircle, Send, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChatMessage {
  id: string
  role: "user" | "tilo"
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
    variant?: "default" | "outline" | "secondary"
  }>
}

export function TiloChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "tilo",
      content:
        "Hello. I'm Tilo, your organizational intelligence partner. Ask me anything about your organization's performance, agents, or goals — or let me help you take the next step.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateTiloResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase()
    let content = ""
    let actions: ChatMessage["actions"] = []

    if (lowerMessage.includes("prompt") || lowerMessage.includes("max")) {
      content =
        "I can help you with prompts! Max has been generating v0.dev prompts for your projects. Would you like me to show you the latest prompt generation or help you create a new one?"
      actions = [
        { label: "View Max Preview", action: "navigate:/admin/max-preview", variant: "default" },
        { label: "Generate New Prompt", action: "action:generate-prompt", variant: "outline" },
      ]
    } else if (lowerMessage.includes("intake") || lowerMessage.includes("bob")) {
      content =
        "Bob handles all client intakes and requirements gathering. He's currently maintaining a 95% success rate. Would you like to review recent intakes or check Bob's performance?"
      actions = [
        { label: "View Recent Intakes", action: "navigate:/admin/dashboard", variant: "default" },
        { label: "Check Bob's Status", action: "navigate:/admin/agent-monitoring", variant: "outline" },
      ]
    } else if (lowerMessage.includes("plan") || lowerMessage.includes("ada")) {
      content =
        "Ada creates comprehensive project plans based on Bob's intake data. She analyzes requirements and determines project feasibility. Want to see her latest analysis?"
      actions = [
        { label: "View Ada Review", action: "navigate:/admin/ada-review", variant: "default" },
        { label: "See Project Plans", action: "navigate:/admin/dashboard", variant: "outline" },
      ]
    } else if (lowerMessage.includes("status") || lowerMessage.includes("health") || lowerMessage.includes("eve")) {
      content =
        "System status looks good! All agents are operational with 98.7% uptime. Eve is monitoring performance metrics. Would you like detailed system insights?"
      actions = [
        { label: "View Agent Monitoring", action: "navigate:/admin/agent-monitoring", variant: "default" },
        { label: "System Health", action: "action:system-health", variant: "outline" },
      ]
    } else if (lowerMessage.includes("project") || lowerMessage.includes("client")) {
      content =
        "I'm tracking 6 active projects across various stages. TechCorp Digital Transformation and FinanceGroup Risk Assessment are currently in progress. What would you like to know?"
      actions = [
        { label: "View All Projects", action: "navigate:/admin/dashboard", variant: "default" },
        { label: "Export Reports", action: "navigate:/admin/exports", variant: "outline" },
      ]
    } else if (lowerMessage.includes("alert") || lowerMessage.includes("issue")) {
      content =
        "I've identified 2 high-priority alerts requiring attention: low confidence intake data and agent timeout. Should I help you address these?"
      actions = [
        { label: "Review Alerts", action: "navigate:/admin/dashboard", variant: "default" },
        { label: "Acknowledge All", action: "action:acknowledge-alerts", variant: "outline" },
      ]
    } else if (lowerMessage.includes("help") || lowerMessage.includes("what can you do")) {
      content =
        "I coordinate Bob (intake), Ada (analysis), Max (prompts), and Eve (monitoring) to provide organizational intelligence. I can help you navigate projects, review agent performance, generate insights, or take action on recommendations."
      actions = [
        { label: "View Dashboard", action: "navigate:/admin/dashboard", variant: "default" },
        { label: "Agent Monitoring", action: "navigate:/admin/agent-monitoring", variant: "outline" },
      ]
    } else if (lowerMessage.includes("recommendation")) {
      content =
        "I have 5 active recommendations to optimize your system: setting budget caps for Max, refining Bob's intake questions, and adjusting alert thresholds. Which would you like to address first?"
      actions = [
        { label: "View Recommendations", action: "navigate:/admin/agent-monitoring", variant: "default" },
        { label: "Implement Top Priority", action: "action:implement-recommendation", variant: "outline" },
      ]
    } else {
      content =
        "I understand you're asking about organizational insights. I can help you with project status, agent performance, system recommendations, or guide you to specific areas. What would be most helpful right now?"
      actions = [
        { label: "Show Dashboard", action: "navigate:/admin/dashboard", variant: "default" },
        { label: "Agent Status", action: "navigate:/admin/agent-monitoring", variant: "outline" },
      ]
    }

    return {
      id: `tilo-${Date.now()}`,
      role: "tilo",
      content,
      timestamp: new Date(),
      actions,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

    const tiloResponse = generateTiloResponse(userMessage.content)
    setMessages((prev) => [...prev, tiloResponse])
    setIsTyping(false)
  }

  const handleAction = (action: string) => {
    if (action.startsWith("navigate:")) {
      const path = action.replace("navigate:", "")
      window.location.href = path
      setIsOpen(false)
    } else if (action.startsWith("action:")) {
      const actionType = action.replace("action:", "")

      switch (actionType) {
        case "generate-prompt":
          toast({
            title: "Prompt Generation Started",
            description: "Max is generating a new v0.dev prompt based on your latest project requirements.",
          })
          break
        case "system-health":
          toast({
            title: "System Health Check",
            description: "All agents operational. Uptime: 98.7%. No critical issues detected.",
          })
          break
        case "acknowledge-alerts":
          toast({
            title: "Alerts Acknowledged",
            description: "All pending alerts have been marked as reviewed.",
          })
          break
        case "implement-recommendation":
          toast({
            title: "Recommendation Implemented",
            description: "Budget cap has been set for Max's prompt generation.",
          })
          break
        default:
          toast({
            title: "Action Completed",
            description: "Your request has been processed.",
          })
      }

      // Add a confirmation message from Tilo
      const confirmationMessage: ChatMessage = {
        id: `tilo-confirm-${Date.now()}`,
        role: "tilo",
        content: "Done! I've processed your request. Is there anything else I can help you with?",
        timestamp: new Date(),
      }

      setTimeout(() => {
        setMessages((prev) => [...prev, confirmationMessage])
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
          title="Ask Tilo"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Ask Tilo</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 p-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg">🧠</span>
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Tilo</h2>
              <p className="text-sm text-slate-600">Your organizational intelligence partner</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                  {message.role === "tilo" && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm">🧠</span>
                      </div>
                      <span className="text-xs font-medium text-slate-600">Tilo</span>
                      <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-slate-100 text-slate-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="flex items-center justify-end gap-2 mt-1">
                      <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                      <span className="text-xs font-medium text-slate-600">You</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.variant || "outline"}
                          onClick={() => handleAction(action.action)}
                          className="text-xs"
                        >
                          {action.label}
                          {action.action.startsWith("navigate:") && <ExternalLink className="h-3 w-3 ml-1" />}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm">🧠</span>
                    </div>
                    <span className="text-xs font-medium text-slate-600">Tilo</span>
                  </div>
                  <div className="bg-slate-100 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about a project, agent, insight..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="sm" className="px-3">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Ask about projects, agents, recommendations, or system status</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
