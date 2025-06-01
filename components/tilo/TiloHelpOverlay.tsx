"use client"

import { Button } from "@/components/ui/button"
import { X, HelpCircle } from "lucide-react"

interface HelpTooltipProps {
  id: string
  title: string
  content: string
  position: "top" | "bottom" | "left" | "right"
  offset?: { x: number; y: number }
  onClose?: () => void
}

function HelpTooltip({ id, title, content, position, offset = { x: 0, y: 0 }, onClose }: HelpTooltipProps) {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2"
      case "bottom":
        return "top-full mt-2"
      case "left":
        return "right-full mr-2"
      case "right":
        return "left-full ml-2"
      default:
        return "top-full mt-2"
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-blue-600"
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-blue-600"
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-blue-600"
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-blue-600"
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-blue-600"
    }
  }

  // Log when tooltip is rendered
  console.log(`Help: ${title} tooltip displayed`)

  return (
    <div
      className={`absolute z-50 ${getPositionClasses()}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {/* Arrow */}
      <div className={`absolute w-0 h-0 border-8 ${getArrowClasses()}`} />

      {/* Tooltip Content */}
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 max-w-xs relative">
        <div className="flex items-start gap-2">
          <HelpCircle className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-xs text-blue-100 leading-relaxed">{content}</p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 text-blue-200 hover:text-white hover:bg-blue-700"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

interface TiloHelpOverlayProps {
  isVisible: boolean
  onClose: () => void
}

export function TiloHelpOverlay({ isVisible, onClose }: TiloHelpOverlayProps) {
  if (!isVisible) return null

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Help tooltips anchored to specific elements */}
      <div className="relative z-50">
        {/* Chat Header Help */}
        <div className="absolute" style={{ top: "120px", left: "280px" }}>
          <HelpTooltip
            id="chat-header"
            title="Meet Tilo"
            content="This is Tilo — your intelligent organizational assistant. She can answer questions, trigger actions, and coordinate with other agents."
            position="bottom"
            offset={{ x: 0, y: 10 }}
          />
        </div>

        {/* System Message Help */}
        <div className="absolute" style={{ top: "280px", left: "50px" }}>
          <HelpTooltip
            id="system-message"
            title="Tilo's Introduction"
            content="Tilo introduces herself and offers suggestions based on your role and activity. She adapts her responses to your context."
            position="right"
            offset={{ x: 20, y: 0 }}
          />
        </div>

        {/* Input Field Help */}
        <div className="absolute" style={{ bottom: "120px", left: "50%" }}>
          <HelpTooltip
            id="input-field"
            title="Natural Language Input"
            content="Ask Tilo things like: 'What's the latest prompt from Max?', 'Any alerts from Eve?', or 'Show me the intake summary from Bob.'"
            position="top"
            offset={{ x: -150, y: -10 }}
          />
        </div>

        {/* Action Buttons Help */}
        <div className="absolute" style={{ top: "400px", right: "100px" }}>
          <HelpTooltip
            id="action-buttons"
            title="Interactive Actions"
            content="When Tilo offers actions like 'View Prompt' or 'Go to Dashboard,' these buttons route you to relevant panels in the app."
            position="left"
            offset={{ x: -20, y: 0 }}
          />
        </div>

        {/* Close Help Button */}
        <div className="fixed top-4 right-4 z-50">
          <Button onClick={onClose} variant="outline" size="sm" className="bg-white shadow-lg">
            <X className="h-4 w-4 mr-2" />
            Close Help
          </Button>
        </div>

        {/* Help Instructions */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-sm">Tilo Chat Guide</h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Tilo is your organizational intelligence layer — not just a support widget. She coordinates agents,
              triggers actions, and provides insights.
            </p>
            <Button onClick={onClose} size="sm" className="w-full">
              Got it, let's chat!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
