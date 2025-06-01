import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  Activity,
  Download,
  Users,
  Settings,
  FileText,
  LogIn,
  Shield,
  ExternalLink,
  ScrollText,
  HelpCircle,
  Plug,
  BarChart3,
  DollarSign,
  Brain,
  Eye,
  Link,
  MessageSquare,
} from "lucide-react"

export interface SidebarItem {
  label: string
  path: string
  icon?: LucideIcon
  description?: string
  isNew?: boolean
  managedBy?: string
  roles?: string[]
  isExternal?: boolean
  source?: string
  isDynamic?: boolean // New flag for dynamic routing
  entityType?: string // New field for entity type
}

export interface SidebarAgentGroup {
  id: string
  label: string
  icon?: LucideIcon
  items: SidebarItem[]
  isCollapsible: boolean
  defaultCollapsed: boolean
  description?: string
  roles?: string[]
}

export interface SidebarGroup {
  title: string
  icon?: LucideIcon
  items?: SidebarItem[]
  agentGroups?: SidebarAgentGroup[]
  isCollapsible?: boolean
  defaultCollapsed?: boolean
  isFixed?: boolean
  isDynamic?: boolean
  roles?: string[]
}

// Helper function to get dashboard path by role
export function getDashboardPathByRole(role: string): string {
  if (role.toLowerCase() === "client") {
    return "/client/dashboard"
  }
  return "/admin/dashboard"
}

