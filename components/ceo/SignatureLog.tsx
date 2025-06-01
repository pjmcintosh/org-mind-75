"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

export interface SignatureEntry {
  action: "Approved" | "Rejected" | "Requested Changes"
  agent: string
  title: string
  timestamp: string
}

interface SignatureLogProps {
  log: SignatureEntry[]
  className?: string
}

export default function SignatureLog({ log, className }: SignatureLogProps) {
  console.log("Loaded: SignatureLog")

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Requested Changes":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "Approved":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "Requested Changes":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  return (
    <Card className={`${className} mt-6`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Clock className="h-5 w-5" />
          CEO Decision Log
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {log.length === 0 ? (
          <div className="text-center py-8 text-blue-300">
            <Clock className="h-12 w-12 mx-auto mb-4 text-cyan-400/50" />
            <p>No decisions made yet.</p>
            <p className="text-sm">CEO actions will appear here in real-time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {log.map((entry, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 border border-slate-700/40 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">{getActionIcon(entry.action)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{entry.agent}</span>
                    <Badge className={getActionColor(entry.action)}>{entry.action}</Badge>
                  </div>
                  <p className="text-sm text-blue-200 mb-1">{entry.title}</p>
                  <p className="text-xs text-blue-300">{entry.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
