"use client"

import { useEffect } from "react"
import { useTiloMood } from "@/lib/hooks/useTiloMood"

interface WorkflowEvent {
  type:
    | "compliance_risk"
    | "user_listening"
    | "reset_tilo"
    | "security_alert"
    | "notification"
    | "user_input"
    | "chat_open"
  timestamp: number
  data?: any
}

interface TiloEventBridgeProps {
  events?: WorkflowEvent[]
}

export default function TiloEventBridge({ events = [] }: TiloEventBridgeProps) {
  const { triggerAlert, triggerListening, reset, triggerNotification, triggerThinking } = useTiloMood()

  useEffect(() => {
    // Process the most recent event if events array changes
    if (events.length > 0) {
      const latestEvent = events[events.length - 1]

      switch (latestEvent.type) {
        case "compliance_risk":
          console.log("TiloEventBridge: Compliance risk detected, setting Tilo to alert mode")
          triggerAlert()
          break

        case "user_listening":
        case "user_input":
          console.log("TiloEventBridge: User input detected, setting Tilo to listening mode")
          triggerListening()
          break

        case "chat_open":
          console.log("TiloEventBridge: Chat opened, setting Tilo to thinking mode")
          triggerThinking()
          break

        case "reset_tilo":
          console.log("TiloEventBridge: Reset command received, setting Tilo to idle")
          reset()
          break

        case "security_alert":
          console.log("TiloEventBridge: Security alert detected, setting Tilo to alert mode")
          triggerAlert()
          break

        case "notification":
          console.log("TiloEventBridge: Notification received, setting Tilo to notification mode")
          triggerNotification()
          break

        default:
          console.log(`TiloEventBridge: Unknown event type: ${latestEvent.type}`)
      }
    }
  }, [events, triggerAlert, triggerListening, reset, triggerNotification, triggerThinking])

  // Also listen for global window events as a fallback
  useEffect(() => {
    const handleGlobalEvent = (event: CustomEvent<WorkflowEvent>) => {
      const workflowEvent = event.detail

      switch (workflowEvent.type) {
        case "compliance_risk":
          triggerAlert()
          break
        case "user_listening":
        case "user_input":
          triggerListening()
          break
        case "chat_open":
          triggerThinking()
          break
        case "reset_tilo":
          reset()
          break
        case "security_alert":
          triggerAlert()
          break
        case "notification":
          triggerNotification()
          break
      }
    }

    // Listen for custom events on the window
    window.addEventListener("tilo:workflow-event", handleGlobalEvent as EventListener)

    return () => {
      window.removeEventListener("tilo:workflow-event", handleGlobalEvent as EventListener)
    }
  }, [triggerAlert, triggerListening, reset, triggerNotification, triggerThinking])

  // This component doesn't render anything visible
  return null
}

// Utility function to dispatch workflow events globally
export function dispatchWorkflowEvent(type: WorkflowEvent["type"], data?: any) {
  const event: WorkflowEvent = {
    type,
    timestamp: Date.now(),
    data,
  }

  window.dispatchEvent(new CustomEvent("tilo:workflow-event", { detail: event }))
}

// Helper functions for common events
export const TiloEvents = {
  userStartedListening: () => dispatchWorkflowEvent("user_listening"),
  userStartedTyping: () => dispatchWorkflowEvent("user_input"),
  chatOpened: () => dispatchWorkflowEvent("chat_open"),
  complianceRisk: (data?: any) => dispatchWorkflowEvent("compliance_risk", data),
  securityAlert: (data?: any) => dispatchWorkflowEvent("security_alert", data),
  notification: (data?: any) => dispatchWorkflowEvent("notification", data),
  reset: () => dispatchWorkflowEvent("reset_tilo"),
}
