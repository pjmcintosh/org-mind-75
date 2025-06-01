import type { HelpTooltip } from "@/components/help/help-overlay"

export const agentSettingsHelpConfig: HelpTooltip[] = [
  {
    anchorId: "agent-config-header",
    title: "Agent Configuration Panel",
    description:
      "Use this panel to define the tone, access level, and behavioral scope of each agent in the Ephrya system.",
    position: "bottom-left",
    visibleTo: ["admin", "tech"],
  },
  {
    anchorId: "agent-tone",
    title: "Agent Tone & Voice",
    description:
      "Describes how the agent speaks. For example: 'analytical and data-driven' or 'supportive and empathetic.'",
    position: "right",
    visibleTo: ["admin", "tech", "HR"],
  },
  {
    anchorId: "behavior-summary",
    title: "Behavior Summary",
    description:
      "High-level overview of what this agent does within their department and how they interact with users.",
    position: "right",
    visibleTo: ["admin", "tech", "manager"],
  },
  {
    anchorId: "access-level",
    title: "Access Level",
    description: "Defines who can access this agent and what permissions they have across the system.",
    position: "left",
    visibleTo: ["admin"],
  },
  {
    anchorId: "access-scope",
    title: "Access Scope",
    description: "A list of tags describing the agent's responsibilities and limitations within the system.",
    position: "right",
    visibleTo: ["admin", "tech"],
  },
]
