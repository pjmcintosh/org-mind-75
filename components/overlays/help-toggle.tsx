"use client"

import type React from "react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HelpToggleProps {
  title: string
  content: React.ReactNode
  className?: string
}

export default function HelpToggle({ title, content, className = "" }: HelpToggleProps) {
  console.log("Loaded: HelpToggle")

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="sm" className={`text-muted-foreground ${className}`}>
          <Info className="w-4 h-4 mr-2" /> Help
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 text-sm">
        <strong>{title}</strong>
        <div className="mt-2">{content}</div>
      </HoverCardContent>
    </HoverCard>
  )
}
