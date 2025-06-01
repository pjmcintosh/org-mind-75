"use client"

import { useCallback } from "react"
import { dispatchWorkflowEvent } from "@/components/tilo/TiloEventBridge"

export function useWorkflowEvents() {
  const triggerComplianceRisk = useCallback((data?: any) => {
    dispatchWorkflowEvent("compliance_risk", data)
  }, [])

  const triggerUserListening = useCallback((data?: any) => {
    dispatchWorkflowEvent("user_listening", data)
  }, [])

  const resetTilo = useCallback(() => {
    dispatchWorkflowEvent("reset_tilo")
  }, [])

  const triggerSecurityAlert = useCallback((data?: any) => {
    dispatchWorkflowEvent("security_alert", data)
  }, [])

  const triggerNotification = useCallback((data?: any) => {
    dispatchWorkflowEvent("notification", data)
  }, [])

  return {
    triggerComplianceRisk,
    triggerUserListening,
    resetTilo,
    triggerSecurityAlert,
    triggerNotification,
  }
}
