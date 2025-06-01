import type React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface AgentSettingsHelpOverlayProps {
  children: React.ReactNode
  title: string
  content: string
}

const AgentSettingsHelpOverlay: React.FC<AgentSettingsHelpOverlayProps> = ({ children, title, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AgentSettingsHelpOverlay
