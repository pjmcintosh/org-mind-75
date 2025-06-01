"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Copy, Check, Database, Workflow, Code, Settings, Zap, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useHelpOverlay } from "@/hooks/use-help-overlay"
import { HelpOverlay } from "@/components/help/help-overlay"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { Input } from "@/components/ui/input"

// RBAC Configuration for Reference Sections
const referenceSections = [
  {
    id: "tech-stack",
    title: "Tech Stack",
    roles: ["Admin", "CEO", "Developer"],
    icon: Zap,
    description: "Core technologies powering Organizational Mind 2.0",
  },
  {
    id: "agent-flow",
    title: "Agent Flow",
    roles: ["Admin", "CEO", "Analyst"],
    icon: Workflow,
    description: "How AI agents collaborate to process projects",
  },
  {
    id: "schema",
    title: "Data Schema",
    roles: ["Admin", "Developer", "Finance"],
    icon: Database,
    description: "Core database tables and relationships",
  },
  {
    id: "prompts",
    title: "Prompt Templates",
    roles: ["Admin", "Developer"],
    icon: Code,
    description: "How prompts are generated, reviewed, and executed",
  },
  {
    id: "env",
    title: "Environment Variables",
    roles: ["Admin", "Developer"],
    icon: Settings,
    description: "Required configuration for deployment",
  },
]

const referenceHelpConfig = [
  {
    anchorId: "tech-stack-overview",
    title: "Technology Stack",
    description:
      "This section outlines the core technologies used in the Tilo platform. Use it to understand what runs under the hood.",
    position: "bottom-left" as const,
    visibleTo: ["admin", "tech", "Engineering"],
  },
  {
    anchorId: "agent-workflow",
    title: "Agent Workflow",
    description:
      "Explore how AI agents collaborate and route requests. This shows the complete agent interaction lifecycle from intake to delivery.",
    position: "bottom-right" as const,
    visibleTo: ["admin", "tech", "Strategy", "Engineering"],
  },
  {
    anchorId: "database-schema",
    title: "Data Schema Reference",
    description:
      "Explore shared data structures, field names, and schema definitions. Useful for building APIs or validating inputs.",
    position: "bottom-left" as const,
    visibleTo: ["admin", "tech", "Engineering"],
  },
  {
    anchorId: "prompt-development",
    title: "Prompt Development",
    description:
      "This visual diagram shows how prompts are generated, reviewed, and executed. Follow this workflow for v0.dev integration.",
    position: "bottom-right" as const,
    visibleTo: ["admin", "tech", "Engineering"],
  },
  {
    anchorId: "environment-setup",
    title: "Environment Setup",
    description:
      "Includes deployment configuration, API keys, and environment variables. Use this section for system setup and integration.",
    position: "bottom-left" as const,
    visibleTo: ["admin", "tech", "Engineering"],
  },
]

