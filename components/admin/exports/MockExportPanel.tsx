import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, FileSpreadsheet, FileJson, Clock, CheckCircle } from "lucide-react"

interface MockExportPanelProps {
  canExecuteActions: boolean
  isReadOnlyMode: boolean
}

const MockExportPanel = ({ canExecuteActions, isReadOnlyMode }: MockExportPanelProps) => {
  const mockExports = [
    {
      id: 1,
      name: "Agent Performance Dashboard",
      description: "Comprehensive performance metrics across all agents",
      formats: ["CSV", "PDF", "JSON"],
      status: "Ready",
      statusIcon: CheckCircle,
      statusColor: "text-green-400",
      lastGenerated: "2024-01-15 14:30",
      size: "4.2 MB",
    },
    {
      id: 2,
      name: "Financial Operations Report",
      description: "Monthly FinOps analysis and cost optimization insights",
      formats: ["PDF", "CSV"],
      status: "Generating",
      statusIcon: Clock,
      statusColor: "text-yellow-400",
      lastGenerated: "2024-01-15 14:25",
      size: "2.8 MB",
    },
    {
      id: 3,
      name: "Compliance Audit Trail",
      description: "Complete audit trail for regulatory compliance",
      formats: ["PDF", "JSON"],
      status: "Ready",
      statusIcon: CheckCircle,
      statusColor: "text-green-400",
      lastGenerated: "2024-01-15 13:45",
      size: "1.9 MB",
    },
    {
      id: 4,
      name: "HR Training Analytics",
      description: "AI training completion and effectiveness metrics",
      formats: ["CSV", "PDF"],
      status: "Ready",
      statusIcon: CheckCircle,
      statusColor: "text-green-400",
      lastGenerated: "2024-01-15 12:15",
      size: "1.5 MB",
    },
  ]

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "CSV":
        return FileSpreadsheet
      case "PDF":
        return FileText
      case "JSON":
        return FileJson
      default:
        return FileText
    }
  }

  const getExportTooltip = () => {
    return "Only the CEO may download structured reports. Admins have view-only access."
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Export Queue */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-cyan-400">Export Queue</CardTitle>
          <p className="text-blue-300 text-sm">Monitor export generation status and download availability.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockExports.map((exportItem) => {
              const StatusIcon = exportItem.statusIcon
              return (
                <div key={exportItem.id} className="border border-cyan-500/20 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{exportItem.name}</h4>
                      <p className="text-blue-300 text-sm">{exportItem.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${exportItem.statusColor}`} />
                      <Badge variant="outline" className={`border-cyan-500/30 ${exportItem.statusColor}`}>
                        {exportItem.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-blue-300">
                    <span>Last generated: {exportItem.lastGenerated}</span>
                    <span>Size: {exportItem.size}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Downloadable Files */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-cyan-400">Downloadable Files</CardTitle>
          <p className="text-blue-300 text-sm">Ready-to-download structured documents in multiple formats.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockExports
              .filter((item) => item.status === "Ready")
              .map((exportItem) => (
                <div key={exportItem.id} className="border border-cyan-500/20 rounded-lg p-4">
                  <div className="mb-3">
                    <h4 className="text-white font-medium mb-1">{exportItem.name}</h4>
                    <p className="text-blue-300 text-sm">{exportItem.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exportItem.formats.map((format) => {
                      const FormatIcon = getFormatIcon(format)
                      return (
                        <TooltipProvider key={format}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                                  disabled={!canExecuteActions}
                                >
                                  <FormatIcon className="h-4 w-4 mr-1" />
                                  {format}
                                </Button>
                              </div>
                            </TooltipTrigger>
                            {!canExecuteActions && (
                              <TooltipContent className="bg-slate-900 border border-cyan-500/20">
                                <p className="text-cyan-300">{getExportTooltip()}</p>
                                <p className="text-slate-400 text-xs">Format: {format}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MockExportPanel