export const sidebarConfig: Record<string, SidebarGroup> = {
  dashboard: {
    title: "Project Hub",
    icon: LayoutDashboard,
    isCollapsible: true,
    defaultCollapsed: false,
    roles: ["admin", "ceo", "developer", "analyst"],
    items: [
      {
        label: "Project Hub",
        path: "DYNAMIC_DASHBOARD", // Special flag for dynamic routing
        icon: LayoutDashboard,
        description: "Project overview and agent activity",
        roles: ["admin", "ceo", "developer", "analyst", "client"],
        isDynamic: true,
      },
      {
        label: "Executive Briefing",
        path: "/admin/ceo",
        icon: Shield,
        description: "Executive overview and strategic approvals",
        roles: ["ceo", "admin"],
      },
      {
        label: "Risk & Protection Space",
        path: "/admin/security-agent",
        icon: Shield,
        description: "Threat detection, PII validation, and orchestration security",
        roles: ["admin", "ceo"],
      },
      {
        label: "Lexi's Oversight Space",
        path: "/admin/compliance",
        icon: Shield,
        description: "Regulatory posture, audit readiness, and DAS monitoring",
        roles: ["admin", "ceo"],
      },
      {
        label: "Culture & Readiness Room",
        path: "/admin/hr",
        icon: Users,
        description: "AI Training Oversight & Cultural Adoption Management",
        roles: ["admin", "ceo"],
      },
      {
        label: "Janet's Numbers Room",
        path: "/admin/finops",
        icon: DollarSign,
        description: "Financial operations and cost management (managed by Janet)",
        roles: ["admin", "ceo", "analyst"],
      },
      {
        label: "Boardroom View",
        path: "/admin/board",
        icon: Shield,
        description: "Board Briefing",
        roles: ["ceo", "admin"],
      },
    ],
  },

  agents: {
    title: "Team",
    icon: Users,
    isCollapsible: true,
    defaultCollapsed: false, // Changed to false so agents are visible by default
    isDynamic: true,
    roles: ["admin", "ceo", "developer", "analyst"],
    agentGroups: [
      {
        id: "organizationalMind",
        label: "Tilo (Organizational Mind)",
        icon: Brain,
        items: [
          {
            label: "Tilo",
            path: "/admin/agents/ephrya",
            description: "Tilo is your organizational mind — the central intelligence that coordinates everything.",
            entityType: "ORCHESTRATOR",
          },
        ],
        isCollapsible: false,
        defaultCollapsed: false,
      },
      {
        id: "internalAgents",
        label: "Internal Agents",
        icon: Users,
        items: [
          {
            label: "Bob",
            path: "/admin/agents/bob",
            description: "Bob handles client intake and makes sure we get all the details right.",
            entityType: "AGENT",
          },
          {
            label: "Ada",
            path: "/admin/agents/ada",
            description: "Ada thinks strategically about projects and helps plan for the future.",
            entityType: "AGENT",
          },
          {
            label: "Max",
            path: "/admin/agents/max",
            description: "Max optimizes how we communicate with AI and builds better prompts.",
            entityType: "AGENT",
          },
        ],
        isCollapsible: true,
        defaultCollapsed: false, // Changed to false so agents are visible
      },
      {
        id: "internalObservers",
        label: "Internal Observers",
        icon: Eye,
        items: [
          {
            label: "Erik (Security)",
            path: "/admin/agents/internal/erik",
            description: "Erik watches over the system and flags potential threats.",
            isNew: true,
            entityType: "OBSERVER",
          },
          {
            label: "Eve",
            path: "/admin/agents/eve",
            description: "Eve monitors all agent behavior and flags anomalies.",
            entityType: "OBSERVER",
          },
        ],
        isCollapsible: true,
        defaultCollapsed: false, // Changed to false so observers are visible
      },
      {
        id: "internalPartners",
        label: "Internal Partners",
        icon: Link,
        items: [
          {
            label: "Shandry",
            path: "/admin/agents/shandry",
            description: "Manages people, culture, and internal readiness.",
            entityType: "PARTNER",
          },
          {
            label: "Janet",
            path: "/admin/agents/janet",
            description: "Oversees financial clarity and operations forecasting.",
            entityType: "PARTNER",
          },
        ],
        isCollapsible: true,
        defaultCollapsed: false, // Changed to false so partners are visible
      },
      {
        id: "thirdPartyPartners",
        label: "3rd Party Partners",
        icon: ExternalLink,
        items: [
          {
            label: "Lexi",
            path: "/admin/agents/lexi",
            description: "Lexi is your compliance ally — quietly flagging risk and protecting posture.",
            isExternal: true,
            source: "AWS",
            entityType: "PARTNER",
          },
          {
            label: "OpenAI Legal Advisor",
            path: "/admin/agents/openai-legal-advisor",
            description: "Provides legal language and terms powered by OpenAI.",
            isExternal: true,
            source: "OpenAI",
            entityType: "PARTNER",
          },
        ],
        isCollapsible: true,
        defaultCollapsed: true, // Keep collapsed by default for 3rd party
      },
      {
        id: "thirdPartyObservers",
        label: "3rd Party Observers",
        icon: ExternalLink,
        items: [],
        isCollapsible: true,
        defaultCollapsed: true,
      },
      {
        id: "thirdPartyAgents",
        label: "3rd Party Agents",
        icon: ExternalLink,
        items: [],
        isCollapsible: true,
        defaultCollapsed: true,
      },
    ],
  },

  userManagement: {
    title: "User Management",
    icon: Users,
    isCollapsible: true,
    defaultCollapsed: true,
    roles: ["admin", "ceo"],
    items: [
      {
        label: "Role Manager",
        path: "/admin/auth/roles",
        icon: Shield,
        description: "Configure user roles and permissions (RBAC)",
        roles: ["admin"],
      },
      {
        label: "User Accounts",
        path: "/admin/users",
        icon: Users,
        description: "Manage user accounts and permissions",
        roles: ["admin", "ceo"],
      },
    ],
  },

  system: {
    title: "Tilo's System Tools",
    icon: Settings,
    isCollapsible: true,
    defaultCollapsed: true,
    roles: ["admin", "ceo", "developer"],
    agentGroups: [
      {
        id: "systemLogs",
        label: "Activity History",
        icon: FileText,
        items: [
          {
            label: "Activity History",
            path: "/admin/engagement-log",
            icon: ScrollText,
            description: "System audit trail and engagement tracking",
            roles: ["admin", "ceo", "analyst"],
          },
          {
            label: "System Activity & Issues",
            path: "/admin/logs",
            icon: FileText,
            description: "Monitor system activity and troubleshoot issues",
            roles: ["admin", "ceo", "developer"],
          },
        ],
        isCollapsible: true,
        defaultCollapsed: true,
        roles: ["admin", "ceo", "developer"],
      },
    ],
    items: [
      {
        label: "Learn About Tilo",
        path: "/admin/wiki",
        icon: HelpCircle,
        description: "Comprehensive user guide and documentation",
        roles: ["admin", "analyst", "client"],
      },
      {
        label: "Connected Tools",
        path: "/admin/system/integrations",
        icon: Plug,
        description: "Manage external platform connections and integrations",
        roles: ["admin", "ceo"],
      },
      {
        label: "How Tilo Works",
        path: "/admin/reference",
        icon: FileText,
        description: "Technical documentation and schemas",
        roles: ["admin", "developer", "finance"],
      },
      {
        label: "Login Access",
        path: "/login",
        icon: LogIn,
        description: "Access the authentication screen",
        roles: ["admin", "client", "ceo", "developer", "analyst", "hr", "finance", "legal"],
      },
    ],
  },

  reports: {
    title: "Insights",
    icon: BarChart3,
    isCollapsible: true,
    defaultCollapsed: true,
    roles: ["admin", "ceo", "analyst"],
    items: [
      {
        label: "Exports & Reports",
        path: "/admin/exports",
        icon: Download,
        description: "Data exports and reporting tools",
        roles: ["admin", "ceo", "analyst"],
      },
      {
        label: "Performance & Insights",
        path: "/admin/analytics",
        icon: BarChart3,
        description: "Performance insights and business intelligence",
        roles: ["admin", "ceo", "analyst"],
      },
      {
        label: "Agent Metrics & FinOps",
        path: "/admin/agent-monitoring",
        icon: Activity,
        description: "Performance metrics and FinOps",
        roles: ["admin", "ceo", "developer", "analyst"],
      },
    ],
  },

  clientPanel: {
    title: "Client Portal",
    icon: Users,
    isCollapsible: false, // Make it always visible for clients
    defaultCollapsed: false,
    roles: ["client", "new client"],
    items: [
      {
        label: "Dashboard",
        path: "/client/dashboard",
        icon: LayoutDashboard,
        description: "View your project overview and status",
        roles: ["client", "new client"],
      },
      {
        label: "New Intake",
        path: "/client/intake",
        icon: FileText,
        description: "Submit new project for AI analysis",
        roles: ["client", "new client"],
      },
      {
        label: "Review Summary",
        path: "/client/review-summary",
        icon: Activity,
        description: "Review and approve project submissions",
        roles: ["client", "new client"],
      },
      {
        label: "Chat with Ephrya",
        path: "/client/ephrya",
        icon: MessageSquare,
        description: "Get assistance from Ephrya AI",
        roles: ["client", "new client"],
      },
      {
        label: "Confirmation",
        path: "/client/confirmation",
        icon: Shield,
        description: "View submission confirmations",
        roles: ["client", "new client"],
      },
    ],
  },
}

