"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useUser } from "@/hooks/use-user"

export interface HelpTooltip {
  anchorId: string
  title: string
  description: string
  position?: TooltipPosition
  visibleTo?: string[] // New prop for role-based visibility
}

export type TooltipPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "top"
  | "bottom"

interface HelpOverlayProps extends HelpTooltip {
  onClose?: () => void
}

export function HelpOverlay({
  anchorId,
  title,
  description,
  position = "bottom-right",
  visibleTo,
  onClose,
}: HelpOverlayProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const currentUser = useUser()

  useEffect(() => {
    const checkVisibility = () => {
      if (visibleTo && visibleTo.length > 0) {
        const hasAccess = visibleTo.includes(currentUser.role) || visibleTo.includes(currentUser.department)
        if (!hasAccess) {
          console.log(
            `Help overlay hidden due to role restriction: ${title} (user: ${currentUser.role}/${currentUser.department})`,
          )
          setIsVisible(false)
          return
        }
      }
      setIsVisible(true)
    }

    checkVisibility()
  }, [visibleTo, currentUser.role, currentUser.department, title])

  useEffect(() => {
    const anchorElement = document.getElementById(anchorId)
    if (!anchorElement) {
      console.warn(`Help overlay anchor element not found: ${anchorId}`)
      return
    }

    const updatePosition = () => {
      const rect = anchorElement.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

      let top = rect.top + scrollTop
      let left = rect.left + scrollLeft

      // Adjust position based on specified position
      switch (position) {
        case "top-left":
          top = rect.top + scrollTop - 10
          left = rect.left + scrollLeft - 10
          break
        case "top-right":
          top = rect.top + scrollTop - 10
          left = rect.right + scrollLeft + 10
          break
        case "bottom-left":
          top = rect.bottom + scrollTop + 10
          left = rect.left + scrollLeft - 10
          break
        case "bottom-right":
          top = rect.bottom + scrollTop + 10
          left = rect.right + scrollLeft + 10
          break
        case "left":
          top = rect.top + scrollTop + rect.height / 2 - 50
          left = rect.left + scrollLeft - 320
          break
        case "right":
          top = rect.top + scrollTop + rect.height / 2 - 50
          left = rect.right + scrollLeft + 10
          break
        case "top":
          top = rect.top + scrollTop - 120
          left = rect.left + scrollLeft + rect.width / 2 - 150
          break
        case "bottom":
          top = rect.bottom + scrollTop + 10
          left = rect.left + scrollLeft + rect.width / 2 - 150
          break
      }

      // Viewport boundary checks
      const tooltipWidth = 300
      const tooltipHeight = 100
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Adjust if tooltip would go off-screen
      if (left + tooltipWidth > viewportWidth) {
        left = viewportWidth - tooltipWidth - 20
      }
      if (left < 10) {
        left = 10
      }
      if (top + tooltipHeight > viewportHeight + scrollTop) {
        top = rect.top + scrollTop - tooltipHeight - 10
      }
      if (top < scrollTop + 10) {
        top = scrollTop + 10
      }

      setTooltipPosition({ top, left })
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition)
    window.addEventListener("resize", updatePosition)

    // Log when tooltip is rendered (only for visible tooltips)
    console.log(`HelpOverlay rendered: ${anchorId} (visible to: ${currentUser.role}/${currentUser.department})`)

    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
    }
  }, [anchorId, position, title, currentUser.role, currentUser.department])

  if (!isVisible) return null

  const getArrowClasses = () => {
    switch (position) {
      case "top-left":
      case "top-right":
      case "top":
        return "after:absolute after:top-full after:left-4 after:border-l-8 after:border-r-8 after:border-t-8 after:border-l-transparent after:border-r-transparent after:border-t-slate-200"
      case "bottom-left":
      case "bottom-right":
      case "bottom":
        return "before:absolute before:bottom-full before:left-4 before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-slate-200"
      case "left":
        return "after:absolute after:top-4 after:left-full after:border-t-8 after:border-b-8 after:border-l-8 after:border-t-transparent after:border-b-transparent after:border-l-slate-200"
      case "right":
        return "before:absolute before:top-4 before:right-full before:border-t-8 before:border-b-8 before:border-r-8 before:border-t-transparent before:border-b-transparent before:border-r-slate-200"
      default:
        return ""
    }
  }

  return (
    <div
      className={`fixed z-50 bg-muted rounded-xl shadow-lg border border-slate-200 p-3 max-w-sm text-sm ${getArrowClasses()}`}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
          <p className="text-slate-700 text-xs leading-relaxed">{description}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
