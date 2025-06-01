"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Target, Star, BookOpen, Users, Code, Settings, ExternalLink } from "lucide-react"
import type { WikiSection as WikiSectionType } from "@/mock/wiki-content"

interface WikiSectionProps {
  section: WikiSectionType
  showTechnical?: boolean
}

export function WikiSection({ section, showTechnical = false }: WikiSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false)

  return (
    <Card id={section.id} className="mb-6 bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-slate-800/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-cyan-400" />
                <div>
                  <CardTitle className="text-xl text-cyan-400">{section.title}</CardTitle>
                  <CardDescription className="mt-1 text-blue-300">{section.purpose}</CardDescription>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-cyan-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-cyan-400" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Key Features */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Star className="h-4 w-4 text-cyan-400" />
                <h4 className="font-semibold text-cyan-400">Key Features</h4>
              </div>
              <ul className="space-y-2">
                {section.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Use */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <h4 className="font-semibold text-cyan-400">How to Use</h4>
              </div>
              <ol className="space-y-2">
                {section.howToUse.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-0.5 text-xs bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {index + 1}
                    </Badge>
                    <span className="text-white">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Agent Roles */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-4 w-4 text-cyan-400" />
                <h4 className="font-semibold text-cyan-400">Agent Roles</h4>
              </div>
              <div className="space-y-2">
                {section.agentRoles.map((role, index) => {
                  const [agentName, description] = role.split(": ")
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg border border-cyan-500/20"
                    >
                      <Badge variant="secondary" className="mt-0.5 bg-cyan-500/20 text-cyan-400">
                        {agentName}
                      </Badge>
                      <span className="text-blue-300 text-sm">{description}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Technical Details */}
            {showTechnical && section.technicalDetails && (
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="mb-3 bg-slate-800/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20"
                >
                  <Code className="h-4 w-4 mr-2" />
                  {showTechnicalDetails ? "Hide" : "Show"} Technical Details
                </Button>

                {showTechnicalDetails && (
                  <div className="bg-slate-900/80 text-white p-4 rounded-lg space-y-4 border border-cyan-500/20">
                    <div>
                      <h5 className="font-medium text-cyan-400 mb-2">Component</h5>
                      <code className="text-sm text-blue-300">{section.technicalDetails.componentName}</code>
                    </div>

                    <div>
                      <h5 className="font-medium text-cyan-400 mb-2">Data Models</h5>
                      <div className="space-y-1">
                        {section.technicalDetails.dataModels.map((model, index) => (
                          <code key={index} className="block text-sm text-blue-300">
                            {model}
                          </code>
                        ))}
                      </div>
                    </div>

                    {section.technicalDetails.apiRoutes && (
                      <div>
                        <h5 className="font-medium text-cyan-400 mb-2">API Routes</h5>
                        <div className="space-y-1">
                          {section.technicalDetails.apiRoutes.map((route, index) => (
                            <code key={index} className="block text-sm text-blue-300">
                              {route}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.technicalDetails.customization && (
                      <div>
                        <h5 className="font-medium text-cyan-400 mb-2">Customization Options</h5>
                        <div className="space-y-1">
                          {section.technicalDetails.customization.map((option, index) => (
                            <div key={index} className="text-sm text-blue-300">
                              • {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center space-x-3 pt-4 border-t border-cyan-500/20">
              <Button
                size="sm"
                asChild
                className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/30"
              >
                <a href={`/admin/${section.id.replace("-", "/")}`} className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Go to {section.title}</span>
                </a>
              </Button>
              {section.technicalDetails && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 text-blue-300 border-slate-700 hover:bg-slate-700/50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
