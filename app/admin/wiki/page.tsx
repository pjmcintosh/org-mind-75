"use client"

import { useState, useEffect } from "react"
import { WikiTableOfContents } from "@/components/wiki/WikiTableOfContents"
import { WikiSection } from "@/components/wiki/WikiSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Search, Video, MessageSquare, Code, Sparkles, Menu, X, HelpCircle } from "lucide-react"
import { wikiSections, futureEnhancements, technicalOverview } from "@/mock/wiki-content"

export default function WikiPage() {
  console.log("Fixed: Wiki layout with full-width responsive design")
  const [activeSection, setActiveSection] = useState(wikiSections?.[0]?.id || "")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole] = useState("Admin") // Mock role for demo

  // Scrollspy - Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = (wikiSections || [])
        .map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }))
        .filter((section) => section.element)

      // Account for header offset when determining active section
      const headerOffset = 100
      const currentSection = sections.find((section) => {
        const rect = section.element!.getBoundingClientRect()
        return rect.top <= headerOffset && rect.bottom >= headerOffset
      })

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const filteredSections = (wikiSections || []).filter(
    (section) =>
      searchQuery === "" ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (section.keyFeatures || []).some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getRoleMessage = () => {
    switch (userRole) {
      case "CEO":
        return "This section is critical for executive alignment"
      case "Client":
        return "This is provided for your onboarding context"
      default:
        return "Administrative documentation and system guidance"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Sidebar (TOC) */}
          <aside
            className={`lg:col-span-3 ${sidebarCollapsed ? "hidden lg:hidden" : "block"} transition-all duration-300`}
          >
            <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 p-4 sticky top-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <WikiTableOfContents
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className={`${sidebarCollapsed ? "lg:col-span-12" : "lg:col-span-9"} transition-all duration-300`}>
            {/* Top Controls */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="flex items-center space-x-2 bg-slate-800/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20"
                >
                  {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  <span>{sidebarCollapsed ? "Show" : "Hide"} TOC</span>
                </Button>

                {/* Enhanced Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-4 w-4" />
                  <Input
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-900/50 text-cyan-300 border border-cyan-500/20 placeholder:text-slate-400 w-64"
                  />
                </div>
              </div>

              {/* Role-aware message */}
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                {getRoleMessage()}
              </Badge>
            </div>

            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-cyan-400 text-xl font-semibold flex items-center gap-2">
                      Learn About Tilo
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-blue-300" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#0f1a2c]/95 border border-cyan-500/20 text-white">
                            <p>Discover how Tilo works and learn about platform features</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                    <CardDescription className="text-blue-300">
                      Platform documentation, agent workflows, and system architecture
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                      {(wikiSections || []).length} sections
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Live Documentation</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="text-white space-y-6">
                {/* Enhanced Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-900/80 border border-cyan-500/20">
                    <TabsTrigger
                      value="overview"
                      className="flex items-center space-x-2 text-base data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="technical"
                      className="flex items-center space-x-2 text-base data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                    >
                      <Code className="h-5 w-5" />
                      <span>Technical</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="future"
                      className="flex items-center space-x-2 text-base data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Future</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-cyan-400">Platform Features & Workflows</h2>
                      {searchQuery && (
                        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {filteredSections.length} results for "{searchQuery}"
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-6">
                      {filteredSections.map((section) => (
                        <Card key={section.id} className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-cyan-300 flex items-center gap-2">
                                {section.title}
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <HelpCircle className="h-4 w-4 text-blue-300" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-[#0f1a2c]/95 border border-cyan-500/20 text-white max-w-xs">
                                      <div className="space-y-2">
                                        <p>
                                          <strong>Purpose:</strong> {section.purpose}
                                        </p>
                                        <p>
                                          <strong>Key Features:</strong>{" "}
                                          {(section.keyFeatures || []).slice(0, 2).join(", ")}
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </CardTitle>
                              {section.requiredRoles && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                  {section.requiredRoles.join(", ")}
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="text-blue-300">{section.purpose}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <WikiSection section={section} showTechnical={false} />

                            {/* Agent Review Notes */}
                            <div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">
                                  Reviewed by Ada
                                </Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                  Updated by Eve
                                </Badge>
                              </div>
                              <span className="text-xs text-blue-300">Last updated: 2 days ago</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Technical Tab */}
                  <TabsContent value="technical" className="space-y-6">
                    <h2 className="text-2xl font-semibold text-cyan-400">Technical Documentation</h2>

                    <Card className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-xl text-cyan-400">
                          <Code className="h-6 w-6" />
                          <span>Platform Architecture</span>
                        </CardTitle>
                        <CardDescription className="text-blue-300">
                          Technical overview of the Ephrya platform
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-cyan-400 mb-3 text-lg">Architecture</h4>
                            <p className="text-white">{technicalOverview?.architecture || "Not available"}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-cyan-400 mb-3 text-lg">Components</h4>
                            <p className="text-white">{technicalOverview?.components || "Not available"}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-cyan-400 mb-3 text-lg">Data Flow</h4>
                            <p className="text-white">{technicalOverview?.dataFlow || "Not available"}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-cyan-400 mb-3 text-lg">Deployment</h4>
                            <p className="text-white">{technicalOverview?.deployment || "Not available"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Technical Sections */}
                    <div className="space-y-6">
                      {filteredSections.map((section) => (
                        <Card key={section.id} className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                          <WikiSection section={section} showTechnical={true} />
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Future Tab */}
                  <TabsContent value="future" className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Future Enhancements</h2>
                      <p className="text-blue-300 mb-8 text-lg">
                        Planned features and improvements for the Ephrya platform
                      </p>

                      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                        {(Array.isArray(futureEnhancements) ? futureEnhancements : []).map((enhancement, index) => (
                          <Card key={index} className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg text-cyan-400">
                                  {typeof enhancement === "string" ? enhancement : enhancement.title || "Enhancement"}
                                </CardTitle>
                                <Badge
                                  variant={
                                    typeof enhancement !== "string" && enhancement.status === "Implemented"
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={`text-sm ${
                                    typeof enhancement !== "string" && enhancement.status === "Implemented"
                                      ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                      : "bg-slate-700/50 text-blue-300 border-slate-600"
                                  }`}
                                >
                                  {typeof enhancement !== "string" && enhancement.status
                                    ? enhancement.status
                                    : "Planned"}
                                </Badge>
                              </div>
                              <CardDescription className="text-blue-300">
                                {typeof enhancement !== "string" && enhancement.description
                                  ? enhancement.description
                                  : "Coming soon"}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>

                      {/* Future Features Placeholder */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
                        <Card className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-xl text-cyan-400">
                              <Video className="h-6 w-6" />
                              <span>Video Tutorials</span>
                            </CardTitle>
                            <CardDescription className="text-blue-300">
                              Interactive video walkthroughs (Coming Soon)
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              variant="outline"
                              disabled
                              size="lg"
                              className="bg-slate-800/50 text-blue-300 border-slate-700"
                            >
                              <Video className="h-5 w-5 mr-2" />
                              Watch Tutorials
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-xl text-cyan-400">
                              <MessageSquare className="h-6 w-6" />
                              <span>Community Tips</span>
                            </CardTitle>
                            <CardDescription className="text-blue-300">
                              User-contributed tips and best practices (Coming Soon)
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              variant="outline"
                              disabled
                              size="lg"
                              className="bg-slate-800/50 text-blue-300 border-slate-700"
                            >
                              <MessageSquare className="h-5 w-5 mr-2" />
                              Share Tips
                            </Button>
                          </CardContent>
                        </Card>

                        <Card className="bg-[#0f1a2c]/60 border border-cyan-500/10 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-xl text-cyan-400">
                              <BookOpen className="h-6 w-6" />
                              <span>Documentation</span>
                            </CardTitle>
                            <CardDescription className="text-blue-300">
                              Comprehensive platform documentation
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button
                              variant="outline"
                              size="lg"
                              className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
                            >
                              <BookOpen className="h-5 w-5 mr-2" />
                              Browse Docs
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Global Styles for Scroll Margin */}
      <style jsx global>{`
        .scroll-margin-top-20 {
          scroll-margin-top: 80px;
        }
        
        h1, h2, h3, h4, h5, h6 {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  )
}
