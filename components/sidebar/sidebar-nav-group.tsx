"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { SidebarGroup, SidebarItem } from "@/config/sidebar-config"
import { getStorageKey } from "@/config/sidebar-config"
import { humanLabels } from "@/lib/constants/humanLabels"
import { SidebarAgentGroup as AgentGroupComponent } from "./sidebar-agent-group"

interface SidebarNavGroupProps {
  group: SidebarGroup
  groupKey: string
  isAssistant?: boolean
  languageMode?: "professional" | "humanized"
  showTooltips?: boolean
}

function SidebarNavItem({
  item,
  isActive,
  languageMode = "humanized",
  showTooltips = false,
}: {
  item: SidebarItem
  isActive: boolean
  languageMode?: "professional" | "humanized"
  showTooltips?: boolean
}) {
  const Icon = item.icon

  // Safe access to humanLabels with fallback
  const getDisplayLabel = () => {
    if (languageMode === "humanized" && humanLabels?.navigation && item.label in humanLabels.navigation) {
      return humanLabels.navigation[item.label as keyof typeof humanLabels.navigation]
    }
    return item.label
  }

  const displayLabel = getDisplayLabel()

  const content = (
    <Link href={item.path}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
          isActive
            ? "bg-cyan-500/10 text-white font-semibold border-l-2 border-cyan-400 ml-2"
            : "text-slate-300 hover:bg-cyan-500/5 hover:text-cyan-300",
        )}
      >
        {Icon && <Icon className={cn("h-4 w-4", isActive ? "text-cyan-400" : "text-slate-400")} />}
        <div className="flex-1">
          <div className={cn("text-sm tracking-tight", isActive ? "text-white font-semibold" : "text-slate-300")}>
            {displayLabel}
          </div>
          {item.description && (
            <div className={cn("text-xs leading-tight mt-0.5", isActive ? "text-blue-200" : "text-slate-400")}>
              {item.description}
            </div>
          )}
        </div>
        {item.isNew && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
            New
          </span>
        )}
        {item.isExternal && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
            External
          </span>
        )}
      </div>
    </Link>
  )

  if (showTooltips && item.description) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <p>{item.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}

export function SidebarNavGroup({
  group,
  groupKey,
  isAssistant = false,
  languageMode = "humanized",
  showTooltips = false,
}: SidebarNavGroupProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(group.defaultCollapsed ?? false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasBeenManuallyToggled, setHasBeenManuallyToggled] = useState(false)

  const { title, items = [], agentGroups = [], icon: GroupIcon, isCollapsible = true } = group
  const ChevronIcon = isCollapsed ? ChevronRight : ChevronDown

  // Check if any item in this group is active
  const hasActiveItem =
    items.some((item) => pathname === item.path) ||
    agentGroups.some((agentGroup) => agentGroup.items.some((item) => pathname === item.path))

  // Load state from session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageKey = getStorageKey(groupKey)
      const savedState = sessionStorage.getItem(storageKey)
      const manualToggleKey = `${storageKey}-manual`
      const wasManuallyToggled = sessionStorage.getItem(manualToggleKey) === "true"

      if (savedState !== null) {
        const collapsed = savedState === "true"
        setIsCollapsed(collapsed)
        setHasBeenManuallyToggled(wasManuallyToggled)
        console.log(
          `Sidebar group [${title}] loaded from storage: collapsed=${collapsed}, manual=${wasManuallyToggled}`,
        )
      } else {
        // Use default from config
        const defaultCollapsed = group.defaultCollapsed ?? false
        setIsCollapsed(defaultCollapsed)
        console.log(`Sidebar group [${title}] using default: collapsed=${defaultCollapsed}`)
      }

      setIsInitialized(true)
    } else {
      setIsInitialized(true)
    }
  }, [groupKey, group.defaultCollapsed, title])

  // Auto-expand if has active item and hasn't been manually toggled
  useEffect(() => {
    if (hasActiveItem && !hasBeenManuallyToggled && isCollapsible && isCollapsed) {
      setIsCollapsed(false)
      console.log(`Sidebar group [${title}] auto-expanded due to active item`)
    }
  }, [hasActiveItem, hasBeenManuallyToggled, isCollapsible, isCollapsed, title])

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isCollapsible) {
      const newCollapsedState = !isCollapsed
      setIsCollapsed(newCollapsedState)
      setHasBeenManuallyToggled(true)

      // Save to session storage
      if (typeof window !== "undefined") {
        const storageKey = getStorageKey(groupKey)
        const manualToggleKey = `${storageKey}-manual`
        sessionStorage.setItem(storageKey, newCollapsedState.toString())
        sessionStorage.setItem(manualToggleKey, "true")
      }

      console.log(`Sidebar group [${title}] manually toggled: collapsed=${newCollapsedState}`)
    }
  }

  // Don't render until initialized to prevent hydration issues
  if (!isInitialized) {
    return null
  }

  const shouldShow = !isCollapsible || !isCollapsed

  // Safe access to humanLabels with fallback
  const getDisplayTitle = () => {
    if (languageMode === "humanized" && humanLabels?.navigation && title in humanLabels.navigation) {
      return humanLabels.navigation[title as keyof typeof humanLabels.navigation]
    }
    return title
  }

  const displayTitle = getDisplayTitle()

  const headerContent = (
    <div
      className={cn(
        "flex items-center gap-2 mb-3 px-2 rounded-md py-1 transition-colors",
        isAssistant && "border-b border-slate-700 pb-3",
        isCollapsible && "hover:bg-slate-800/50",
      )}
    >
      {GroupIcon && <GroupIcon className={cn("h-5 w-5", isAssistant ? "text-cyan-400" : "text-slate-400")} />}
      <h2
        className={cn(
          "font-semibold flex-1 tracking-tight",
          isAssistant ? "text-lg text-cyan-300" : "text-sm text-slate-300",
        )}
      >
        {displayTitle}
      </h2>
      {hasActiveItem && <div className="w-2 h-2 bg-cyan-400 rounded-full" title="Contains active page" />}
      {isCollapsible && <ChevronIcon className="h-4 w-4 text-slate-400 transition-transform duration-200" />}
    </div>
  )

  return (
    <div className={cn("mb-4", isAssistant && "border-b border-slate-700 pb-4")}>
      {isCollapsible ? (
        <button
          onClick={handleToggleCollapse}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 rounded-md"
          type="button"
          aria-expanded={!isCollapsed}
          aria-controls={`sidebar-group-${groupKey}`}
        >
          {headerContent}
        </button>
      ) : (
        headerContent
      )}

      <div
        id={`sidebar-group-${groupKey}`}
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          shouldShow ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0",
        )}
      >
        {/* Regular items */}
        {items.length > 0 && (
          <div className="space-y-1 mb-3">
            {items.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                isActive={pathname === item.path}
                languageMode={languageMode}
                showTooltips={showTooltips}
              />
            ))}
          </div>
        )}

        {/* Agent groups */}
        {agentGroups.length > 0 && (
          <div className="space-y-2">
            {agentGroups.map((agentGroup) => (
              <AgentGroupComponent key={agentGroup.id} agentGroup={agentGroup} parentGroupKey={groupKey} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarNavGroup
