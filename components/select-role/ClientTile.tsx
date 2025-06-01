"use client"

import Link from "next/link"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { useMockData } from "@/lib/context/mock-data-context"
import { cn } from "@/lib/utils"

// Simple status formatter
function formatStatus(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

// Status color helper
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "under_review":
    case "under review":
      return "bg-yellow-100 text-yellow-800"
    case "in_planning":
    case "in planning":
      return "bg-blue-100 text-blue-800"
    case "approved":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-emerald-100 text-emerald-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

interface ClientTileProps {
  className?: string
}

export default function ClientTile({ className }: ClientTileProps) {
  console.log("Rendered dashboard tile for role: Client")
  const { projectSubmissions } = useMockData()

  // Find the first project submission for Sarah Johnson
  const clientSubmission = projectSubmissions.find(
    (submission) =>
      submission.clientEmail === "sarah.johnson@techcorp.com" || submission.clientName === "Sarah Johnson",
  )

  return (
    <Link href="/client/dashboard" className="group block">
      <div
        className={cn("h-full transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer", className)}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 bg-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <FileText className="h-10 w-10 text-blue-400" />
          </div>
          <CardTitle className="text-2xl md:text-3xl mb-2 text-cyan-400">Client Dashboard</CardTitle>
          <CardDescription className="text-base md:text-lg text-blue-300">
            {clientSubmission ? (
              <div className="space-y-2">
                <div>Project: {clientSubmission.projectName}</div>
                <Badge className={getStatusColor(clientSubmission.status)}>
                  Status: {formatStatus(clientSubmission.status)}
                </Badge>
              </div>
            ) : (
              "Access your AI project, status updates, and insights"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <ul className="space-y-2 text-sm md:text-base text-blue-300">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              View project status and updates
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Access AI insights and recommendations
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              Track submission progress
            </li>
          </ul>
          <Button className="w-full mt-6 text-white bg-cyan-600 hover:bg-cyan-700 py-3 text-base md:text-lg">
            Go to Client Dashboard
          </Button>
        </CardContent>
      </div>
    </Link>
  )
}
