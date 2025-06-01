"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ChevronDown, BookOpen } from "lucide-react"
import { wikiSections } from "@/mock/wiki-content"

interface WikiTableOfContentsProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function WikiTableOfContents({
  activeSection,
  onSectionChange,
  searchQuery,
  onSearchChange,
}: WikiTableOfContentsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("executive")

  // Section organization with numbering
  const sections = [
    {
      id: "executive",
      title: "1. Executive & Admin",
      items: [
        { id: "ceo-dashboard", title: "1.1 CEO Dashboard", number: "1.1" },
        { id: "agent-monitoring", title: "1.2 Agent Monitoring", number: "1.2" },
        { id: "engagement-log", title: "1.3 Engagement Log", number: "1.3" },
        { id: "agent-settings", title: "1.4 Agent Settings", number: "1.4" },
        { id: "exports-center", title: "1.5 Export Center", number: "1.5" },
      ],
    },
    {
      id: "agents",
      title: "2. Agent Workflows",
      items: [
        { id: "client-intake", title: "2.1 Client Intake (Bob)", number: "2.1" },
        { id: "ada-review", title: "2.2 Ada Review", number: "2.2" },
        { id: "max-preview", title: "2.3 Max Preview", number: "2.3" },
        { id: "workflow-simulator", title: "2.4 Workflow Simulator", number: "2.4" },
        { id: "agent-workflows", title: "2.5 Agent Workflows", number: "2.5" },
        { id: "ephrya-orchestration", title: "2.6 Ephrya Orchestration", number: "2.6" },
      ],
    },
    {
      id: "system",
      title: "3. System Features",
      items: [{ id: "help-overlay", title: "3.1 Help Overlay System", number: "3.1" }],
    },
  ]

  const filteredSections = wikiSections.filter(
    (section) =>
      searchQuery === "" ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.keyFeatures.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate offset for sticky header (80px)
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Handle Escape key to collapse all sections
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedSection(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Auto-expand section containing active item
  useEffect(() => {
    const activeItem = sections.find((section) => section.items.some((item) => item.id === activeSection))
    if (activeItem && expandedSection !== activeItem.id) {
      setExpandedSection(activeItem.id)
    }
  }, [activeSection])

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-semibold text-cyan-400">Table of Contents</h2>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 text-sm bg-slate-800/80 text-white border-slate-700 placeholder-blue-300"
          />
        </div>

        {/* Table of Contents */}
        <nav className="space-y-1">
          {searchQuery ? (
            // Search Results
            <div>
              <h3 className="text-sm font-medium text-blue-300 mb-3 uppercase tracking-wide">
                Search Results ({filteredSections.length})
              </h3>
              {filteredSections.map((section) => {
                const sectionInfo = sections.flatMap((s) => s.items).find((item) => item.id === section.id)

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-cyan-500/20 text-cyan-400 border-l-4 border-cyan-400"
                        : "hover:bg-slate-800/50 text-blue-300 hover:text-white"
                    }`}
                  >
                    <div className="font-medium text-sm leading-relaxed">
                      {sectionInfo?.number} {section.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{section.purpose}</div>
                  </button>
                )
              })}
            </div>
          ) : (
            // Structured TOC
            sections.map((section) => (
              <div key={section.id} className="mb-2">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-cyan-400 text-base leading-relaxed">{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronDown className="h-4 w-4 text-cyan-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-cyan-400" />
                  )}
                </button>

                {/* Section Items */}
                {expandedSection === section.id && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left p-2 pl-4 rounded-md transition-colors text-sm leading-relaxed ${
                          activeSection === item.id
                            ? "bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400 font-medium"
                            : "hover:bg-slate-800/50 text-blue-300 hover:text-white"
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </nav>

        {/* Reading Progress */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
          <h4 className="text-sm font-medium text-cyan-400 mb-2">Reading Progress</h4>
          <div className="text-xs text-blue-300 mb-2">
            Section {wikiSections.findIndex((s) => s.id === activeSection) + 1} of {wikiSections.length}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((wikiSections.findIndex((s) => s.id === activeSection) + 1) / wikiSections.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Keyboard Shortcut Hint */}
        <div className="mt-4 text-xs text-blue-300 text-center">
          Press <kbd className="px-1 py-0.5 bg-slate-800 rounded text-cyan-400">Esc</kbd> to collapse sections
        </div>
      </div>
    </div>
  )
}
