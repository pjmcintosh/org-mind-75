"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMockData } from "@/lib/context/mock-data-context"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClientSelectorCardProps {
  className?: string
}

export default function ClientSelectorCard({ className }: ClientSelectorCardProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const { userRoles, projectSubmissions } = useMockData()
  const router = useRouter()

  console.log("Loaded: ClientSelectorCard")

  // Filter to get only client users (case-insensitive)
  const clientUsers = userRoles.filter((user) => user.role.toLowerCase() === "client")

  // Get selected client details
  const selectedClient = clientUsers.find((client) => client.id === selectedClientId)

  // Get selected client's projects
  const clientProjects = selectedClient
    ? projectSubmissions.filter((project) => project.clientEmail === selectedClient.email)
    : []

  const activeProject = clientProjects.find(
    (project) => project.status === "Under Review" || project.status === "In Planning",
  )

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId)
    const client = clientUsers.find((c) => c.id === clientId)
    if (client) {
      console.log(`Admin selected client: ${client.email}`)
    }
  }

  const handleGoToClientDashboard = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (selectedClient) {
      console.log(`Admin impersonating client: ${selectedClient.email}`)
      console.log(`Navigating to: /client/dashboard?client=${selectedClient.email}`)

      // Force navigation to client dashboard
      window.location.href = `/client/dashboard?client=${selectedClient.email}`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "In Planning":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className={cn("w-full hover:shadow-lg transition-shadow duration-200", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-xl text-cyan-400">Client Dashboard Access</CardTitle>
            <CardDescription className="text-blue-300">Select a client to view their dashboard</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Client Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Select Client</label>
          <Select value={selectedClientId} onValueChange={handleClientSelect}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Choose a client..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {clientUsers.map((client) => (
                <SelectItem key={client.id} value={client.id} className="text-white hover:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{client.name}</span>
                    <span className="text-sm opacity-70">({client.email})</span>
                    {client.department && (
                      <Badge variant="outline" className="text-xs">
                        {client.department}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selected Client Info */}
        {selectedClient && (
          <div className="p-4 bg-white/10 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-cyan-400">{selectedClient.name}</h4>
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                {selectedClient.department || "General"}
              </Badge>
            </div>

            <div className="text-sm text-blue-300">
              <p>Email: {selectedClient.email}</p>
              <p>Last Login: {new Date(selectedClient.lastLogin).toLocaleDateString()}</p>
            </div>

            {/* Active Project Info */}
            {activeProject ? (
              <div className="pt-2 border-t border-white/20">
                <p className="text-sm font-medium mb-1 text-cyan-400">Active Project:</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-300">{activeProject.projectName}</span>
                  <Badge className={getStatusColor(activeProject.status)}>{activeProject.status}</Badge>
                </div>
                <p className="text-xs text-blue-300/70 mt-1">
                  Submitted: {new Date(activeProject.submissionDate).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="pt-2 border-t border-white/20">
                <p className="text-sm text-blue-300/70">No active projects</p>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleGoToClientDashboard}
          disabled={!selectedClient}
          className="w-full text-white bg-cyan-600 hover:bg-cyan-700"
          type="button"
        >
          <span>Go to Client Dashboard</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        {/* Helper Text */}
        <p className="text-xs text-blue-300/70 text-center">
          As an Admin, you can view any client's dashboard for support purposes
        </p>
      </CardContent>
    </div>
  )
}
