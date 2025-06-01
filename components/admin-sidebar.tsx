"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home } from "lucide-react"
import { useRole } from "@/lib/context/role-context"
import { LanguageModeToggle } from "./sidebar/language-mode-toggle"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { humanLabels } from "@/lib/constants/humanLabels"
import { getSidebarConfigByRole } from "@/config/sidebar-config"
import { usePathname, useRouter } from "next/navigation"
import { SidebarNavGroup } from "./sidebar/sidebar-nav-group"
import TiloAvatar from "@/components/tilo/TiloAvatar"

interface AdminSidebarContentProps {
  className?: string
  userRole?: string
}

export function AdminSidebarContent({ className, userRole }: AdminSidebarContentProps) {
  const { currentRole } = useRole()
  const [isInitialized, setIsInitialized] = useState(false)
  const [languageMode, setLanguageMode] = useState<"professional" | "humanized">("humanized")
  const pathname = usePathname()
  const router = useRouter()

  // Use the role from context if not provided as prop
  const effectiveRole = userRole || currentRole

  // Initialize sidebar
  useEffect(() => {
    console.log(`Rendering sidebar for role: ${effectiveRole}`)
    setIsInitialized(true)
    console.log(`Sidebar generated for role: ${effectiveRole}`)
  }, [effectiveRole])

  const handleLanguageModeChange = (mode: "professional" | "humanized") => {
    setLanguageMode(mode)
  }

  const handleTiloClick = () => {
    router.push("/admin/ask-tilo")
  }

  // Don't render until initialized to prevent hydration issues
  if (!isInitialized) {
    return (
      <div className={cn("flex h-full flex-col", className)}>
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span className="text-lg">Tilo</span>
          </Link>
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const filteredSidebarConfig = getSidebarConfigByRole(effectiveRole)

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-gradient-to-br from-slate-900 to-slate-950 border-r border-slate-700 relative z-40",
        className,
      )}
    >
      {/* Header with Language Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-slate-700 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-slate-100 hover:text-white transition-colors"
        >
          <Home className="h-6 w-6" />
          <span className="text-lg">Tilo</span>
        </Link>
        <LanguageModeToggle onModeChange={handleLanguageModeChange} />
      </div>

      {/* Wrap both Tilo orb and navigation in TooltipProvider */}
      <TooltipProvider>
        {/* Tilo 3D Orb - Always Display */}
        <div className="flex flex-col items-center justify-center mt-4 mb-6 px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleTiloClick}
                className="w-20 h-20 mb-3 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                aria-label="Ask Tilo"
              >
                <TiloAvatar state="idle" size="lg" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Ask Tilo a question</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-slate-400 font-medium text-center">
            {languageMode === "humanized" ? "Tilo is here to help" : "AI Assistant"}
          </p>
        </div>

        {/* Role Indicator */}
        <div className="px-4 py-3 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium tracking-tight">
              {languageMode === "humanized" ? "Viewing as:" : "Role:"}
            </span>
            <div className="bg-slate-800 text-cyan-400 rounded-full px-3 py-1 text-xs shadow-md font-medium">
              {effectiveRole}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {Object.entries(filteredSidebarConfig).map(([key, group]) => {
            // Skip groups with no visible content
            const hasVisibleItems =
              (group.items && group.items.length > 0) ||
              (group.agentGroups && group.agentGroups.some((ag) => ag.items.length > 0))

            if (!hasVisibleItems) return null

            return (
              <SidebarNavGroup
                key={key}
                group={group}
                groupKey={key}
                isAssistant={key === "assistant"}
                languageMode={languageMode}
                showTooltips={true}
              />
            )
          })}
        </nav>
      </TooltipProvider>

      {/* System Status */}
      <div className="text-xs text-slate-400 px-4 py-3 border-t border-slate-700">
        {languageMode === "humanized" ? "System Status:" : "Status:"}
        <span className="text-green-400 font-semibold ml-1">
          {languageMode === "humanized" ? humanLabels?.status?.active || "Active" : "Online"}
        </span>
      </div>
    </div>
  )
}

export function AdminSidebar({ userRole }: { userRole?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar - only render on desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-slate-700 lg:bg-gradient-to-br lg:from-slate-900 lg:to-slate-950 lg:z-40">
        <AdminSidebarContent userRole={userRole} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 z-50">
          <AdminSidebarContent userRole={userRole} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export function AdminMobileHeader({ userRole }: { userRole?: string }) {
  return (
    <div className="flex h-16 items-center gap-4 border-b border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 px-4 lg:hidden z-30">
      <AdminSidebar userRole={userRole} />
      <div className="flex-1">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-slate-100 hover:text-white transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Tilo</span>
        </Link>
      </div>
    </div>
  )
}

export function AgentPageLayout({
  agentName,
  agentFunction,
  children,
}: {
  agentName: string
  agentFunction: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-slate-600 hover:text-slate-900">
            <Home className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{agentName}</h1>
            <p className="text-sm text-slate-600">{agentFunction}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">{children}</div>
    </div>
  )
}

export default AdminSidebar
