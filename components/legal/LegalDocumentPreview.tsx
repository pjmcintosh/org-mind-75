"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Copy, CheckCircle, AlertTriangle, Calendar, Bot, DollarSign, Zap } from "lucide-react"
import { exportToPDF, exportToDOCX, copyToClipboard, type LegalDocumentData } from "@/lib/export/legal-export"

interface LegalDocumentPreviewProps {
  contractType: string
  content: string
  generatedAt: string
  confidence: number
  tokensUsed: number
  estimatedCost: string
}

export function LegalDocumentPreview({
  contractType,
  content,
  generatedAt,
  confidence,
  tokensUsed,
  estimatedCost,
}: LegalDocumentPreviewProps) {
  const [copied, setCopied] = useState(false)

  const documentData: LegalDocumentData = {
    contractType,
    content,
    generatedAt,
    confidence,
    tokensUsed,
    estimatedCost,
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePDFExport = () => {
    exportToPDF(documentData)
  }

  const handleDOCXExport = () => {
    exportToDOCX(documentData)
  }

  // Parse content into structured sections
  const parseContent = (rawContent: string) => {
    const lines = rawContent.split("\n").filter((line) => line.trim())
    const sections: { type: "title" | "subtitle" | "text" | "list" | "note"; content: string }[] = []

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith("# ")) {
        sections.push({ type: "title", content: trimmed.substring(2) })
      } else if (trimmed.startsWith("## ")) {
        sections.push({ type: "subtitle", content: trimmed.substring(3) })
      } else if (trimmed.startsWith("### ")) {
        sections.push({ type: "subtitle", content: trimmed.substring(4) })
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
        sections.push({ type: "list", content: trimmed.substring(2) })
      } else if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
        sections.push({ type: "note", content: trimmed.slice(1, -1) })
      } else if (trimmed.length > 0) {
        sections.push({ type: "text", content: trimmed })
      }
    })

    return sections
  }

  const sections = parseContent(content)

  console.log("Legal draft rendered as styled document")

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-blue-600" />
              Legal Document Preview
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Generated on {new Date(generatedAt).toLocaleDateString()}
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-2">
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePDFExport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleDOCXExport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              DOCX
            </Button>
          </div>
        </div>

        {/* AI Generation Metadata */}
        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">AI Confidence:</span>
            <Badge variant="secondary">{Math.round(confidence * 100)}%</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium">Tokens:</span>
            <span className="text-sm">{tokensUsed.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Cost:</span>
            <span className="text-sm">{estimatedCost}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Legal Document Content */}
        <div id="legal-document-content" className="space-y-4 p-6 bg-white border rounded-lg">
          {sections.map((section, index) => {
            switch (section.type) {
              case "title":
                return (
                  <h1 key={index} className="text-3xl font-bold text-center text-gray-900 mb-6">
                    {section.content}
                  </h1>
                )
              case "subtitle":
                return (
                  <h2 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">
                    {section.content}
                  </h2>
                )
              case "list":
                return (
                  <div key={index} className="flex items-start gap-2 ml-4">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{section.content}</span>
                  </div>
                )
              case "note":
                return (
                  <div key={index} className="italic text-gray-600 text-sm border-l-4 border-blue-200 pl-4 py-2">
                    {section.content}
                  </div>
                )
              default:
                return (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                )
            }
          })}
        </div>

        <Separator />

        {/* Legal Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">AI-Generated Document Disclaimer</p>
            <p className="text-amber-700 mt-1">
              This document was generated by OpenAI and reviewed by Ephrya. This is not a substitute for legal advice.
              All AI-generated legal documents require review by qualified legal professionals before use.
            </p>
          </div>
        </div>

        {/* Document Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Document Type:</span>
            <p className="text-gray-900">{contractType}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Generated:</span>
            <p className="text-gray-900">{new Date(generatedAt).toLocaleString()}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">AI Model:</span>
            <p className="text-gray-900">OpenAI GPT-4</p>
          </div>
          <div>
            <span className="font-medium text-gray-600">Status:</span>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Generated
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
