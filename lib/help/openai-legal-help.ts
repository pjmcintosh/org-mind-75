import type { HelpTooltip } from "@/components/help/help-overlay"

export const openaiLegalHelpTooltips: HelpTooltip[] = [
  {
    anchorId: "openai-legal-header",
    title: "Third-Party Legal Agent",
    description:
      "This is a third-party agent powered by OpenAI. It provides legal drafting support for NDAs, contracts, and compliance analysis.",
    position: "bottom-right",
    visibleTo: ["admin", "Legal"],
  },
  {
    anchorId: "contract-type-selector",
    title: "Contract Type Selection",
    description:
      "Choose a contract type to generate. Ephrya routes your selection to the OpenAI agent for legal document composition.",
    position: "bottom",
    visibleTo: ["admin", "Legal"],
  },
  {
    anchorId: "generate-draft-button",
    title: "Generate Legal Draft",
    description:
      "Triggers draft generation using OpenAI's legal logic. This operates within the boundaries and oversight defined by the system admin.",
    position: "top",
    visibleTo: ["admin", "Legal"],
  },
  {
    anchorId: "result-viewer",
    title: "Generated Document Viewer",
    description:
      "Displays the generated legal text. You can review, copy, or export this document. All outputs are logged and monitored by Eve.",
    position: "top-left",
    visibleTo: ["admin", "Legal"],
  },
  {
    anchorId: "usage-stats",
    title: "Usage & Cost Monitoring",
    description:
      "Track token usage, costs, and success rates for this external agent. All activity is monitored by Eve for governance and compliance.",
    position: "top",
    visibleTo: ["admin"],
  },
  {
    anchorId: "governance-info",
    title: "Agent Governance",
    description:
      "Shows access controls, monitoring status, and compliance settings for this third-party integration. Ensures secure operation within Ephrya.",
    position: "right",
    visibleTo: ["admin"],
  },
]

export const openaiLegalHelpConfig = {
  pageTitle: "OpenAI Legal Advisor Help",
  description: "Learn how to use the third-party legal agent for contract drafting and compliance support.",
  tooltips: openaiLegalHelpTooltips,
}
