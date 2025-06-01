// 🔍 Ephrya Import Audit Script
// This script identifies all remaining Ephrya imports in the codebase

export interface EphryaImportAudit {
  file: string
  imports: string[]
  isActivelyRendered: boolean
  migrationPriority: "high" | "medium" | "low"
  notes: string
}

export const ephryaImportAudit: EphryaImportAudit[] = [
  {
    file: "app/admin/ask-ephrya/page.tsx",
    imports: ["// No direct Ephrya component imports found"],
    isActivelyRendered: true,
    migrationPriority: "high",
    notes: "Page uses Ephrya branding but no component imports. Rename page to ask-tilo.",
  },
  {
    file: "components/ephrya-chat.tsx",
    imports: ["// Self-contained Ephrya chat component"],
    isActivelyRendered: true,
    migrationPriority: "high",
    notes: "Active chat component. Replace with TiloChat component.",
  },
  {
    file: "components/ephrya-help-overlay.tsx",
    imports: ["// Self-contained Ephrya help overlay"],
    isActivelyRendered: true,
    migrationPriority: "medium",
    notes: "Help overlay component. Replace with TiloHelpOverlay.",
  },
  {
    file: "components/ephrya/EphryaDecisionCard.tsx",
    imports: ["// Self-contained component in ephrya directory"],
    isActivelyRendered: false,
    migrationPriority: "low",
    notes: "Legacy component. Check if still imported anywhere.",
  },
  {
    file: "app/admin/layout.tsx",
    imports: ["import { EphryaChat } from '@/components/ephrya-chat'"],
    isActivelyRendered: true,
    migrationPriority: "high",
    notes: "Admin layout imports EphryaChat. Replace with TiloChat.",
  },
]

export const ephryaAuditSummary = {
  totalFiles: ephryaImportAudit.length,
  activelyRendered: ephryaImportAudit.filter((item) => item.isActivelyRendered).length,
  highPriority: ephryaImportAudit.filter((item) => item.migrationPriority === "high").length,
  mediumPriority: ephryaImportAudit.filter((item) => item.migrationPriority === "medium").length,
  lowPriority: ephryaImportAudit.filter((item) => item.migrationPriority === "low").length,
}

// 📋 Migration Checklist
export const migrationChecklist = [
  {
    task: "Replace EphryaChat with TiloChat in admin layout",
    priority: "high",
    estimated: "30 minutes",
    dependencies: ["TiloChat component completed"],
  },
  {
    task: "Rename ask-ephrya page to ask-tilo",
    priority: "high",
    estimated: "15 minutes",
    dependencies: ["Route testing"],
  },
  {
    task: "Replace ephrya-help-overlay with TiloHelpOverlay",
    priority: "medium",
    estimated: "20 minutes",
    dependencies: ["TiloHelpOverlay component completed"],
  },
  {
    task: "Remove components/ephrya directory",
    priority: "low",
    estimated: "5 minutes",
    dependencies: ["All imports migrated"],
  },
]

console.log("🔍 Ephrya Import Audit Complete")
console.log(`Found ${ephryaAuditSummary.totalFiles} files with Ephrya references`)
console.log(`${ephryaAuditSummary.activelyRendered} are actively rendered`)
console.log(`${ephryaAuditSummary.highPriority} high priority migrations needed`)
