"use client"

import Link from "next/link"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewClientTileProps {
  className?: string
}

export default function NewClientTile({ className }: NewClientTileProps) {
  console.log("Rendering intake tile for New Client")

  return (
    <Link href="/client/intake" className="group block">
      <div
        className={cn(
          "h-full transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer animate-pulse-subtle",
          className,
        )}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-emerald-500/20 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors animate-bounce-gentle">
            <Sparkles className="h-10 w-10 text-emerald-400" />
          </div>
          <div className="mb-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-3">
              🧠 Powered by Ephrya
            </Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl mb-2 text-cyan-400">Start Your AI Project</CardTitle>
          <CardDescription className="text-base md:text-lg text-blue-300">
            Submit your first intake form to begin working with Ephrya.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {/* Onboarding Checklist */}
          <div className="bg-white/10 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold mb-3 text-cyan-400">Your Onboarding Journey:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-blue-300">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Complete Intake Form</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-300/60">
                <CheckCircle className="h-4 w-4 text-blue-300/60" />
                <span>Review Project Summary</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-300/60">
                <CheckCircle className="h-4 w-4 text-blue-300/60" />
                <span>Ephrya Analysis & Review</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-300/60">
                <CheckCircle className="h-4 w-4 text-blue-300/60" />
                <span>Access Client Portal</span>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <ul className="space-y-2 text-sm md:text-base text-blue-300">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              AI-powered project analysis
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              Expert insights and recommendations
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
              Personalized project roadmap
            </li>
          </ul>

          <Button className="w-full mt-6 text-white bg-cyan-600 hover:bg-cyan-700 py-3 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-200">
            Start Project Intake
          </Button>
        </CardContent>
      </div>
    </Link>
  )
}
