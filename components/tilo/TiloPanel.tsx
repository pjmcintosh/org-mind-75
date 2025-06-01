"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mic, X } from "lucide-react"
import TiloInterface from "./TiloInterface"
import { cn } from "@/lib/utils"

interface TiloPanelProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export default function TiloPanel({ isOpen, onClose, className = "" }: TiloPanelProps) {
  const [mode, setMode] = useState<"chat" | "voice">("chat")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className={cn("w-full max-w-3xl mx-4 bg-slate-900/95 border-slate-700", className)}>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-cyan-400">Tilo Assistant</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={mode === "chat" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("chat")}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Chat
            </Button>
            <Button
              variant={mode === "voice" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("voice")}
              className="text-xs"
            >
              <Mic className="w-3 h-3 mr-1" />
              Voice
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TiloInterface mode={mode} />
        </CardContent>
      </Card>
    </div>
  )
}
