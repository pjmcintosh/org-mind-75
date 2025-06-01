console.log("Loaded: lib/data/user-roles.ts")

export interface MockUser {
  id: string
  email: string
  name: string
  role: "CEO" | "Admin" | "Client" | "Analyst" | "Developer" | "HR" | "Finance" | "Legal"
  department?: string
  accessTags: string[]
  lastLogin: string
  isActive: boolean
  permissions: string[]
}

export const userRoles: MockUser[] = [
  {
    id: "USR-001",
    email: "joe@elevateyourinsights.com",
    name: "Joe (CEO)",
    role: "CEO",
    department: "Executive",
    accessTags: ["full_access", "approvals", "financial", "strategic"],
    lastLogin: "2024-01-27T08:15:00Z",
    isActive: true,
    permissions: ["*"],
  },
  {
    id: "USR-002",
    email: "admin@elevateyourinsights.com",
    name: "System Administrator",
    role: "Admin",
    department: "IT",
    accessTags: ["admin_access", "agent_config", "system_monitoring"],
    lastLogin: "2024-01-27T07:30:00Z",
    isActive: true,
    permissions: ["admin.*", "agents.*", "monitoring.*"],
  },
  {
    id: "USR-003",
    email: "sarah.johnson@techcorp.com",
    name: "Sarah Johnson",
    role: "Client",
    department: "External",
    accessTags: ["client_portal", "project_view"],
    lastLogin: "2024-01-26T16:45:00Z",
    isActive: true,
    permissions: ["client.dashboard", "client.projects"],
  },
  {
    id: "USR-004",
    email: "analyst@elevateyourinsights.com",
    name: "Data Analyst",
    role: "Analyst",
    department: "Analytics",
    accessTags: ["data_access", "reporting", "monitoring"],
    lastLogin: "2024-01-27T09:00:00Z",
    isActive: true,
    permissions: ["analytics.*", "reports.*", "monitoring.read"],
  },
  {
    id: "USR-005",
    email: "dev@elevateyourinsights.com",
    name: "Lead Developer",
    role: "Developer",
    department: "Engineering",
    accessTags: ["technical_access", "agent_dev", "system_config"],
    lastLogin: "2024-01-27T10:20:00Z",
    isActive: true,
    permissions: ["agents.max", "agents.ada", "system.config"],
  },
  {
    id: "USR-006",
    email: "hr@elevateyourinsights.com",
    name: "HR Manager",
    role: "HR",
    department: "Human Resources",
    accessTags: ["hr_access", "employee_data"],
    lastLogin: "2024-01-26T14:30:00Z",
    isActive: true,
    permissions: ["agents.shandry", "hr.*"],
  },
  {
    id: "USR-007",
    email: "finance@elevateyourinsights.com",
    name: "Finance Director",
    role: "Finance",
    department: "Finance",
    accessTags: ["financial_access", "budget_approval"],
    lastLogin: "2024-01-27T11:45:00Z",
    isActive: true,
    permissions: ["agents.janet", "finance.*", "budgets.*"],
  },
  {
    id: "USR-008",
    email: "legal@elevateyourinsights.com",
    name: "Legal Counsel",
    role: "Legal",
    department: "Legal",
    accessTags: ["legal_access", "contract_review"],
    lastLogin: "2024-01-25T13:20:00Z",
    isActive: true,
    permissions: ["legal.*", "contracts.*"],
  },
]

// Also export as mockUsers for backward compatibility
export const mockUsers = userRoles
