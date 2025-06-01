import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Bot, Calendar, Download } from "lucide-react"

const ReportSummaryCards = () => {
  const summaryData = {
    totalReports: 247,
    agentGenerated: 198,
    manualReports: 49,
    last7Days: 23,
    csvExports: 156,
    pdfExports: 67,
    jsonExports: 24,
  }

  const agentPercentage = Math.round((summaryData.agentGenerated / summaryData.totalReports) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Reports */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cyan-400">Total Reports</CardTitle>
          <FileText className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{summaryData.totalReports}</div>
          <p className="text-xs text-blue-300">All time generated</p>
        </CardContent>
      </Card>

      {/* Agent Generated */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cyan-400">Agent Generated</CardTitle>
          <Bot className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{summaryData.agentGenerated}</div>
          <p className="text-xs text-blue-300">{agentPercentage}% of all reports</p>
        </CardContent>
      </Card>

      {/* Last 7 Days */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cyan-400">Recent Activity</CardTitle>
          <Calendar className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{summaryData.last7Days}</div>
          <p className="text-xs text-blue-300">Reports last 7 days</p>
        </CardContent>
      </Card>

      {/* Export Formats */}
      <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-cyan-400">Export Distribution</CardTitle>
          <Download className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">CSV:</span>
              <span className="text-white">{summaryData.csvExports}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">PDF:</span>
              <span className="text-white">{summaryData.pdfExports}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-300">JSON:</span>
              <span className="text-white">{summaryData.jsonExports}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportSummaryCards
