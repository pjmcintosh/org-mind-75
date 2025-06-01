"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"

interface LanguageModeToggleProps {
  onModeChange: (mode: "professional" | "humanized") => void
}

export function LanguageModeToggle({ onModeChange }: LanguageModeToggleProps) {
  const [mode, setMode] = useState<"professional" | "humanized">("humanized")

  // Load preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("language-mode")
    if (savedMode === "professional" || savedMode === "humanized") {
      setMode(savedMode)
      onModeChange(savedMode)
    }
  }, [onModeChange])

  const handleModeChange = (newMode: "professional" | "humanized") => {
    setMode(newMode)
    localStorage.setItem("language-mode", newMode)
    onModeChange(newMode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Language mode settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="language-mode" className="text-sm">
              {mode === "humanized" ? "Conversational Mode" : "Professional Mode"}
            </Label>
            <Switch
              id="language-mode"
              checked={mode === "humanized"}
              onCheckedChange={(checked) => handleModeChange(checked ? "humanized" : "professional")}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {mode === "humanized"
              ? "Using friendly, conversational language"
              : "Using technical, professional terminology"}
          </p>
        </div>
        <DropdownMenuItem
          onClick={() => handleModeChange("humanized")}
          className={mode === "humanized" ? "bg-slate-100 dark:bg-slate-800" : ""}
        >
          Conversational
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleModeChange("professional")}
          className={mode === "professional" ? "bg-slate-100 dark:bg-slate-800" : ""}
        >
          Professional
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
