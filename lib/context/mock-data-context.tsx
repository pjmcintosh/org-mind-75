"use client"

import { createContext, useContext, type ReactNode } from "react"
import { agentPerformance } from "@/lib/data/agent-performance"
import { projectSubmissions } from "@/lib/data/project-submissions"
import { systemAlerts } from "@/lib/data/system-alerts"
import { approvalQueue } from "@/lib/data/approval-queue"
import { engagementLog } from "@/lib/data/engagement-log"
import { agentInsights } from "@/lib/data/agent-insights"
import { reportQueue } from "@/lib/data/report-queue"
import { userRoles } from "@/lib/data/user-roles"

console.log("Loaded: MockDataContext")

interface MockDataContextType {
  agentPerformance: typeof agentPerformance
  projectSubmissions: typeof projectSubmissions
  systemAlerts: typeof systemAlerts
  approvalQueue: typeof approvalQueue
  engagementLog: typeof engagementLog
  agentInsights: typeof agentInsights
  reportQueue: typeof reportQueue
  userRoles: typeof userRoles
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

interface MockDataProviderProps {
  children: ReactNode
}

export function MockDataProvider({ children }: MockDataProviderProps) {
  console.log("MockDataProvider initialized")

  const mockData: MockDataContextType = {
    agentPerformance,
    projectSubmissions,
    systemAlerts,
    approvalQueue,
    engagementLog,
    agentInsights,
    reportQueue,
    userRoles,
  }

  return <MockDataContext.Provider value={mockData}>{children}</MockDataContext.Provider>
}

export function useMockData(): MockDataContextType {
  const context = useContext(MockDataContext)
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider")
  }
  return context
}
