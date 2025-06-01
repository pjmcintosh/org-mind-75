export interface ExternalAgentMetadata {
  id: string
  name: string
  description: string
  route: string
  tags: string[]
  monitoredBy: string
  provider: string
  department: string
  capabilities: string[]
  accessLevel: string
  enabled: boolean
}

export const externalAgentMetadata: ExternalAgentMetadata[] = [
  {
    id: "openai-legal",
    name: "OpenAI Legal Advisor",
    description: "Contract generation and compliance support for legal documents",
    route: "/admin/openai-legal",
    tags: ["legal", "external", "contracts", "nda", "compliance"],
    monitoredBy: "Eve",
    provider: "OpenAI",
    department: "Legal",
    capabilities: [
      "NDA Generation",
      "Contract Review",
      "Compliance Analysis",
      "Legal Document Drafting",
      "Terms & Conditions",
    ],
    accessLevel: "Internal Legal",
    enabled: true,
  },
]

export const getExternalAgentById = (id: string): ExternalAgentMetadata | undefined => {
  return externalAgentMetadata.find((agent) => agent.id === id)
}

export const getEnabledExternalAgents = (): ExternalAgentMetadata[] => {
  return externalAgentMetadata.filter((agent) => agent.enabled)
}

export const getExternalAgentsByDepartment = (department: string): ExternalAgentMetadata[] => {
  return externalAgentMetadata.filter(
    (agent) => agent.enabled && agent.department.toLowerCase() === department.toLowerCase(),
  )
}
