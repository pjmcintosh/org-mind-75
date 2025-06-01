"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Bot, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import { type Agent, type ExternalAgentProvider, externalProviders } from "@/config/agents-config"
import { validateExternalAgentConfig, estimateProviderCost } from "@/lib/agents/external/external-agent-manager"

interface AddExternalAgentModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAgent: (agent: Agent) => void
}

export function AddExternalAgentModal({ isOpen, onClose, onAddAgent }: AddExternalAgentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<ExternalAgentProvider | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    department: "",
    accessLevel: "",
    description: "",
    capabilities: [] as string[],
    apiKey: "",
    endpoint: "",
    model: "",
  })

  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    errors: string[]
    warnings: string[]
  } | null>(null)

  const departments = ["Legal", "Human Resources", "Finance", "Marketing", "Engineering", "Operations"]
  const accessLevels = ["Public", "Internal", "Confidential", "Restricted"]

  const availableCapabilities = [
    "Document Analysis",
    "Legal Research",
    "Contract Review",
    "Compliance Checking",
    "Risk Assessment",
    "Data Processing",
    "Report Generation",
    "Natural Language Processing",
    "Translation",
    "Summarization",
  ]

  const handleProviderSelect = (provider: ExternalAgentProvider) => {
    setSelectedProvider(provider)
    setFormData((prev) => ({
      ...prev,
      name: `${provider.name} Agent`,
      title: `${provider.name} Integration`,
    }))
    setCurrentStep(2)
  }

  const handleCapabilityToggle = (capability: string) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(capability)
        ? prev.capabilities.filter((c) => c !== capability)
        : [...prev.capabilities, capability],
    }))
  }

  const handleValidateConfig = () => {
    if (!selectedProvider) return

    const mockConfig = {
      id: `${selectedProvider.id}-${Date.now()}`,
      name: formData.name,
      title: formData.title,
      department: formData.department,
      isExternal: true as const,
      source: selectedProvider.name,
      provider: selectedProvider.id,
      accessLevel: formData.accessLevel,
      enabled: true,
      capabilities: formData.capabilities,
      config: {
        apiKey: formData.apiKey,
        endpoint: formData.endpoint,
        model: formData.model,
      },
      integrationDate: new Date().toISOString(),
      status: "pending" as const,
    }

    const result = validateExternalAgentConfig(mockConfig)
    setValidationResult(result)

    if (result.isValid) {
      setCurrentStep(4)
    }
  }

  const handleSubmit = () => {
    if (!selectedProvider || !validationResult?.isValid) return

    const newAgent: Agent = {
      id: `${selectedProvider.id}-${Date.now()}`,
      name: formData.name,
      title: formData.title,
      department: formData.department,
      isExternal: true,
      source: selectedProvider.name,
      provider: selectedProvider.id,
      accessLevel: formData.accessLevel,
      enabled: true,
      capabilities: formData.capabilities,
      config: {
        apiKey: formData.apiKey,
        endpoint: formData.endpoint,
        model: formData.model,
      },
      integrationDate: new Date().toISOString(),
      status: "active",
      route: `/admin/external/${selectedProvider.id}-${Date.now()}`,
    }

    onAddAgent(newAgent)
    console.log(`External agent onboarded: ${newAgent.name} from ${selectedProvider.name}`)

    // Reset form
    setCurrentStep(1)
    setSelectedProvider(null)
    setFormData({
      name: "",
      title: "",
      department: "",
      accessLevel: "",
      description: "",
      capabilities: [],
      apiKey: "",
      endpoint: "",
      model: "",
    })
    setValidationResult(null)
  }

  const estimatedCost = selectedProvider ? estimateProviderCost(selectedProvider.id, formData.capabilities) : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Add External Agent
          </DialogTitle>
        </DialogHeader>

        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="step-1" disabled={currentStep < 1}>
              Provider
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep < 2}>
              Configuration
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep < 3}>
              Validation
            </TabsTrigger>
            <TabsTrigger value="step-4" disabled={currentStep < 4}>
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Step 1: Provider Selection */}
          <TabsContent value="step-1" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select External Provider</h3>
              <div className="grid grid-cols-2 gap-4">
                {externalProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedProvider?.id === provider.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleProviderSelect(provider)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        {provider.name}
                      </CardTitle>
                      <CardDescription>{provider.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {provider.capabilities.slice(0, 3).map((cap) => (
                          <Badge key={cap} variant="secondary" className="text-xs">
                            {cap}
                          </Badge>
                        ))}
                        {provider.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{provider.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Step 2: Configuration */}
          <TabsContent value="step-2" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., OpenAI Legal Assistant"
                  />
                </div>

                <div>
                  <Label htmlFor="agent-title">Agent Title</Label>
                  <Input
                    id="agent-title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., External Legal Advisor"
                  />
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
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
                  <Label htmlFor="access-level">Access Level</Label>
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

              <div className="space-y-4">
                <div>
                  <Label>Capabilities</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableCapabilities.map((capability) => (
                      <div key={capability} className="flex items-center space-x-2">
                        <Checkbox
                          id={capability}
                          checked={formData.capabilities.includes(capability)}
                          onCheckedChange={() => handleCapabilityToggle(capability)}
                        />
                        <Label htmlFor={capability} className="text-sm">
                          {capability}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold">Integration Settings (Mock)</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData((prev) => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="sk-..."
                  />
                </div>
                <div>
                  <Label htmlFor="endpoint">Endpoint</Label>
                  <Input
                    id="endpoint"
                    value={formData.endpoint}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endpoint: e.target.value }))}
                    placeholder="https://api.provider.com/v1"
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                    placeholder="gpt-4, claude-3, etc."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!formData.name || !formData.department || !formData.accessLevel}
              >
                Continue
              </Button>
            </div>
          </TabsContent>

          {/* Step 3: Validation */}
          <TabsContent value="step-3" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Configuration Validation</h3>

              {estimatedCost && (
                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Estimated Monthly Cost
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">${estimatedCost.monthly.toFixed(2)}/month</div>
                    <p className="text-sm text-muted-foreground">
                      Based on {estimatedCost.requestsPerMonth.toLocaleString()} requests/month
                    </p>
                  </CardContent>
                </Card>
              )}

              {validationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {validationResult.isValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                      Validation Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {validationResult.errors.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Errors:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {validationResult.errors.map((error, index) => (
                            <li key={index} className="text-red-600 text-sm">
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {validationResult.warnings.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-yellow-600 mb-2">Warnings:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {validationResult.warnings.map((warning, index) => (
                            <li key={index} className="text-yellow-600 text-sm">
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {validationResult.isValid && (
                      <div className="text-green-600">✅ Configuration is valid and ready for integration</div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button onClick={handleValidateConfig}>Validate Configuration</Button>
            </div>
          </TabsContent>

          {/* Step 4: Preview */}
          <TabsContent value="step-4" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Agent Preview</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    {formData.name}
                    <Badge variant="secondary">External</Badge>
                  </CardTitle>
                  <CardDescription>{formData.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-semibold">Department</Label>
                      <p className="text-sm">{formData.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Access Level</Label>
                      <p className="text-sm">{formData.accessLevel}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Provider</Label>
                      <p className="text-sm">{selectedProvider?.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Status</Label>
                      <p className="text-sm">Ready for Integration</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold">Capabilities</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.capabilities.map((cap) => (
                        <Badge key={cap} variant="outline" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Back
              </Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Add Agent
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
