"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronRight, FileText, CheckCircle, Clock, X, Filter } from "lucide-react"
import { AgentStatusBadge } from "./AgentStatusBadge"
import { getSignatureQueue, updateSignatureStatus } from "@/lib/signature-tracking"
import type { SignatureRequest } from "@/mock/signature-queue"

interface CollapsibleSignatureLogProps {
  signatures?: SignatureRequest[]
  className?: string
}

export function CollapsibleSignatureLog({ signatures: propSignatures, className }: CollapsibleSignatureLogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [signatures, setSignatures] = useState<SignatureRequest[]>(propSignatures || getSignatureQueue())

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
      case "acknowledged":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-500" />
      case "rejected":
      case "agent notified":
        return <X className="h-3 w-3 text-red-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
      case "acknowledged":
        return "bg-green-100/20 border border-green-100/30 text-green-800"
      case "pending":
        return "bg-yellow-100/20 border border-yellow-100/30 text-yellow-800"
      case "rejected":
      case "agent notified":
        return "bg-red-100/20 border border-red-100/30 text-red-800"
      default:
        return "bg-gray-100/20 border border-gray-100/30 text-gray-800"
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Legal":
        return "bg-blue-100/20 border border-blue-100/30 text-blue-800"
      case "Finance":
        return "bg-green-100/20 border border-green-100/30 text-green-800"
      case "HR":
        return "bg-purple-100/20 border border-purple-100/30 text-purple-800"
      default:
        return "bg-gray-100/20 border border-gray-100/30 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "NDA":
        return "🔒"
      case "Contract":
        return "📄"
      case "Policy":
        return "📋"
      case "Budget":
        return "💰"
      default:
        return "📄"
    }
  }

  const handleSignDocument = (id: string) => {
    const updatedItem = updateSignatureStatus(id, "signed")
    if (updatedItem) {
      setSignatures(getSignatureQueue())
      console.log(`CEO signed ${updatedItem.document}`)
    }
  }

  const handleRejectDocument = (id: string) => {
    const updatedItem = updateSignatureStatus(id, "rejected")
    if (updatedItem) {
      setSignatures(getSignatureQueue())
      console.log(`CEO rejected ${updatedItem.document}`)
    }
  }

  const handleRemindAgent = (agentName: string) => {
    console.log(`Reminder sent to ${agentName}`)
    // In a real implementation, this would send a notification to the agent
  }

  const filteredSignatures = signatures.filter((item) => {
    switch (filter) {
      case "pending":
        return item.status === "pending"
      case "awaiting-response":
        return item.followUpTriggered && !item.agentAcknowledged
      case "acknowledged":
        return item.agentAcknowledged
      default:
        return true
    }
  })

  const pendingCount = signatures.filter((s) => s.status === "pending").length
  const signedCount = signatures.filter((s) => s.status === "signed" || s.status === "acknowledged").length
  const awaitingResponseCount = signatures.filter((s) => s.followUpTriggered && !s.agentAcknowledged).length

  return (
    <Card className={className}>
      <CardHeader
        className="cursor-pointer hover:bg-slate-800/30 transition-colors pb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-blue-300">
          <div className="flex items-center gap-2 text-sm font-normal">
            <span>
              ({pendingCount} pending · {signedCount} signed · {awaitingResponseCount} awaiting response)
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-blue-200" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter signatures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Signatures</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="awaiting-response">Awaiting Agent Response</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Document</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent Response</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSignatures.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{getTypeIcon(item.type)}</span>
                      <div>
                        <div className="font-medium text-sm">{item.document}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDepartmentColor(item.department)} variant="outline">
                      {item.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{item.agent}</TableCell>
                  <TableCell className="text-sm">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AgentStatusBadge item={item} onRemindAgent={handleRemindAgent} />
                  </TableCell>
                  <TableCell>
                    {item.status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          onClick={() => handleSignDocument(item.id)}
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700"
                        >
                          Sign
                        </Button>
                        <Button
                          onClick={() => handleRejectDocument(item.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredSignatures.length === 0 && (
            <div className="text-center py-8 text-blue-200">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No signature records found for the selected filter</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
