import type { HelpTooltip } from "@/components/help/help-overlay"

export const adminToolsHelpConfig: HelpTooltip[] = [
  {
    anchorId: "quick-actions-panel",
    title: "Quick Actions Panel",
    description:
      "Use these to trigger core system operations like cache resets, session invalidation, or global refresh.",
    position: "bottom-left",
    visibleTo: ["admin", "tech"],
  },
  {
    anchorId: "system-configuration",
    title: "System Configuration",
    description:
      "Modify global environment variables, feature flags, and backend toggles. These affect the entire organization.",
    position: "bottom-right",
    visibleTo: ["admin"],
  },
  {
    anchorId: "data-management",
    title: "Data Management",
    description: "Remove outdated or temporary data. Use caution — this action may not be reversible.",
    position: "bottom-left",
    visibleTo: ["admin", "tech"],
  },
  {
    anchorId: "agent-management",
    title: "Agent Management",
    description:
      "Generate or rotate API keys. Used for secure integration with other systems or agent-level automation.",
    position: "bottom-right",
    visibleTo: ["admin", "tech"],
  },
  {
    anchorId: "monitoring-logs",
    title: "Monitoring & Logs",
    description:
      "Toggle beta features for testing. These may be unstable and should be used only in non-production environments.",
    position: "bottom-left",
    visibleTo: ["admin", "tech"],
  },
]
