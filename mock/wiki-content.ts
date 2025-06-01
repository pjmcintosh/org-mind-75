export interface WikiSection {
  id: string
  title: string
  purpose: string
  keyFeatures: string[]
  howToUse: string[]
  agentRoles: string[]
  requiredRoles?: string[]
  technicalDetails?: {
    componentName: string
    dataModels: string[]
    apiRoutes?: string[]
    customization?: string[]
  }
}

export const wikiSections: WikiSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    purpose: "Introduction to the Tilo platform and its core capabilities",
    keyFeatures: [
      "Platform overview and architecture",
      "Agent ecosystem introduction",
      "User role management",
      "Quick start guides",
    ],
    howToUse: [
      "Navigate to the dashboard to see system status",
      "Review available agents and their capabilities",
      "Set up your user profile and preferences",
      "Complete the onboarding tutorial",
    ],
    agentRoles: [
      "Ada: Provides technical guidance and platform explanations",
      "Eve: Monitors system health and security compliance",
      "Max: Assists with user onboarding and training",
    ],
    requiredRoles: ["Admin", "User"],
    technicalDetails: {
      componentName: "TiloOnboardingSystem",
      dataModels: ["User", "Role", "Permission"],
      apiRoutes: ["GET /api/onboarding/status", "POST /api/onboarding/complete"],
      customization: ["Custom welcome messages", "Role-specific tutorials", "Department-specific guides"],
    },
  },
  {
    id: "agent-management",
    title: "Agent Management",
    purpose: "Configure, monitor, and optimize AI agents in your organization",
    keyFeatures: [
      "Agent deployment and configuration",
      "Performance monitoring and analytics",
      "Role-based access control",
      "Agent communication patterns",
    ],
    howToUse: [
      "Access the Agent Management dashboard",
      "Review agent performance metrics",
      "Adjust agent parameters and permissions",
      "Set up agent collaboration workflows",
    ],
    agentRoles: [
      "Ada: Provides technical implementation guidance",
      "Eve: Monitors agent security and compliance",
      "Janet: Manages agent deployment and scaling",
    ],
    requiredRoles: ["Admin", "Manager"],
    technicalDetails: {
      componentName: "AgentManagementSystem",
      dataModels: ["Agent", "AgentConfig", "AgentMetrics"],
      apiRoutes: ["GET /api/agents", "POST /api/agents/configure", "GET /api/agents/metrics"],
    },
  },
  {
    id: "compliance",
    title: "Compliance & Security",
    purpose: "Ensure AI agents meet regulatory requirements and security standards",
    keyFeatures: [
      "Compliance monitoring and reporting",
      "Security audit trails",
      "Data protection controls",
      "Regulatory alignment tools",
    ],
    howToUse: [
      "Review the compliance dashboard",
      "Run security scans on agent activities",
      "Generate compliance reports",
      "Set up automated compliance checks",
    ],
    agentRoles: [
      "Eve: Primary compliance and security monitor",
      "Shandry: Legal and regulatory guidance",
      "OpenAI Legal Advisor: Specialized legal compliance",
    ],
    requiredRoles: ["Admin", "Compliance Officer"],
    technicalDetails: {
      componentName: "ComplianceMonitoringSystem",
      dataModels: ["ComplianceCheck", "SecurityAudit", "RegulatoryRequirement"],
      apiRoutes: ["GET /api/compliance/status", "POST /api/compliance/audit", "GET /api/compliance/reports"],
    },
  },
]

export const technicalOverview = {
  architecture: "Microservices-based architecture with containerized AI agents",
  components: "Core services include Agent Runtime, Orchestration Engine, Security Monitor, and Admin Dashboard",
  dataFlow: "Event-driven communication between services with centralized logging and monitoring",
  deployment: "Kubernetes orchestration with auto-scaling capabilities and blue-green deployment",
  security: "End-to-end encryption with role-based access control and continuous security scanning",
  monitoring: "Real-time metrics collection with alerting and anomaly detection",
}

export const futureEnhancements = [
  {
    title: "Advanced Natural Language Processing",
    description: "Enhanced NLP capabilities for more nuanced agent interactions",
    status: "In Development",
    estimatedRelease: "Q3 2024",
  },
  {
    title: "Multi-modal Agent Interactions",
    description: "Support for voice, image, and video processing in agent workflows",
    status: "Planned",
    estimatedRelease: "Q4 2024",
  },
  {
    title: "Enhanced Workflow Automation",
    description: "Advanced workflow builder with conditional logic and triggers",
    status: "In Development",
    estimatedRelease: "Q2 2024",
  },
  {
    title: "Improved Compliance Monitoring",
    description: "Real-time compliance checking with regulatory updates",
    status: "Implemented",
    estimatedRelease: "Q1 2024",
  },
  {
    title: "Agent Marketplace",
    description: "Ecosystem for sharing and deploying custom agents",
    status: "Planned",
    estimatedRelease: "Q1 2025",
  },
  {
    title: "Advanced Analytics Dashboard",
    description: "Enhanced reporting and visualization capabilities",
    status: "In Development",
    estimatedRelease: "Q3 2024",
  },
]
