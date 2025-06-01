"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Users, Plus, Edit, Trash2, Eye, Settings, UserCheck, Lock } from "lucide-react"
import { useRole, getRoleInfo } from "@/lib/context/role-context"
import { humanLabels } from "@/lib/humanLabels"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  displayName: string
  description: string
  entityType?: "AGENT" | "OBSERVER" | "PARTNER" | "ORCHESTRATOR" | "SPECIALIST"
  permissions: string[]
  userCount: number
  isSystem: boolean
  color: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  lastLogin: string
}

// Safe entity type badge component
function SafeRoleEntityBadge({ entityType }: { entityType?: string }) {
  if (!entityType) {
    return <Badge className="bg-slate-500/20 text-slate-400 border-slate-400/30">Unknown</Badge>
  }

  const entityTypeMap: Record<string, { label: string; color: string }> = {
    AGENT: { label: "Team Member", color: "cyan" },
    OBSERVER: { label: "Silent Watcher", color: "yellow" },
    PARTNER: { label: "Outside Collaborator", color: "green" },
    ORCHESTRATOR: { label: "Coordinator", color: "purple" },
    SPECIALIST: { label: "Domain Expert", color: "blue" },
  }

  const entity = entityTypeMap[entityType] || { label: "Unknown", color: "slate" }

  return (
    <Badge className={`bg-${entity.color}-500/20 text-${entity.color}-400 border-${entity.color}-400/30`}>
      {entity.label}
    </Badge>
  )
}

