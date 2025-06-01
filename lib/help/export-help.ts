import type { HelpTooltip } from "@/components/help/help-overlay"

export const exportHelpConfig: HelpTooltip[] = [
  {
    anchorId: "export-action-cards",
    title: "Export Action Cards",
    description:
      "Each card represents a data type available for export. You can generate, view, or schedule reports here.",
    position: "bottom-left",
    visibleTo: ["admin", "manager", "Finance"],
  },
  {
    anchorId: "schedule-button",
    title: "Schedule Export",
    description: "Open a modal to configure recurring exports. Use this to automate delivery of reports.",
    position: "top",
    visibleTo: ["admin", "Finance"],
  },
  {
    anchorId: "export-timestamp",
    title: "Export Timestamp",
    description: "Displays when this export was last generated. Helps track freshness of reports.",
    position: "right",
    visibleTo: ["admin", "manager", "Finance"],
  },
  {
    anchorId: "generate-all-reports",
    title: "Generate All Reports",
    description: "Run every export action in a single batch. Useful for end-of-day summaries or compliance backups.",
    position: "top-left",
    visibleTo: ["admin"],
  },
  {
    anchorId: "status-tags",
    title: "Status Indicators",
    description: "Visual indicators show whether a report is available, in progress, or scheduled.",
    position: "left",
    visibleTo: ["admin", "manager", "Finance"],
  },
]
