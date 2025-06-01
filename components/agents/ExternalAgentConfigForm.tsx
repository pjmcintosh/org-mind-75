"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Shield, Eye, Settings, ExternalLink } from "lucide-react"
import type { ExternalAgentDefinition } from "@/mock/external-agents"

interface ExternalAgentConfigFormProps {
  onSave: (agent: Omit<ExternalAgentDefinition, "id" | "createdAt">) => void
  onCancel: () => void
}

export function ExternalAgentConfigForm({ onSave, onCancel }: ExternalAgentConfigFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    sourceProvider: "" as ExternalAgentDefinition["sourceProvider"] | "",
    department: "",
    accessLevel: "",
    scopeOfResponsibility: [] as string[],
    enabled: true,
    description: "",
    governanceSettings: {
      monitoredByEve: true,
      isolatedAccess: true,
      globalToolsAccess: false,
      tokenBudget: 5000,
      usageRestrictions: [] as string[],
    },
  })

  const [scopeInput, setScopeInput] = useState("")
  const [restrictionInput, setRestrictionInput] = useState("")

  const providers = ["OpenAI", "AWS", "Microsoft", "Google", "Anthropic", "Custom"]
  const departments = ["Legal", "Finance", "Human Resources", "Marketing", "Engineering", "Operations", "Strategy"]
  const accessLevels = ["Public", "Internal", "Confidential", "Restricted", "Internal Legal", "Finance Team", "HR Team"]

  const handleAddScope = () => {
    if (scopeInput.trim() && !formData.scopeOfResponsibility.includes(scopeInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        scopeOfResponsibility: [...prev.scopeOfResponsibility, scopeInput.trim()],
      }))
      setScopeInput("")
    }
  }

  const handleRemoveScope = (scope: string) => {
    setFormData((prev) => ({
      ...prev,
      scopeOfResponsibility: prev.scopeOfResponsibility.filter((s) => s !== scope),
    }))
  }

  const handleAddRestriction = () => {
    if (restrictionInput.trim() && !formData.governanceSettings.usageRestrictions.includes(restrictionInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        governanceSettings: {
          ...prev.governanceSettings,
          usageRestrictions: [...prev.governanceSettings.usageRestrictions, restrictionInput.trim()],
        },
      }))
      setRestrictionInput("")
    }
  }

  const handleRemoveRestriction = (restriction: string) => {
    setFormData((prev) => ({
      ...prev,
      governanceSettings: {
        ...prev.governanceSettings,
        usageRestrictions: prev.governanceSettings.usageRestrictions.filter((r) => r !== restriction),
      },
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.sourceProvider || !formData.department || !formData.accessLevel) {
      alert("Please fill in all required fields")
      return
    }

    const agentData: Omit<ExternalAgentDefinition, "id" | "createdAt"> = {
      name: formData.name,
      sourceProvider: formData.sourceProvider as ExternalAgentDefinition["sourceProvider"],
      department: formData.department,
      accessLevel: formData.accessLevel,
      scopeOfResponsibility: formData.scopeOfResponsibility,
      enabled: formData.enabled,
      createdBy: "admin", // In real app, get from auth context
      approvalStatus: "pending",
      governanceSettings: formData.governanceSettings,
      route: `/admin/${formData.sourceProvider.toLowerCase()}-${formData.name.toLowerCase().replace(/\s+/g, "-")}`,
      avatar: "🤖",
      description: formData.description,
    }

    onSave(agentData)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ExternalLink className="h-6 w-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold">Add External Agent</h2>
          <p className="text-muted-foreground">Configure a third-party AI agent with governance controls</p>
        </div>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Basic Information
          </CardTitle>
          <CardDescription>Define the agent's identity and organizational placement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Agent Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., OpenAI Legal Advisor"
              />
            </div>
            <div>
              <Label htmlFor="provider">Source Provider *</Label>
              <Select
                value={formData.sourceProvider}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    sourceProvider: value as ExternalAgentDefinition["sourceProvider"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accessLevel">Access Level *</Label>
              <Select
                value={formData.accessLevel}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, accessLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the agent's purpose and capabilities"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Scope of Responsibility */}
      <Card>
        <CardHeader>
          <CardTitle>Scope of Responsibility</CardTitle>
          <CardDescription>Define what tasks and areas this agent can handle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={scopeInput}
              onChange={(e) => setScopeInput(e.target.value)}
              placeholder="e.g., Contract Analysis"
              onKeyPress={(e) => e.key === "Enter" && handleAddScope()}
            />
            <Button onClick={handleAddScope} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.scopeOfResponsibility.map((scope) => (
              <Badge
                key={scope}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveScope(scope)}
              >
                {scope} ×
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Governance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-600" />
            Governance & Security
          </CardTitle>
          <CardDescription>Configure monitoring, access controls, and usage restrictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monitoring */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <Label>Eve Monitoring</Label>
              </div>
              <p className="text-sm text-muted-foreground">Allow Eve to monitor usage, costs, and performance</p>
            </div>
            <Switch
              checked={formData.governanceSettings.monitoredByEve}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  governanceSettings: { ...prev.governanceSettings, monitoredByEve: checked },
                }))
              }
            />
          </div>

          <Separator />

          {/* Access Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Isolated Access</Label>
                <p className="text-sm text-muted-foreground">Restrict agent to its designated scope only</p>
              </div>
              <Switch
                checked={formData.governanceSettings.isolatedAccess}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    governanceSettings: { ...prev.governanceSettings, isolatedAccess: checked },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <Label>Global Tools Access</Label>
                </div>
                <p className="text-sm text-muted-foreground">Allow access to system-wide administrative tools</p>
              </div>
              <Switch
                checked={formData.governanceSettings.globalToolsAccess}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    governanceSettings: { ...prev.governanceSettings, globalToolsAccess: checked },
                  }))
                }
              />
            </div>
          </div>

          <Separator />

          {/* Token Budget */}
          <div>
            <Label htmlFor="tokenBudget">Monthly Token Budget</Label>
            <Input
              id="tokenBudget"
              type="number"
              value={formData.governanceSettings.tokenBudget}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  governanceSettings: { ...prev.governanceSettings, tokenBudget: Number.parseInt(e.target.value) || 0 },
                }))
              }
              placeholder="5000"
            />
            <p className="text-sm text-muted-foreground mt-1">Maximum tokens per month (0 = unlimited)</p>
          </div>

          {/* Usage Restrictions */}
          <div>
            <Label>Usage Restrictions</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={restrictionInput}
                onChange={(e) => setRestrictionInput(e.target.value)}
                placeholder="e.g., No PII processing"
                onKeyPress={(e) => e.key === "Enter" && handleAddRestriction()}
              />
              <Button onClick={handleAddRestriction} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.governanceSettings.usageRestrictions.map((restriction) => (
                <Badge
                  key={restriction}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleRemoveRestriction(restriction)}
                >
                  {restriction} ×
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Status</CardTitle>
          <CardDescription>Control whether the agent is active upon creation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable Agent</Label>
              <p className="text-sm text-muted-foreground">Agent will be active and available for use</p>
            </div>
            <Switch
              checked={formData.enabled}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, enabled: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          Add External Agent
        </Button>
      </div>
    </div>
  )
}
