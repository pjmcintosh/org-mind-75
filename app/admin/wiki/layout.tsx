import type React from "react"
import Link from "next/link"
import { ArrowLeft, MessageCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// This layout completely overrides the parent admin layout
export const metadata = {
  title: "Ephrya Platform Wiki",
}

// Set this to true to override parent layout
export const override = true

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/80 backdrop-blur-sm">
        <Link href="/admin/dashboard">
          <Button variant="ghost" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
        </Link>

        <div className="flex items-center space-x-3">
          <HelpCircle className="h-5 w-5 text-cyan-400" />
          <span className="text-lg font-semibold text-white">Ephrya Platform Wiki</span>
        </div>

        <Link href="/admin/ask-ephrya">
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat with Ephrya</span>
          </Button>
        </Link>
      </div>

      {/* Main Wiki Content - Full width without admin sidebar */}
      <div className="w-full">{children}</div>
    </div>
  )
}
