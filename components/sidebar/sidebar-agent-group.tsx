"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Brain, Users, Eye, LinkIcon } from "lucide-react"
import type { SidebarAgentGroup as SidebarAgentGroupType, SidebarItem } from "@/config/sidebar-config"
import { getAgentGroupStorageKey } from "@/config/sidebar-config"
import { entityTypes } from "@/lib/constants/entityTypes"
import TiloAvatar from "@/components/tilo/TiloAvatar"

// Add this new style
const shadowGlowStyle = {
  "shadow-glow-cyan": "box-shadow: 0 0 8px 2px rgba(34, 211, 238, 0.4)",
}

interface SidebarAgentGroupProps {
  agentGroup: SidebarAgentGroupType
  parentGroupKey: string
}

function SidebarAgentItem({
  item,
  isActive,
}: {
  item: SidebarItem
  isActive: boolean
}) {
  const Icon = item.icon
  const entityType = item.entityType || "AGENT"
  const entityInfo = entityTypes[entityType] || entityTypes.AGENT

  // Get entity type icon
  const getEntityIcon = (type: string) => {
    switch (type) {
      case "ORCHESTRATOR":
        return Brain
      case "AGENT":
        return Users
      case "OBSERVER":
        return Eye
      case "PARTNER":
        return LinkIcon
      default:
        return Users
    }
  }

  const EntityIcon = getEntityIcon(entityType)

  // Get avatar path based on agent ID
  const getAvatarPath = (agentId: string) => {
    if (!agentId) return null
    // Extract agent ID from path if needed
    const id = agentId.includes("/") ? agentId.split("/").pop() : agentId
    return `/${id}-avatar.png`
  }

  const avatarPath = item.agentId ? getAvatarPath(item.agentId) : null

  // Check if this is Tilo
  const isTilo =
    item.label.toLowerCase().includes("tilo") || (item.agentId && item.agentId.toLowerCase().includes("tilo"))

  return (
    <Link href={item.path}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative",
          // Active state styling - matches other sidebar items
          isActive
            ? "bg-cyan-500/10 text-white font-semibold border-l-2 border-cyan-400 ml-2"
            : "text-slate-300 hover:bg-cyan-500/5 hover:text-cyan-300",
          // External agent styling
          item.isExternal && "group relative",
        )}
        title={item.description}
      >
        {/* Agent Avatar or Entity Icon */}
        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-slate-700 relative">
          {isTilo ? (
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-slate-700 relative">
              <TiloAvatar state="idle" size="md" className="border-2 border-cyan-400 shadow-glow-cyan" />
            </div>
          ) : avatarPath ? (
            <img
              src={avatarPath || "/placeholder.svg"}
              alt={`${item.label} avatar`}
              className="w-full h-full object-cover object-center"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-slate-700">
              <span class="text-slate-400 text-xs font-semibold">${item.label.charAt(0)}</span>
            </div>
          `
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-700">
              <EntityIcon
                className={cn(
                  "h-3 w-3",
                  isActive ? "text-cyan-400" : "text-slate-400",
                  entityType === "ORCHESTRATOR" && "text-purple-400",
                  entityType === "AGENT" && "text-cyan-400",
                  entityType === "OBSERVER" && "text-yellow-400",
                  entityType === "PARTNER" && "text-green-400",
                )}
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm tracking-tight truncate",
                isActive ? "text-white font-semibold" : "text-slate-300",
                item.isExternal && "font-medium",
              )}
            >
              {item.label}
            </span>
            {item.isExternal && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30 flex-shrink-0">
                External
              </span>
            )}
            {item.isNew && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30 flex-shrink-0">
                New
              </span>
            )}
          </div>
          {item.description && (
            <div
              className={cn("text-xs leading-tight mt-0.5 truncate", isActive ? "text-blue-200" : "text-slate-400")}
              title={item.description}
            >
              {item.description}
            </div>
          )}
          {item.source && (
            <div className={cn("text-xs mt-0.5 truncate", isActive ? "text-blue-200" : "text-slate-400")}>
              via {item.source}
            </div>
          )}
        </div>

        {/* Entity type badge */}
        <div
          className={cn(
            "w-2 h-2 rounded-full flex-shrink-0",
            entityType === "ORCHESTRATOR" && "bg-purple-400",
            entityType === "AGENT" && "bg-cyan-400",
            entityType === "OBSERVER" && "bg-yellow-400",
            entityType === "PARTNER" && "bg-green-400",
          )}
          title={entityInfo.label}
        />
      </div>
    </Link>
  )
}

export function SidebarAgentGroup({ agentGroup, parentGroupKey }: SidebarAgentGroupProps) {
  const pathname = usePathname()

  // Initialize state with default from config
  const [isCollapsed, setIsCollapsed] = useState(agentGroup.defaultCollapsed ?? true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasBeenManuallyToggled, setHasBeenManuallyToggled] = useState(false)

  const { label, items, icon: GroupIcon, isCollapsible } = agentGroup
  const ChevronIcon = isCollapsed ? ChevronRight : ChevronDown

  // Check if any item in this group is active
  const hasActiveItem = items.some((item) => pathname === item.path)

  // Load state from session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageKey = getAgentGroupStorageKey(parentGroupKey, agentGroup.id)
      const savedState = sessionStorage.getItem(storageKey)
      const manualToggleKey = `${storageKey}-manual`
      const wasManuallyToggled = sessionStorage.getItem(manualToggleKey) === "true"

      if (savedState !== null) {
        const collapsed = savedState === "true"
        setIsCollapsed(collapsed)
        setHasBeenManuallyToggled(wasManuallyToggled)
        console.log(
          `Sidebar agent group [${label}] loaded from storage: collapsed=${collapsed}, manual=${wasManuallyToggled}`,
        )
      } else {
        // Use default from config
        const defaultCollapsed = agentGroup.defaultCollapsed ?? true
        setIsCollapsed(defaultCollapsed)
        console.log(`Sidebar agent group [${label}] using default: collapsed=${defaultCollapsed}`)
      }

      setIsInitialized(true)
    } else {
      setIsInitialized(true)
    }
  }, [parentGroupKey, agentGroup.id, agentGroup.defaultCollapsed, label])

  // Auto-expand only if:
  // 1. Section has active item AND
  // 2. User hasn't manually collapsed it
  useEffect(() => {
    if (hasActiveItem && !hasBeenManuallyToggled && isCollapsible) {
      if (isCollapsed) {
        setIsCollapsed(false)
        console.log(`Sidebar agent group [${label}] auto-expanded due to active item`)
      }
    }
  }, [hasActiveItem, hasBeenManuallyToggled, isCollapsed, isCollapsible, label])

  // Determine if content should show
  const shouldShow = !isCollapsible || !isCollapsed

  const handleToggleCollapse = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isCollapsible) {
      const newCollapsedState = !isCollapsed
      setIsCollapsed(newCollapsedState)
      setHasBeenManuallyToggled(true)

      // Save to session storage
      if (typeof window !== "undefined") {
        const storageKey = getAgentGroupStorageKey(parentGroupKey, agentGroup.id)
        const manualToggleKey = `${storageKey}-manual`
        sessionStorage.setItem(storageKey, newCollapsedState.toString())
        sessionStorage.setItem(manualToggleKey, "true")
      }

      console.log(`Sidebar agent group [${label}] manually toggled: collapsed=${newCollapsedState}`)
    }
  }

  // Don't render if no items
  if (items.length === 0) {
    return null
  }

  // Don't render until initialized to prevent hydration issues
  if (!isInitialized) {
    return null
  }

  const headerContent = (
    <div
      className={cn(
        "flex items-center gap-2 mb-2 px-2 rounded-md py-1 transition-colors",
        isCollapsible && "hover:bg-slate-800/50 cursor-pointer",
      )}
    >
      {GroupIcon && <GroupIcon className="h-4 w-4 text-slate-400" />}
      <h3 className="font-medium text-sm text-slate-300 flex-1">{label}</h3>
      <span className="text-xs text-slate-500">({items.length})</span>
      {hasActiveItem && <div className="w-2 h-2 bg-cyan-400 rounded-full" title="Contains active page" />}
      {isCollapsible && (
        <ChevronIcon
          className={cn(
            "h-4 w-4 text-slate-400 transition-transform duration-200",
            !isCollapsed && "transform rotate-0",
          )}
        />
      )}
    </div>
  )

  return (
    <div className="mb-3">
      {isCollapsible ? (
        <button
          onClick={handleToggleCollapse}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 rounded-md"
          type="button"
          aria-expanded={!isCollapsed}
          aria-controls={`sidebar-agent-group-${agentGroup.id}`}
        >
          {headerContent}
        </button>
      ) : (
        headerContent
      )}

      <div
        id={`sidebar-agent-group-${agentGroup.id}`}
        className={cn(
          "space-y-1 transition-all duration-300 ease-in-out overflow-hidden ml-2",
          shouldShow ? "opacity-100 max-h-96" : "opacity-0 max-h-0",
        )}
      >
        {items.map((item) => (
          <SidebarAgentItem key={item.path} item={item} isActive={pathname === item.path} />
        ))}
      </div>
    </div>
  )
}

// Also export as default for backward compatibility
export default SidebarAgentGroup
