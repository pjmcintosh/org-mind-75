"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AgentProfileHeaderProps {
  name: string
  role: string
  avatarSrc?: string
  fallbackInitials: string
  statusBadges?: string[]
  description?: string
}

const getBadgeVariant = (badge: string) => {
  const lowerBadge = badge.toLowerCase()

  if (lowerBadge.includes("active")) {
    return "bg-green-500/20 text-green-400 border-green-500/30"
  }
  if (lowerBadge.includes("internal") || lowerBadge.includes("only")) {
    return "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }
  if (lowerBadge.includes("hr") || lowerBadge.includes("human")) {
    return "bg-pink-500/20 text-pink-400 border-pink-500/30"
  }
  if (lowerBadge.includes("finance") || lowerBadge.includes("financial")) {
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  }
  if (lowerBadge.includes("legal")) {
    return "bg-purple-500/20 text-purple-400 border-purple-500/30"
  }
  if (lowerBadge.includes("strategy") || lowerBadge.includes("strategic")) {
    return "bg-violet-500/20 text-violet-400 border-violet-500/30"
  }
  if (lowerBadge.includes("engineering") || lowerBadge.includes("technical")) {
    return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  }
  if (lowerBadge.includes("operations") || lowerBadge.includes("ops")) {
    return "bg-orange-500/20 text-orange-400 border-orange-500/30"
  }
  if (
    lowerBadge.includes("security") ||
    lowerBadge.includes("threat") ||
    lowerBadge.includes("internal security") ||
    lowerBadge.includes("threat monitor")
  ) {
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  // Default variant
  return "bg-slate-500/20 text-slate-400 border-slate-500/30"
}

export default function AgentProfileHeader({
  name,
  role,
  avatarSrc,
  fallbackInitials,
  statusBadges = [],
  description,
}: AgentProfileHeaderProps) {
  console.log(`Loaded: AgentProfileHeader for ${name}`)

  // Limit to max 3 badges
  const displayBadges = statusBadges.slice(0, 3)

  const isSecurityRelated = statusBadges.some(
    (badge) => badge.toLowerCase().includes("security") || badge.toLowerCase().includes("threat"),
  )

  const ringGradient = isSecurityRelated ? "from-red-400 to-red-400" : "from-cyan-400 to-violet-400"

  return (
    <Card className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-cyan-500/20 backdrop-blur-sm mb-8">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          {/* Avatar with gradient ring and glow effect */}
          <div className="relative flex-shrink-0">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${isSecurityRelated ? "from-red-400 to-orange-400" : "from-cyan-400 to-violet-400"} opacity-75 blur-sm animate-pulse`}
            ></div>
            <Avatar
              className={`relative h-20 w-20 md:h-24 md:w-24 ring-2 ${isSecurityRelated ? "ring-red-400/50" : "ring-cyan-400/50"} ring-offset-4 ring-offset-slate-800`}
            >
              <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="bg-slate-800 text-cyan-400 text-xl md:text-2xl font-bold">
                {fallbackInitials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Agent Info */}
          <div className="flex-1 text-center md:text-left">
            {/* Name with gradient text */}
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isSecurityRelated ? "bg-gradient-to-r from-red-400 to-orange-400" : "bg-gradient-to-r from-cyan-400 to-violet-400"} bg-clip-text text-transparent mb-2`}
            >
              {name}
            </h1>

            {/* Role subtitle */}
            <p className={`${isSecurityRelated ? "text-red-300" : "text-cyan-300"} text-lg md:text-xl mb-4`}>{role}</p>

            {/* Description (max 2 lines) */}
            {description && (
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4 max-w-2xl line-clamp-2">
                {description}
              </p>
            )}

            {/* Status Badges (max 3, horizontal layout) */}
            {displayBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {displayBadges.map((badge, index) => (
                  <Badge key={index} variant="outline" className={`text-xs px-3 py-1 ${getBadgeVariant(badge)}`}>
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
