"use client"

import { useState, useEffect } from "react"
import { getCurrentUserRole, type UserRole } from "@/lib/auth"

export interface RoleConfig {
  subtitle: string
  menuOptions: string[]
  capabilities: string[]
  restrictions: string[]
}

export const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    subtitle: "Your organizational command center — full system access and insights.",
    menuOptions: [
      "Request Agent Status Report",
      "Review System Performance",
      "Approve Pending Projects",
      "Generate Compliance Report",
      "Monitor Security Alerts",
    ],
    capabilities: ["full_access", "agent_management", "system_monitoring", "project_approval"],
    restrictions: [],
  },
  ceo: {
    subtitle: "Executive intelligence at your fingertips — strategic insights and priority updates.",
    menuOptions: [
      "Give me today's executive briefing",
      "What are my priority action items?",
      "Show AI confidence scores",
      "Review quarterly performance",
      "Strategic decision support",
    ],
    capabilities: ["executive_briefing", "strategic_insights", "performance_metrics", "decision_support"],
    restrictions: ["no_technical_details"],
  },
  client: {
    subtitle: "Your dedicated support assistant — here to help with your account and projects.",
    menuOptions: [
      "Check my project status",
      "Review my recent reports",
      "Contact my account manager",
      "Update my preferences",
      "Request technical support",
    ],
    capabilities: ["account_support", "project_status", "basic_reports"],
    restrictions: ["no_internal_data", "no_system_access", "no_agent_details"],
  },
  "new client": {
    subtitle: "Welcome! I'm here to help you get started and answer any questions.",
    menuOptions: [
      "Help me get started",
      "What services are available?",
      "Schedule an onboarding call",
      "Review getting started guide",
      "Contact support team",
    ],
    capabilities: ["onboarding_support", "basic_info", "scheduling"],
    restrictions: ["no_internal_data", "no_system_access", "no_project_data"],
  },
}

export function useUserRole() {
  const [role, setRole] = useState<UserRole>("client")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentRole = getCurrentUserRole()
    if (currentRole) {
      setRole(currentRole)
    }
    setIsLoading(false)
  }, [])

  const roleConfig = roleConfigs[role]

  return {
    role,
    roleConfig,
    isLoading,
    hasCapability: (capability: string) => roleConfig.capabilities.includes(capability),
    hasRestriction: (restriction: string) => roleConfig.restrictions.includes(restriction),
  }
}

export function setUserRole(newRole: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("userRole", newRole)
    // Trigger a storage event to notify other components
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "userRole",
        newValue: newRole,
        oldValue: getCurrentUserRole(),
      }),
    )
  }
}
