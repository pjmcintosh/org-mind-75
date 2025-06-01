import type React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ReferenceHelpOverlayProps {
  children: React.ReactNode
  content: React.ReactNode
}

const ReferenceHelpOverlay: React.FC<ReferenceHelpOverlayProps> = ({ children, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">{content}</PopoverContent>
    </Popover>
  )
}

export default ReferenceHelpOverlay