export default function RoleManagerPage() {
  const router = useRouter()
  const { currentRole } = useRole()
  const roleInfo = getRoleInfo(currentRole) || { color: "bg-slate-500/20 text-slate-400", icon: "👤", label: "Unknown" }
  const normalizedRole = currentRole?.toLowerCase() || ""

  const [permissions] = useState<Permission[]>([
    {
      id: "read_dashboard",
      name: "Read Dashboard",
      description: "View dashboard and analytics",
      category: "Dashboard",
    },
    { id: "read_projects", name: "Read Projects", description: "View project information", category: "Projects" },
    { id: "write_projects", name: "Write Projects", description: "Create and edit projects", category: "Projects" },
    { id: "delete_projects", name: "Delete Projects", description: "Delete projects", category: "Projects" },
    { id: "read_agents", name: "Read Agents", description: "View agent information", category: "Agents" },
    { id: "write_agents", name: "Write Agents", description: "Configure agents", category: "Agents" },
    { id: "read_users", name: "Read Users", description: "View user information", category: "Users" },
    { id: "write_users", name: "Write Users", description: "Create and edit users", category: "Users" },
    { id: "admin_system", name: "System Admin", description: "Full system administration", category: "System" },
    { id: "export_data", name: "Export Data", description: "Export system data", category: "Data" },
    {
      id: "security_audit",
      name: "Security Audit",
      description: "Access security logs and audits",
      category: "Security",
    },
  ])

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "admin",
      displayName: "Administrator",
      description: "Full system access and administration",
      entityType: "AGENT",
      permissions: [
        "admin_system",
        "read_dashboard",
        "read_projects",
        "write_projects",
        "delete_projects",
        "read_agents",
        "write_agents",
        "read_users",
        "write_users",
        "export_data",
        "security_audit",
      ],
      userCount: 3,
      isSystem: true,
      color: "bg-red-500/20 text-red-400 border-red-400/30",
    },
    {
      id: "ceo",
      name: "ceo",
      displayName: "CEO",
      description: "Executive access with strategic oversight",
      entityType: "AGENT",
      permissions: ["read_dashboard", "read_projects", "read_agents", "read_users", "export_data", "security_audit"],
      userCount: 1,
      isSystem: true,
      color: "bg-purple-500/20 text-purple-400 border-purple-400/30",
    },
    {
      id: "developer",
      name: "developer",
      displayName: "Developer",
      description: "Technical development and agent configuration",
      entityType: "AGENT",
      permissions: ["read_dashboard", "read_projects", "read_agents", "write_agents"],
      userCount: 5,
      isSystem: true,
      color: "bg-blue-500/20 text-blue-400 border-blue-400/30",
    },
    {
      id: "analyst",
      name: "analyst",
      displayName: "Analyst",
      description: "Data analysis and reporting access",
      entityType: "AGENT",
      permissions: ["read_dashboard", "read_projects", "export_data"],
      userCount: 8,
      isSystem: true,
      color: "bg-green-500/20 text-green-400 border-green-400/30",
    },
    {
      id: "client",
      name: "client",
      displayName: "Client",
      description: "Client portal access for project submissions",
      entityType: "PARTNER",
      permissions: ["read_projects"],
      userCount: 24,
      isSystem: true,
      color: "bg-cyan-500/20 text-cyan-400 border-cyan-400/30",
    },
    {
      id: "lexi",
      name: "lexi",
      displayName: "Lexi",
      description: "Compliance Officer",
      entityType: "OBSERVER",
      permissions: ["read_dashboard"],
      userCount: 1,
      isSystem: false,
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
    },
    {
      id: "erik",
      name: "erik",
      displayName: "Erik",
      description: "Security Agent",
      entityType: "OBSERVER",
      permissions: ["read_dashboard"],
      userCount: 1,
      isSystem: false,
      color: "bg-orange-500/20 text-orange-400 border-orange-400/30",
    },
    {
      id: "janet",
      name: "janet",
      displayName: "Janet",
      description: "FinOps Agent - Financial Operations and Cost Management",
      entityType: "OBSERVER",
      permissions: ["read_dashboard", "export_data"],
      userCount: 1,
      isSystem: false,
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
    },
    {
      id: "shandry",
      name: "shandry",
      displayName: "Shandry",
      description: "HR Agent",
      entityType: "OBSERVER",
      permissions: ["read_dashboard"],
      userCount: 1,
      isSystem: false,
      color: "bg-purple-500/20 text-purple-400 border-purple-400/30",
    },
  ])

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Admin",
      email: "john@company.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-22T10:30:00Z",
    },
    {
      id: "2",
      name: "Sarah CEO",
      email: "sarah@company.com",
      role: "ceo",
      status: "active",
      lastLogin: "2024-01-22T09:15:00Z",
    },
    {
      id: "3",
      name: "Mike Dev",
      email: "mike@company.com",
      role: "developer",
      status: "active",
      lastLogin: "2024-01-22T11:45:00Z",
    },
    {
      id: "4",
      name: "Lisa Analyst",
      email: "lisa@company.com",
      role: "analyst",
      status: "active",
      lastLogin: "2024-01-22T08:20:00Z",
    },
    {
      id: "5",
      name: "Bob Client",
      email: "bob@client.com",
      role: "client",
      status: "active",
      lastLogin: "2024-01-21T16:30:00Z",
    },
  ])

  const [selectedRole, setSelectedRole] = useState<string>("admin")
  const currentRoleData = roles.find((r) => r.id === selectedRole)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-400/30"
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-400/30"
      case "pending":
        return "bg-orange-500/20 text-orange-400 border-orange-400/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-400/30"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  // Redirect non-admin users
  if (normalizedRole !== "admin") {
    router.push("/unauthorized")
    return null
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
                  <Shield className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-cyan-400">
                    {humanLabels?.navigation?.roleManager || "Who Does What"}
                  </CardTitle>
                  <CardDescription className="text-blue-300">
                    This view helps you understand which team members, observers, and collaborators have access to what
                    — and what they can actually do.
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

        {/* Role Type Legend */}
        <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 text-sm text-blue-300">
              <p>
                <strong>Team Members</strong> can initiate and execute workflows.
              </p>
              <p>
                <strong>Silent Watchers</strong> can observe and report on activity, but never act.
              </p>
              <p>
                <strong>Outside Collaborators</strong> interact with workflows through scoped access only.
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Role List */}
              <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyan-400 flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Roles
                    </CardTitle>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Role
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? "border-cyan-500/50 bg-cyan-500/10"
                          : "border-cyan-500/20 hover:border-cyan-500/30"
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{role.displayName}</span>
                        <div className="flex items-center gap-2">
                          <SafeRoleEntityBadge entityType={role.entityType} />
                          <Badge className={role.color || "bg-slate-500/20 text-slate-400"}>
                            {role.userCount} users
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">{role.description}</p>
                      {role.isSystem && (
                        <Badge className="mt-2 bg-slate-500/20 text-slate-400 border-slate-400/30">System Role</Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Role Configuration */}
              <div className="lg:col-span-2">
                {currentRoleData && (
                  <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-cyan-400 flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            {currentRoleData.displayName} Configuration
                          </CardTitle>
                          <CardDescription className="text-blue-300">
                            Manage permissions and settings for this role
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-300">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          {!currentRoleData.isSystem && (
                            <Button variant="outline" size="sm" className="border-red-500/30 text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-cyan-300">Role Name</Label>
                            <Input
                              value={currentRoleData.displayName}
                              className="bg-slate-800/50 border-cyan-500/30"
                              disabled={currentRoleData.isSystem}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-cyan-300">Description</Label>
                            <Input
                              value={currentRoleData.description}
                              className="bg-slate-800/50 border-cyan-500/30"
                              disabled={currentRoleData.isSystem}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-cyan-500/20 bg-slate-800/30">
                            <div className="text-2xl font-bold text-white">{currentRoleData.userCount}</div>
                            <p className="text-sm text-slate-400">Users with this role</p>
                          </div>
                          <div className="p-4 rounded-lg border border-cyan-500/20 bg-slate-800/30">
                            <div className="text-2xl font-bold text-white">{currentRoleData.permissions.length}</div>
                            <p className="text-sm text-slate-400">Assigned permissions</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-cyan-300 font-medium">Permissions</h3>
                        <div className="space-y-4">
                          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                            <div key={category} className="space-y-2">
                              <h4 className="text-sm font-medium text-blue-300">{category}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {categoryPermissions.map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-center justify-between p-2 rounded border border-cyan-500/20"
                                  >
                                    <div>
                                      <span className="text-white text-sm">{permission.name}</span>
                                      <p className="text-xs text-slate-400">{permission.description}</p>
                                    </div>
                                    <Switch
                                      checked={currentRoleData.permissions.includes(permission.id)}
                                      disabled={currentRoleData.isSystem}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Permission Management
                  </CardTitle>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Permission
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="text-cyan-300 font-medium border-b border-cyan-500/20 pb-2">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryPermissions.map((permission) => (
                          <Card key={permission.id} className="bg-slate-800/30 border border-cyan-500/20">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-white">{permission.name}</h4>
                                <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-300">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-xs text-slate-400">{permission.description}</p>
                              <div className="mt-2 text-xs text-blue-300">
                                Used by {roles.filter((r) => r.permissions.includes(permission.id)).length} roles
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-cyan-500/20">
                      <TableHead className="text-cyan-300">Name</TableHead>
                      <TableHead className="text-cyan-300">Role Type</TableHead>
                      <TableHead className="text-cyan-300">Status</TableHead>
                      <TableHead className="text-cyan-300">Last Login</TableHead>
                      <TableHead className="text-cyan-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-cyan-500/10">
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-slate-400">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={roles.find((r) => r.id === user.role)?.color || "bg-slate-500/20 text-slate-400"}
                          >
                            {roles.find((r) => r.id === user.role)?.displayName || user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{formatDate(user.lastLogin)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-300">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-300">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
