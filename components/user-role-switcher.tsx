"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Shield, Briefcase, Users, Smartphone } from "lucide-react"
import { useUser, switchUserRole } from "@/hooks/use-user"

export function UserRoleSwitcher() {
  const currentUser = useUser()

  const roles = [
    { key: "admin", label: "Admin", icon: Shield, description: "Full system access" },
    { key: "finance", label: "Finance", icon: Briefcase, description: "Finance department access" },
    { key: "hr", label: "HR", icon: Users, description: "HR department access" },
    { key: "tech", label: "Tech", icon: User, description: "Technical team access" },
    { key: "mobile ceo", label: "Mobile CEO", icon: Smartphone, description: "Mobile CEO experience" },
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Role Testing
        </CardTitle>
        <CardDescription>Switch roles to test help overlay visibility</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Current:</span>
            <Badge variant="default">
              {currentUser.role} ({currentUser.department})
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => {
              const Icon = role.icon
              const isActive = currentUser.role === role.key || currentUser.department === role.label

              return (
                <Button
                  key={role.key}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchUserRole(role.key as any)}
                  className="flex items-center gap-2 h-auto p-3"
                  disabled={isActive}
                >
                  <Icon className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">{role.label}</div>
                    <div className="text-xs opacity-70">{role.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