// Helper function to get sidebar config filtered by role
export function getSidebarConfigByRole(role: string): Record<string, SidebarGroup> {
  const filteredConfig: Record<string, SidebarGroup> = {}
  const normalizedRole = role.toLowerCase()

  Object.entries(sidebarConfig).forEach(([key, group]) => {
    if (!group.roles || group.roles.some((r) => r.toLowerCase() === normalizedRole)) {
      const filteredGroup = { ...group }

      // Filter regular items
      if (filteredGroup.items) {
        filteredGroup.items = filteredGroup.items
          .filter((item) => !item.roles || item.roles.some((r) => r.toLowerCase() === normalizedRole))
          .map((item) => {
            // Handle dynamic dashboard routing
            if (item.path === "DYNAMIC_DASHBOARD") {
              return {
                ...item,
                path: getDashboardPathByRole(role),
              }
            }
            return item
          })
      }

      // Filter agent groups
      if (filteredGroup.agentGroups) {
        filteredGroup.agentGroups = filteredGroup.agentGroups
          .filter((agentGroup) => !agentGroup.roles || agentGroup.roles.some((r) => r.toLowerCase() === normalizedRole))
          .map((agentGroup) => ({
            ...agentGroup,
            items: agentGroup.items.filter(
              (item) => !item.roles || item.roles.some((r) => r.toLowerCase() === normalizedRole),
            ),
          }))
          .filter((agentGroup) => agentGroup.items.length > 0) // Only include groups with visible items
      }

      // Only include the group if it has visible items or agent groups
      const hasVisibleItems = filteredGroup.items && filteredGroup.items.length > 0
      const hasVisibleAgentGroups = filteredGroup.agentGroups && filteredGroup.agentGroups.length > 0

      if (hasVisibleItems || hasVisibleAgentGroups) {
        filteredConfig[key] = filteredGroup
      }
    }
  })

  return filteredConfig
}

// Helper function to validate routes
export function validateSidebarRoutes(): void {
  const allRoutes: string[] = []

  Object.values(sidebarConfig).forEach((group) => {
    if (group.items) {
      allRoutes.push(...group.items.map((item) => item.path))
    }
    if (group.agentGroups) {
      group.agentGroups.forEach((agentGroup) => {
        allRoutes.push(...agentGroup.items.map((item) => item.path))
      })
    }
  })

  console.log("Sidebar routes configured:", allRoutes.length)
  console.log("Routes:", allRoutes.sort())

  // Log default states for all groups
  Object.entries(sidebarConfig).forEach(([key, group]) => {
    console.log(`Sidebar group [${group.title}] collapsed by default: ${group.defaultCollapsed}`)
    if (group.agentGroups) {
      group.agentGroups.forEach((agentGroup) => {
        console.log(`Sidebar agent group [${agentGroup.label}] collapsed by default: ${agentGroup.defaultCollapsed}`)
      })
    }
  })

  console.log("✅ Sidebar updated: Case-insensitive role filtering implemented")
}

// Helper to get storage key for group state
export function getStorageKey(groupKey: string): string {
  return `sidebar-${groupKey}-collapsed`
}

// Helper to get storage key for agent group state
export function getAgentGroupStorageKey(groupKey: string, agentGroupId: string): string {
  return `sidebar-${groupKey}-${agentGroupId}-collapsed`
}
