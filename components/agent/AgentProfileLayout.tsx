"use client"

import type React from "react"

import { useEffect } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AgentProfileLayoutProps {
  avatarSrc: string
  agentName: string
  roleTitle: string
  themeColor: "cyan" | "violet" | "amber" | "indigo" | "blue"
  status?: string
  children: React.ReactNode
}

const themeGradients = {
  cyan: "from-cyan-950 to-slate-900",
  violet: "from-violet-950 to-slate-900",
  amber: "from-amber-950 to-slate-900",
  indigo: "from-indigo-950 to-slate-900",
  blue: "from-blue-950 to-slate-900",
}

const themeRings = {
  cyan: "ring-cyan-500/50",
  violet: "ring-violet-500/50",
  amber: "ring-amber-500/50",
  indigo: "ring-indigo-500/50",
  blue: "ring-blue-500/50",
}

const themeBadges = {
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/30",
}

export default function AgentProfileLayout({
  avatarSrc,
  agentName,
  roleTitle,
  themeColor,
  status = "Online",
  children,
}: AgentProfileLayoutProps) {
  useEffect(() => {
    console.log("Loaded: AgentProfileLayout")
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeGradients[themeColor]}`}>
      {/* Top Avatar Section */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative">
              <Avatar className={`w-32 h-32 md:w-40 md:h-40 ring-4 ${themeRings[themeColor]} shadow-lg`}>
                <AvatarImage
                  src={avatarSrc || "/placeholder.svg"}
                  alt={agentName}
                  className="object-cover object-center"
                />
                <AvatarFallback className="text-2xl font-bold bg-slate-800 text-white">
                  {agentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Status Indicator */}
              <div className="absolute -bottom-2 -right-2">
                <div className="relative">
                  <div className={`w-6 h-6 rounded-full bg-green-500 border-2 border-slate-900`} />
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
              </div>
            </div>

            {/* Name and Role */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">{agentName}</h1>
              <p className="text-slate-200 text-lg md:text-xl mb-4">{roleTitle}</p>

              {/* Status Badge */}
              <Badge variant="outline" className={`${themeBadges[themeColor]} border px-3 py-1`}>
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                {status}
              </Badge>
            </div>
          </div>

          <Separator className="bg-slate-700/50 mb-8" />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  )
}
