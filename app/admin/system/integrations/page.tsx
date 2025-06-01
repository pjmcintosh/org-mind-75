"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plug,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Plus,
  RefreshCw,
  Database,
  Cloud,
  Zap,
} from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"

interface Integration {
  id: string
  name: string
  description: string
  category: "database" | "ai" | "analytics" | "communication" | "storage"
  status: "connected" | "disconnected" | "error" | "pending"
  enabled: boolean
  lastSync: string
  apiKey?: string
  endpoint?: string
  version: string
  icon: any
}

export default function IntegrationsPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole)
  const normalizedRole = currentRole.toLowerCase()

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "openai",
      name: "OpenAI",
      description: "GPT models for AI agent processing",
      category: "ai",
      status: "connected",
      enabled: true,
      lastSync: "2024-01-22T15:30:00Z",
      apiKey: "sk-*********************",
      endpoint: "https://api.openai.com/v1",
      version: "v1",
      icon: Zap,
    },
    {
      id: "supabase",
      name: "Supabase",
      description: "PostgreSQL database and authentication",
      category: "database",
      status: "connected",
      enabled: true,
      lastSync: "2024-01-22T15:25:00Z",
      apiKey: "eyJ*********************",
      endpoint: "https://project.supabase.co",
      version: "v1",
      icon: Database,
    },
    {
      id: "vercel-blob",
      name: "Vercel Blob",
      description: "File storage and asset management",
      category: "storage",
      status: "connected",
      enabled: true,
      lastSync: "2024-01-22T15:20:00Z",
      apiKey: "vercel_blob_***********",
      endpoint: "https://blob.vercel-storage.com",
      version: "v1",
      icon: Cloud,
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Claude AI models for advanced reasoning",
      category: "ai",
      status: "disconnected",
      enabled: false,
      lastSync: "2024-01-20T10:15:00Z",
      version: "v1",
      icon: Zap,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team communication and notifications",
      category: "communication",
      status: "pending",
      enabled: false,
      lastSync: "Never",
      version: "v1",
      icon: ExternalLink,
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Redirect unauthorized users
  if (!["admin", "ceo"].includes(normalizedRole)) {
    router.push("/unauthorized")
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "disconnected":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ai":
        return "bg-purple-500/20 text-purple-400 border-purple-400/30"
      case "database":
        return "bg-blue-500/20 text-blue-400 border-blue-400/30"
      case "storage":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "communication":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      case "analytics":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4" />
      case "disconnected":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    if (dateString === "Never") return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredIntegrations =
    selectedCategory === "all"
      ? integrations
      : integrations.filter((integration) => integration.category === selectedCategory)

  const categories = ["all", "ai", "database", "storage", "communication", "analytics"]

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  const testConnection = (id: string) => {
    // Simulate connection test
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, status: "pending", lastSync: new Date().toISOString() } : integration,
      ),
    )

    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((integration) => (integration.id === id ? { ...integration, status: "connected" } : integration)),
      )
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                  <Plug className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">Connected Tools</CardTitle>
                  <CardDescription className="text-blue-300">
                    Manage external platform connections and integrations
                  </CardDescription>
                </div>
              </div>
              <Badge className={`${roleInfo.color} flex items-center gap-2`}>
                <span>{roleInfo.icon}</span>
                {roleInfo.label}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {integrations.filter((i) => i.status === "connected").length}
                  </div>
                  <p className="text-sm text-slate-400">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {integrations.filter((i) => i.status === "disconnected" || i.status === "error").length}
                  </div>
                  <p className="text-sm text-slate-400">Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {integrations.filter((i) => i.status === "pending").length}
                  </div>
                  <p className="text-sm text-slate-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-cyan-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{integrations.filter((i) => i.enabled).length}</div>
                  <p className="text-sm text-slate-400">Enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => {
            const IconComponent = integration.icon
            return (
              <Card key={integration.id} className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                        <IconComponent className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-cyan-400">{integration.name}</CardTitle>
                        <Badge className={getCategoryColor(integration.category)}>{integration.category}</Badge>
                      </div>
                    </div>
                    <Switch checked={integration.enabled} onCheckedChange={() => toggleIntegration(integration.id)} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300">{integration.description}</p>

                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(integration.status)}>
                      {getStatusIcon(integration.status)}
                      <span className="ml-1">{integration.status}</span>
                    </Badge>
                    <span className="text-xs text-slate-400">v{integration.version}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Last Sync:</span>
                      <span className="text-slate-300">{formatDate(integration.lastSync)}</span>
                    </div>

                    {integration.endpoint && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Endpoint:</span>
                        <span className="text-slate-300 truncate ml-2">{integration.endpoint}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testConnection(integration.id)}
                      className="flex-1 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Test
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#0f1a2c] border border-cyan-500/20">
                        <DialogHeader>
                          <DialogTitle className="text-cyan-400">Configure {integration.name}</DialogTitle>
                          <DialogDescription className="text-blue-300">
                            Update connection settings and credentials
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-cyan-300">API Key</Label>
                            <Input
                              type="password"
                              value={integration.apiKey || ""}
                              className="bg-slate-800/50 border-cyan-500/30"
                              placeholder="Enter API key..."
                            />
                          </div>
                          {integration.endpoint && (
                            <div className="space-y-2">
                              <Label className="text-cyan-300">Endpoint URL</Label>
                              <Input
                                value={integration.endpoint}
                                className="bg-slate-800/50 border-cyan-500/30"
                                placeholder="Enter endpoint URL..."
                              />
                            </div>
                          )}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" className="border-cyan-500/30 text-cyan-300">
                              Cancel
                            </Button>
                            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add New Integration */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm border-dashed">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="p-4 rounded-full bg-cyan-500/20 border border-cyan-500/30 w-fit mx-auto">
                <Plus className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-cyan-400 mb-2">Add New Integration</h3>
                <p className="text-slate-300 mb-4">Connect additional services to extend system capabilities</p>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Browse Integrations</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
