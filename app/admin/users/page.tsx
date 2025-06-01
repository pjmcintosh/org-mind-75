"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Edit, Trash2, Shield, Download, UserPlus, GraduationCap } from "lucide-react"
import { useRole } from "@/lib/context/role-context"
import { redirect } from "next/navigation"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Engineering",
    joinDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@company.com",
    role: "analyst",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Analytics",
    joinDate: "2023-08-22",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena.r@company.com",
    role: "client",
    status: "inactive",
    lastLogin: "2024-01-10T14:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "External",
    joinDate: "2023-11-03",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "developer",
    status: "active",
    lastLogin: "2024-01-15T11:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Engineering",
    joinDate: "2023-04-10",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    role: "ceo",
    status: "active",
    lastLogin: "2024-01-15T08:00:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Executive",
    joinDate: "2022-01-15",
  },
  {
    id: "6",
    name: "Lexi Rodriguez",
    email: "lexi.r@company.com",
    role: "lexi",
    status: "active",
    lastLogin: "2024-01-15T08:00:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Compliance",
    joinDate: "2022-01-15",
  },
  {
    id: "7",
    name: "Erik Schmidt",
    email: "erik.s@company.com",
    role: "erik",
    status: "active",
    lastLogin: "2024-01-15T08:00:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Security",
    joinDate: "2022-01-15",
  },
  {
    id: "8",
    name: "Janet Williams",
    email: "janet.w@company.com",
    role: "janet",
    status: "active",
    lastLogin: "2024-01-15T08:00:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "FinOps",
    joinDate: "2022-01-15",
  },
]

export default function UserManagementPage() {
  const { currentRole } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Check authorization
  if (!["admin", "ceo"].includes(currentRole.toLowerCase())) {
    redirect("/unauthorized")
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "ceo":
        return "bg-purple-100 text-purple-800"
      case "developer":
        return "bg-blue-100 text-blue-800"
      case "analyst":
        return "bg-green-100 text-green-800"
      case "client":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-slate-400 mt-2">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{mockUsers.length}</p>
                </div>
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">
                    {mockUsers.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Admins</p>
                  <p className="text-2xl font-bold text-white">{mockUsers.filter((u) => u.role === "admin").length}</p>
                </div>
                <Shield className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Clients</p>
                  <p className="text-2xl font-bold text-white">{mockUsers.filter((u) => u.role === "client").length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Agent Authorities</p>
                  <p className="text-2xl font-bold text-white">
                    {mockUsers.filter((u) => u.role === "lexi" || u.role === "erik" || u.role === "janet").length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="ceo">CEO</option>
                  <option value="developer">Developer</option>
                  <option value="analyst">Analyst</option>
                  <option value="client">Client</option>
                  <option value="lexi">Lexi</option>
                  <option value="erik">Erik</option>
                  <option value="janet">Janet</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Users ({filteredUsers.length})</CardTitle>
            <CardDescription className="text-slate-400">Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-slate-600 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-slate-400">{user.email}</p>
                      <p className="text-xs text-slate-500">{user.department}</p>
                      {(user.role === "lexi" || user.role === "erik" || user.role === "janet") && (
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              user.role === "lexi"
                                ? "bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
                                : user.role === "erik"
                                  ? "bg-red-500/20 text-red-400 border-red-400/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-400/30"
                            }
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            Delegated Agent Authority:{" "}
                            {user.role === "lexi"
                              ? "Lexi (Compliance)"
                              : user.role === "erik"
                                ? "Erik (Security)"
                                : "Janet (FinOps Oversight)"}
                          </Badge>
                        </div>
                      )}
                      {user.role !== "client" && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-3 w-3 text-cyan-400" />
                            <span className="text-xs text-slate-400">AI Training:</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-400/30 text-xs">
                              {Math.floor(Math.random() * 40) + 60}% Complete
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                      <Badge className={`ml-2 ${getStatusBadgeColor(user.status)}`}>{user.status}</Badge>
                    </div>

                    <div className="text-right text-sm text-slate-400">
                      <p>Last login:</p>
                      <p>{new Date(user.lastLogin).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
