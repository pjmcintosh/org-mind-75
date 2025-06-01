"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight, ChevronDown } from "lucide-react"
import { wikiSections } from "@/mock/wiki-content"

interface WikiSidebarProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function WikiSidebar({ activeSection, onSectionChange, searchQuery, onSearchChange }: WikiSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    executive: true,
    agents: true,
    system: true,
  })

  const categories = {
    executive: {
      title: "Executive & Admin",
      sections: ["ceo-dashboard", "agent-monitoring", "engagement-log", "agent-settings", "exports-center"],
    },
    agents: {
      title: "Agent Workflows",
      sections: [
        "client-intake",
        "ada-review",
        "max-preview",
        "workflow-simulator",
        "agent-workflows",
        "ephrya-orchestration",
      ],
    },
    system: {
      title: "System Features",
      sections: ["help-overlay"],
    },
  }

  const filteredSections = wikiSections.filter(
    (section) =>
      searchQuery === "" ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.keyFeatures.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Wiki</h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search wiki..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {searchQuery ? (
            // Show filtered results when searching
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results ({filteredSections.length})</h3>
              {filteredSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => scrollToSection(section.id)}
                >
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">{section.purpose}</div>
                  </div>
                </Button>
              ))}
            </div>
          ) : (
            // Show categorized navigation when not searching
            Object.entries(categories).map(([categoryId, category]) => (
              <div key={categoryId}>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto"
                  onClick={() => toggleCategory(categoryId)}
                >
                  <span className="font-medium text-gray-700">{category.title}</span>
                  {expandedCategories[categoryId] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>

                {expandedCategories[categoryId] && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.sections.map((sectionId) => {
                      const section = wikiSections.find((s) => s.id === sectionId)
                      if (!section) return null

                      return (
                        <Button
                          key={sectionId}
                          variant={activeSection === sectionId ? "secondary" : "ghost"}
                          className="w-full justify-start text-left h-auto p-2"
                          onClick={() => scrollToSection(sectionId)}
                        >
                          <div>
                            <div className="text-sm font-medium">{section.title}</div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">{section.purpose}</div>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </nav>

        {/* Progress Indicator */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Reading Progress</h4>
          <div className="text-xs text-gray-500">
            Section {wikiSections.findIndex((s) => s.id === activeSection) + 1} of {wikiSections.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((wikiSections.findIndex((s) => s.id === activeSection) + 1) / wikiSections.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
