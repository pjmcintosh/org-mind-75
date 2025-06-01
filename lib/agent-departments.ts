import { mockAgents, type Agent } from "@/mock/agents"
import { Shield, Gavel, PowerIcon as Gear, Users, DollarSign, MessageSquare, Search, Brain } from "lucide-react"

export interface DepartmentConfig {
  id: string
  name: string
  icon: any
  description: string
  color: string
}

export const departmentConfigs: DepartmentConfig[] = [
  {
    id: "system-core",
    name: "Organizational Intelligence",
    icon: Brain,
    description: "Central coordination and intelligence",
    color: "blue",
  },
  {
    id: "strategy",
    name: "Strategy",
    icon: Search,
    description: "Strategic planning and analysis",
    color: "green",
  },
  {
    id: "client-services",
    name: "Client Services",
    icon: MessageSquare,
    description: "Client communication and intake",
    color: "cyan",
  },
  {
    id: "operations",
    name: "System Oversight",
    icon: Shield,
    description: "System monitoring and oversight",
    color: "red",
  },
  {
    id: "finance",
    name: "Finance",
    icon: DollarSign,
    description: "Financial planning and analysis",
    color: "yellow",
  },
  {
    id: "legal",
    name: "Legal",
    icon: Gavel,
    description: "Legal guidance and compliance",
    color: "purple",
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: Gear,
    description: "Technical development and implementation",
    color: "orange",
  },
  {
    id: "human-resources",
    name: "HR",
    icon: Users,
    description: "Human resources and team dynamics",
    color: "pink",
  },
]

export function getDepartmentId(department: string): string {
  const mapping: Record<string, string> = {
    "System Core": "system-core",
    Strategy: "strategy",
    "Client Services": "client-services",
    Operations: "operations",
    Finance: "finance",
    Legal: "legal",
    Engineering: "engineering",
    "Human Resources": "human-resources",
  }
  return mapping[department] || department.toLowerCase().replace(/\s+/g, "-")
}

export function getAgentsByDepartment(): Record<string, Agent[]> {
  const agentsByDept: Record<string, Agent[]> = {}

  departmentConfigs.forEach((dept) => {
    agentsByDept[dept.id] = []
  })

  mockAgents.forEach((agent) => {
    const deptId = getDepartmentId(agent.department)
    if (agentsByDept[deptId]) {
      agentsByDept[deptId].push(agent)
    }
  })

  return agentsByDept
}

export function getDepartmentConfig(departmentId: string): DepartmentConfig | undefined {
  return departmentConfigs.find((dept) => dept.id === departmentId)
}
