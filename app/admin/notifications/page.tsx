"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  BellRing,
  Check,
  X,
  Settings,
  AlertTriangle,
  Info,
  CheckCircle,
  Mail,
  Smartphone,
  Clock,
} from "lucide-react"
import { useRole } from "@/lib/context/role-context"
import { redirect } from "next/navigation"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "Agent Ada Performance Alert",
    message: "Response time exceeded threshold for the last 3 requests",
    type: "warning",
    category: "performance",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    actionRequired: true,
  },
  {
    id: "2",
    title: "New Project Submission",
    message: "Project 'Website Redesign' submitted by client@company.com",
    type: "info",
    category: "project",
    timestamp: "2024-01-15T09:45:00Z",
    read: false,
    actionRequired: true,
  },
  {
    id: "3",
    title: "Security Scan Completed",
    message: "Weekly security scan completed successfully - no threats detected",
    type: "success",
    category: "security",
    timestamp: "2024-01-15T08:00:00Z",
    read: true,
    actionRequired: false,
  },
  {
    id: "4",
    title: "System Maintenance Scheduled",
    message: "Scheduled maintenance window: Jan 20, 2024 2:00 AM - 4:00 AM UTC",
    type: "info",
    category: "system",
    timestamp: "2024-01-14T16:00:00Z",
    read: true,
    actionRequired: false,
  },
  {
    id: "5",
    title: "Agent Bob Offline",
    message: "Agent Bob has been offline for 15 minutes - investigating",
    type: "error",
    category: "agent",
    timestamp: "2024-01-14T14:30:00Z",
    read: false,
    actionRequired: true,
  },
]

const notificationSettings = {
  email: {
    performance: true,
    security: true,
    projects: false,
    system: true,
    agents: true,
  },
  push: {
    performance: true,
    security: true,
    projects: true,
    system: false,
    agents: true,
  },
  frequency: "immediate", // immediate, hourly, daily
}

export default function NotificationsPage() {
  const { currentRole } = useRole()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [settings, setSettings] = useState(notificationSettings)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Check authorization
  if (!["admin", "ceo", "developer", "analyst"].includes(currentRole.toLowerCase())) {
    redirect("/unauthorized")
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory
    const matchesReadStatus = !showUnreadOnly || !notification.read
    return matchesCategory && matchesReadStatus
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Bell className="h-4 w-4 text-slate-400" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications Center</h1>
            <p className="text-slate-400 mt-2">Manage system alerts and communication preferences</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Notifications</p>
                  <p className="text-2xl font-bold text-white">{notifications.length}</p>
                </div>
                <Bell className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Unread</p>
                  <p className="text-2xl font-bold text-yellow-400">{unreadCount}</p>
                </div>
                <BellRing className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Action Required</p>
                  <p className="text-2xl font-bold text-red-400">{actionRequiredCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Read Today</p>
                  <p className="text-2xl font-bold text-green-400">{notifications.filter((n) => n.read).length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                    >
                      <option value="all">All Categories</option>
                      <option value="performance">Performance</option>
                      <option value="security">Security</option>
                      <option value="project">Projects</option>
                      <option value="system">System</option>
                      <option value="agent">Agents</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={showUnreadOnly} onCheckedChange={setShowUnreadOnly} />
                    <span className="text-slate-300 text-sm">Show unread only</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications List */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Notifications ({filteredNotifications.length})</CardTitle>
                <CardDescription className="text-slate-400">System alerts and important updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? "bg-slate-700 border-slate-600" : "bg-slate-600 border-slate-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          {getTypeIcon(notification.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-medium ${notification.read ? "text-slate-300" : "text-white"}`}>
                                {notification.title}
                              </h3>
                              {!notification.read && <Badge className="bg-cyan-600 text-white text-xs">New</Badge>}
                              {notification.actionRequired && (
                                <Badge className="bg-red-600 text-white text-xs">Action Required</Badge>
                              )}
                            </div>
                            <p className={`text-sm ${notification.read ? "text-slate-400" : "text-slate-300"}`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge className={getTypeBadgeColor(notification.type)}>{notification.type}</Badge>
                              <Badge variant="outline" className="border-slate-600 text-slate-400">
                                {notification.category}
                              </Badge>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(notification.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Email Notifications */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure which events trigger email notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.email).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-white capitalize">{category}</span>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            email: { ...prev.email, [category]: checked },
                          }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Push Notifications */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Configure which events trigger push notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.push).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-white capitalize">{category}</span>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            push: { ...prev.push, [category]: checked },
                          }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Notification Frequency */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Frequency</CardTitle>
                <CardDescription className="text-slate-400">
                  Choose how often you receive notification summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["immediate", "hourly", "daily"].map((frequency) => (
                    <div key={frequency} className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={frequency}
                        name="frequency"
                        value={frequency}
                        checked={settings.frequency === frequency}
                        onChange={(e) => setSettings((prev) => ({ ...prev, frequency: e.target.value }))}
                        className="text-cyan-400"
                      />
                      <label htmlFor={frequency} className="text-white capitalize">
                        {frequency}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
