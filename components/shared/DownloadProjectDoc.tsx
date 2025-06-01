"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DownloadProjectDocProps {
  projectId: string
  docType: "requirements" | "plan"
}

export function DownloadProjectDoc({ projectId, docType }: DownloadProjectDocProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setIsDownloading(true)

    // Console log for tracking
    console.log(`Initiating PDF download for Project ID: ${projectId} (${docType})`)

    // Simulate file creation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate filename
    const fileName = `project-${projectId}-${docType}.pdf`

    // Mock file size
    const fileSize = docType === "requirements" ? "2.3 MB" : "1.8 MB"

    // Show success toast
    toast({
      title: "Download Complete",
      description: `${fileName} (${fileSize}) has been downloaded successfully.`,
      duration: 3000,
    })

    console.log(`PDF download completed: ${fileName}`)

    setIsDownloading(false)
  }

  const getDocTypeLabel = () => {
    return docType === "requirements" ? "Requirements" : "Project Plan"
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        {isDownloading ? "Generating..." : "Download PDF"}
      </Button>
      <Badge variant="secondary" className="text-xs flex items-center gap-1">
        <FileText className="h-3 w-3" />
        AI Generated
      </Badge>
    </div>
  )
}