export default function ReferencePage() {
  console.log("Loaded: How Tilo Works page with standardized layout")
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [showAllSections, setShowAllSections] = useState(false)
  const { toast } = useToast()
  const { isHelpVisible, toggleHelp } = useHelpOverlay()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)

  // Console logging
  console.log(`Rendering How Tilo Works for role: ${currentRole}`)
  console.log(`How Tilo Works rendered for role: ${currentRole}`)

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      toast({
        title: "Copied to clipboard",
        description: `${item} copied successfully`,
      })
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  // Filter sections based on role
  const accessibleSections = referenceSections.filter((section) => section.roles.includes(currentRole))

  const sectionsToShow = showAllSections ? referenceSections : accessibleSections

  // Check if user has access to a specific section
  const hasAccess = (sectionId: string) => {
    const section = referenceSections.find((s) => s.id === sectionId)
    return section ? section.roles.includes(currentRole) : false
  }

  const techStack = [
    {
      name: "Next.js 13+",
      description: "React framework with App Router for server-side rendering and routing",
      version: "13.5+",
      purpose: "Frontend framework and API routes",
    },
    {
      name: "Supabase",
      description: "PostgreSQL database with built-in authentication and real-time subscriptions",
      version: "Latest",
      purpose: "Database, auth, and real-time features",
    },
    {
      name: "OpenAI API",
      description: "GPT-4 integration for agent logic and natural language processing",
      version: "v1",
      purpose: "AI agent intelligence and conversation",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      version: "3.3+",
      purpose: "Styling and responsive design",
    },
    {
      name: "shadcn/ui",
      description: "Reusable component library built on Radix UI and Tailwind CSS",
      version: "Latest",
      purpose: "UI components and design system",
    },
    {
      name: "Vercel",
      description: "Cloud platform for static sites and serverless functions",
      version: "Latest",
      purpose: "Hosting and deployment",
    },
  ]

  const agentFlow = [
    {
      agent: "Bob",
      role: "Intake Specialist",
      description: "Conducts initial client interviews, collects requirements, and generates structured project data",
      input: "Client responses",
      output: "requirements_json",
      nextStep: "Sends to Ada for analysis",
    },
    {
      agent: "Ada",
      role: "Project Analyst",
      description: "Analyzes requirements, identifies gaps, and creates comprehensive project plans",
      input: "requirements_json",
      output: "plan_json",
      nextStep: "Sends to Max for implementation",
    },
    {
      agent: "Max",
      role: "Implementation Specialist",
      description: "Generates deliverables, creates v0.dev prompts, and produces technical specifications",
      input: "plan_json",
      output: "deliverables + v0_prompts",
      nextStep: "Monitored by Eve",
    },
    {
      agent: "Eve",
      role: "System Monitor",
      description: "Monitors system health, tracks costs, and generates alerts for human review",
      input: "All agent activities",
      output: "alerts + metrics",
      nextStep: "Reports to admin dashboard",
    },
  ]

  const schemaReference = [
    {
      table: "projects",
      description: "Core project records and status tracking",
      fields: [
        "id (UUID, Primary Key)",
        "client_id (UUID, Foreign Key)",
        "requirements_json (JSONB)",
        "plan_json (JSONB)",
        "status (TEXT)",
        "created_at (TIMESTAMP)",
        "updated_at (TIMESTAMP)",
      ],
    },
    {
      table: "agent_events",
      description: "Log of all agent activities and state changes",
      fields: [
        "id (UUID, Primary Key)",
        "project_id (UUID, Foreign Key)",
        "agent (TEXT)",
        "event_type (TEXT)",
        "details (JSONB)",
        "timestamp (TIMESTAMP)",
      ],
    },
  ]

  const envVariables = [
    {
      name: "NEXT_PUBLIC_SUPABASE_URL",
      description: "Public Supabase project URL",
      example: "https://your-project.supabase.co",
      required: true,
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      description: "Supabase anonymous public key",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      required: true,
    },
    {
      name: "OPENAI_API_KEY",
      description: "OpenAI API key for GPT-4 integration",
      example: "sk-proj-...",
      required: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10 max-w-screen-xl mx-auto">
      {/* Role Awareness Header */}
      <div className="mb-4 p-3 bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-900">Viewing as:</span>
            <Badge variant="secondary" className="flex items-center gap-1" style={{ backgroundColor: roleInfo.color }}>
              <span>{roleInfo.icon}</span>
              {currentRole}
            </Badge>
            <span className="text-xs text-blue-700">
              ({accessibleSections.length} of {referenceSections.length} sections accessible)
            </span>
          </div>
          {currentRole === "Admin" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-700">Show All Sections:</span>
              <Switch checked={showAllSections} onCheckedChange={setShowAllSections} />
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6 mb-6">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-lg font-semibold">How Tilo Works</CardTitle>
          <CardDescription className="text-blue-300">Stack, schema, and design system powering Tilo</CardDescription>
        </CardHeader>
      </Card>

      {/* Help Overlays */}
      {isHelpVisible && referenceHelpConfig.map((tooltip) => <HelpOverlay key={tooltip.anchorId} {...tooltip} />)}

      <Tabs defaultValue={sectionsToShow[0] ? sectionsToShow[0].id : "tech-stack"} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-6 bg-slate-800/50 p-1">
          {sectionsToShow.map((section) => {
            const Icon = section.icon
            const isRestricted = showAllSections && !hasAccess(section.id)

            return (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className={`text-xs sm:text-sm ${isRestricted ? "opacity-50" : ""}`}
                disabled={isRestricted}
              >
                <Icon className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{section.title}</span>
                <span className="sm:hidden">{section.title.split(" ")[0]}</span>
                {isRestricted && <Lock className="h-3 w-3 ml-1" />}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="tech-stack" className="space-y-4">
          {hasAccess("tech-stack") || showAllSections ? (
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 mb-4">
              <CardHeader id="tech-stack-overview">
                <CardTitle className="text-cyan-400 text-base">
                  <Zap className="h-5 w-5" />
                  Technology Stack Overview
                  {!hasAccess("tech-stack") && showAllSections && (
                    <Badge variant="destructive" className="text-xs">
                      Restricted
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-blue-300 text-sm">
                  Core technologies powering Organizational Mind 2.0
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-white text-sm">
                {!hasAccess("tech-stack") && showAllSections ? (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-red-300 font-medium">Access Restricted</p>
                    <p className="text-red-400 text-sm">
                      You do not have permission to view this documentation section.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6">
                    {techStack.map((tech, index) => (
                      <div key={index} className="border rounded-lg p-3 sm:p-4 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-sm sm:text-base">{tech.name}</h3>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {tech.version}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {tech.purpose}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="agent-flow" className="space-y-4">
          {hasAccess("agent-flow") || showAllSections ? (
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 mb-4">
              <CardHeader id="agent-workflow">
                <CardTitle className="text-cyan-400 text-base">
                  <Workflow className="h-5 w-5" />
                  Agent Workflow
                  {!hasAccess("agent-flow") && showAllSections && (
                    <Badge variant="destructive" className="text-xs">
                      Restricted
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-blue-300 text-sm">
                  How AI agents collaborate to process projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-white text-sm">
                {!hasAccess("agent-flow") && showAllSections ? (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-red-300 font-medium">Access Restricted</p>
                    <p className="text-red-400 text-sm">
                      You do not have permission to view this documentation section.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {agentFlow.map((agent, index) => (
                      <div key={index} className="relative">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs sm:text-sm font-bold text-blue-600">{agent.agent}</span>
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <h3 className="font-semibold text-sm sm:text-base">{agent.agent}</h3>
                              <Badge variant="outline" className="text-xs w-fit">
                                {agent.role}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600">{agent.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                              <div>
                                <span className="font-medium">Input:</span> {agent.input}
                              </div>
                              <div>
                                <span className="font-medium">Output:</span> {agent.output}
                              </div>
                              <div>
                                <span className="font-medium">Next:</span> {agent.nextStep}
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < agentFlow.length - 1 && (
                          <div className="hidden sm:block absolute left-4 sm:left-5 top-10 sm:top-12 w-0.5 h-4 sm:h-6 bg-slate-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="schema" className="space-y-4">
          {hasAccess("schema") || showAllSections ? (
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 mb-4">
              <CardHeader id="database-schema">
                <CardTitle className="text-cyan-400 text-base">
                  <Database className="h-5 w-5" />
                  Database Schema Reference
                  {!hasAccess("schema") && showAllSections && (
                    <Badge variant="destructive" className="text-xs">
                      Restricted
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-blue-300 text-sm">
                  Core database tables and relationships
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-white text-sm">
                {!hasAccess("schema") && showAllSections ? (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-red-300 font-medium">Access Restricted</p>
                    <p className="text-red-400 text-sm">
                      You do not have permission to view this documentation section.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {schemaReference.map((table, index) => (
                      <div key={index} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <h3 className="font-semibold text-sm sm:text-base">{table.table}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(table.fields.join("\n"), table.table)}
                            className="w-fit text-xs bg-slate-900/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-900/20"
                          >
                            {copiedItem === table.table ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            Copy Schema
                          </Button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-3">{table.description}</p>
                        <div className="bg-slate-900/50 rounded p-2 sm:p-3">
                          <pre className="text-xs font-mono overflow-x-auto text-cyan-100">
                            {table.fields.join("\n")}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="env" className="space-y-4">
          {hasAccess("env") || showAllSections ? (
            <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 mb-4">
              <CardHeader id="environment-setup">
                <CardTitle className="text-cyan-400 text-base">
                  <Settings className="h-5 w-5" />
                  Environment Variables
                  {!hasAccess("env") && showAllSections && (
                    <Badge variant="destructive" className="text-xs">
                      Restricted
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-blue-300 text-sm">
                  Required configuration for deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-white text-sm">
                {!hasAccess("env") && showAllSections ? (
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <p className="text-red-300 font-medium">Access Restricted</p>
                    <p className="text-red-400 text-sm">
                      You do not have permission to view this documentation section.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {envVariables.map((env, index) => (
                      <div key={index} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <code className="text-xs sm:text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                              {env.name}
                            </code>
                            {env.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(env.name, env.name)}
                            className="w-fit text-xs bg-slate-900/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-900/20"
                          >
                            {copiedItem === env.name ? (
                              <Check className="h-3 w-3 mr-1" />
                            ) : (
                              <Copy className="h-3 w-3 mr-1" />
                            )}
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-2">{env.description}</p>
                        <div className="bg-slate-900/50 rounded p-2">
                          <Input
                            value={env.example}
                            className="bg-slate-900 text-cyan-300 border border-cyan-500/20 placeholder:text-slate-600 font-mono text-xs"
                            readOnly
                          />
                        </div>
                      </div>
                    ))}

                    <div className="mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-sm sm:text-base mb-2">Setup Instructions</h4>
                      <ol className="text-xs sm:text-sm space-y-1 list-decimal list-inside text-slate-600">
                        <li>
                          Create a <code>.env.local</code> file in your project root
                        </li>
                        <li>Add all required environment variables</li>
                        <li>Restart your development server</li>
                        <li>For production, add variables to your Vercel dashboard</li>
                      </ol>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  )
}
