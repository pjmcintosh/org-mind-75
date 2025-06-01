export const entityTypes = {
  AGENT: {
    label: "Team Member",
    description: "Performs tasks, makes decisions, and owns workflows.",
    icon: "Users",
    color: "cyan",
  },
  OBSERVER: {
    label: "Silent Watcher",
    description: "Monitors activity and reports insights — cannot take action.",
    icon: "Eye",
    color: "yellow",
  },
  PARTNER: {
    label: "Outside Collaborator",
    description: "Works with the system via secure integrations or scoped access.",
    icon: "Link",
    color: "green",
  },
  ORCHESTRATOR: {
    label: "Coordinator",
    description: "Manages workflows and coordinates between other team members.",
    icon: "Network",
    color: "purple",
  },
  SPECIALIST: {
    label: "Domain Expert",
    description: "Provides specialized knowledge and capabilities in a specific area.",
    icon: "Star",
    color: "blue",
  },
}

export type EntityType = keyof typeof entityTypes
