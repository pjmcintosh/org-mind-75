import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AgentProfileHeader from "@/components/agents/shared/AgentProfileHeader"

export default function EvePage() {
  console.log("Refactored: Eve panel layout")

  return (
    <div className="container mx-auto p-4">
      <AgentProfileHeader
        name="Eve"
        role="Observability Agent"
        avatarSrc="/eve-avatar.png"
        fallbackInitials="E"
        description="Eve monitors all agent behavior and flags anomalies for optimal system performance."
        statusBadges={["Active", "Internal Observer", "System Monitoring"]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* System Alerts Panel */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-400 text-lg font-semibold">System Alerts</CardTitle>
            <CardDescription className="text-blue-300">Recent agent issues and anomalies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-white font-medium">Critical: Max response timeout</span>
                </div>
                <span className="text-red-400 text-sm">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-white font-medium">Warning: Ada memory usage high</span>
                </div>
                <span className="text-yellow-400 text-sm">15 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-white font-medium">Info: Ephrya scheduled maintenance</span>
                </div>
                <span className="text-blue-400 text-sm">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agent Trends Panel */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-400 text-lg font-semibold">Agent Trends</CardTitle>
            <CardDescription className="text-blue-300">Performance metrics and behavioral patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <div className="text-violet-400 text-sm font-medium">System Uptime</div>
                <div className="text-white text-xl font-bold">99.8%</div>
                <div className="text-green-400 text-xs">↗ +0.2%</div>
              </div>
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="text-cyan-400 text-sm font-medium">Avg Response</div>
                <div className="text-white text-xl font-bold">1.2s</div>
                <div className="text-green-400 text-xs">↗ -0.3s</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-white text-sm">
                Most Active Agent: <span className="text-cyan-400">Ephrya</span>
              </div>
              <div className="text-white text-sm">
                Peak Usage: <span className="text-violet-400">2:00 PM - 4:00 PM</span>
              </div>
              <div className="text-white text-sm">
                Token Usage: <span className="text-blue-400">847K tokens today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Agent Summary Panel */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-400 text-lg font-semibold">Daily Agent Summary</CardTitle>
            <CardDescription className="text-blue-300">Natural language summary of agent performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-white leading-relaxed">
              Today's agent ecosystem performed exceptionally well with minimal disruptions. Ephrya handled 342 client
              interactions with a 98% satisfaction rate.
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-green-400 font-medium text-sm">Performance Highlights</div>
                <div className="text-white text-sm mt-1">
                  • Zero critical failures
                  <br />• Response times under target
                  <br />• All agents operational
                </div>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="text-yellow-400 font-medium text-sm">Attention Items</div>
                <div className="text-white text-sm mt-1">
                  • Max requires memory optimization
                  <br />• Ada approaching token limits
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Recommendations Panel */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-400 text-lg font-semibold">Performance Recommendations</CardTitle>
            <CardDescription className="text-blue-300">AI-generated optimization suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <div className="text-violet-400 font-medium text-sm">High Priority</div>
                <div className="text-white text-sm mt-1">Implement load balancing for Max during peak hours</div>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-blue-400 font-medium text-sm">Medium Priority</div>
                <div className="text-white text-sm mt-1">Schedule Ada memory cleanup during low-usage periods</div>
              </div>
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="text-cyan-400 font-medium text-sm">Low Priority</div>
                <div className="text-white text-sm mt-1">
                  Update Ephrya's knowledge base with recent client feedback
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* System Health Monitor - Full Width */}
        <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm rounded-xl shadow-cyan-500/10 shadow-sm p-6 col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-cyan-400 text-lg font-semibold">System Health Monitor</CardTitle>
            <CardDescription className="text-blue-300">Real-time resource usage and system metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">CPU Usage</span>
                  <span className="text-cyan-400">67%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Memory</span>
                  <span className="text-violet-400">82%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Network</span>
                  <span className="text-blue-400">45%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pt-4">
              <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="text-green-400 text-sm font-medium">Active Agents</div>
                <div className="text-white text-2xl font-bold">7</div>
              </div>
              <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="text-cyan-400 text-sm font-medium">Requests/min</div>
                <div className="text-white text-2xl font-bold">234</div>
              </div>
              <div className="text-center p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <div className="text-violet-400 text-sm font-medium">Avg Latency</div>
                <div className="text-white text-2xl font-bold">1.2s</div>
              </div>
              <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-blue-400 text-sm font-medium">Error Rate</div>
                <div className="text-white text-2xl font-bold">0.1%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
