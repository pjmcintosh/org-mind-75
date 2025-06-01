import type { HelpTooltip } from "@/components/help/help-overlay"

export const agentMonitoringHelpConfig: HelpTooltip[] = [
  {
    anchorId: "agent-health-panel",
    title: "Agent Health Panel",
    description:
      "This shows the current status of all active agents — including token usage, responsiveness, and uptime. Ephrya uses this to monitor operational reliability.",
    position: "bottom-left",
    visibleTo: ["admin", "tech", "system"],
  },
  {
    anchorId: "agents-list-table",
    title: "Agents List Table",
    description:
      "View detailed metrics for each agent: last activity, request count, and performance flags. Sorted for quick access.",
    position: "bottom-right",
    visibleTo: ["admin", "tech", "manager"],
  },
  {
    anchorId: "usage-overview-chart",
    title: "Usage Overview Chart",
    description:
      "Compare token usage and request volume by agent. Use this to spot overuse, anomalies, or uneven workloads.",
    position: "bottom-left",
    visibleTo: ["admin", "tech", "Finance"],
  },
  {
    anchorId: "activity-timeline",
    title: "Ephrya's Activity Timeline",
    description:
      "Timeline of recent agent events and coordination actions taken by Ephrya — including system decisions and alerts.",
    position: "right",
    visibleTo: ["admin", "tech"],
  },
  {
    anchorId: "performance-trends",
    title: "Performance Trends",
    description: "Graph of token activity over time. Helps visualize agent load trends and bottlenecks.",
    position: "right",
    visibleTo: ["admin", "tech", "Finance"],
  },
  {
    anchorId: "ephrya-recommendations",
    title: "Ephrya's Recommendations",
    description:
      "Proactive suggestions from Ephrya based on usage patterns and agent health. These can include tuning prompt limits or improving intake structure.",
    position: "bottom-left",
    visibleTo: ["admin", "tech", "manager"],
  },
]
