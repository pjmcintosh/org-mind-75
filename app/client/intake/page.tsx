"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, User, Building, Target, Bot, HelpCircle, Info } from "lucide-react"
import HelpToggle from "@/components/overlays/help-toggle"

interface FormData {
  fullName: string
  email: string
  organizationName: string
  orgSize: string
  industry: string
  projectCategory: string
  timeline: string
  budget: string
  teamSize: string
  aiSolutionType: string
  aiPrimaryUser: string
  aiGoal: string
}

interface FormErrors {
  fullName?: string
  email?: string
  organizationName?: string
  orgSize?: string
  industry?: string
  projectCategory?: string
  timeline?: string
  budget?: string
  teamSize?: string
  aiSolutionType?: string
  aiPrimaryUser?: string
  aiGoal?: string
}

export default function ClientIntakePage() {
  console.log("Loaded: ClientIntakePage")

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    organizationName: "",
    orgSize: "",
    industry: "",
    projectCategory: "",
    timeline: "",
    budget: "",
    teamSize: "",
    aiSolutionType: "",
    aiPrimaryUser: "",
    aiGoal: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValid, setIsValid] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const router = useRouter()

  // Validation functions
  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return "Full name is required"
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Full name must contain only letters and spaces"
    return undefined
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const validateOrganizationName = (name: string): string | undefined => {
    if (!name.trim()) return "Organization name is required"
    if (name.trim().length < 2) return "Organization name must be at least 2 characters long"
    return undefined
  }

  const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value) return `${fieldName} is required`
    return undefined
  }

  const validateAiGoal = (goal: string): string | undefined => {
    if (!goal.trim()) return "AI goal is required"
    if (goal.trim().length < 30) return "Please provide at least 30 characters describing your AI goal"
    return undefined
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors: FormErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      organizationName: validateOrganizationName(formData.organizationName),
      orgSize: validateRequired(formData.orgSize, "Organization size"),
      industry: validateRequired(formData.industry, "Industry"),
      projectCategory: validateRequired(formData.projectCategory, "Project category"),
      timeline: validateRequired(formData.timeline, "Timeline"),
      budget: validateRequired(formData.budget, "Budget"),
      teamSize: validateRequired(formData.teamSize, "Team size"),
      aiSolutionType: validateRequired(formData.aiSolutionType, "AI solution type"),
      aiPrimaryUser: validateRequired(formData.aiPrimaryUser, "AI primary user"),
      aiGoal: validateAiGoal(formData.aiGoal),
    }

    setErrors(newErrors)

    // Check if form is valid
    const hasErrors = Object.values(newErrors).some((error) => error !== undefined)
    setIsValid(!hasErrors)
  }

  // Validate on form data change
  useEffect(() => {
    validateForm()
  }, [formData])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContinue = () => {
    if (isValid) {
      // Navigate to review summary page
      router.push("/client/review-summary")
    }
  }

  return (
    <div className="px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Help Overlay - positioned at top */}
        <div className="flex justify-end mb-4">
          <HelpToggle
            title="Intake Form Help"
            content={
              <div>
                This intake form collects key project or service details to get you started.
                <br />
                <br />
                <strong>Key Tips:</strong>
                <ul className="list-disc ml-4 mt-2">
                  <li>Include a clear project title</li>
                  <li>Describe your goals or problem</li>
                  <li>Optional: attach supporting documentation</li>
                  <li>All required fields must be completed</li>
                </ul>
              </div>
            }
          />
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Project Intake</h1>
            <p className="text-blue-300">Please provide your project details to get started</p>
          </div>

          {/* Show Help Toggle Button */}
          <Button
            variant={showHelp ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
          >
            <HelpCircle className="h-4 w-4" />
            {showHelp ? "Hide Help" : "Show Help"}
          </Button>
        </div>

        {/* Contact Information Section */}
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 text-white relative shadow-cyan-500/10 shadow-md">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <User className="h-5 w-5" />
              Contact Information
              {showHelp && (
                <div className="bg-cyan-600 text-white rounded-full p-1 shadow-lg animate-pulse cursor-help">
                  <Info className="h-3 w-3" />
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-blue-300">Tell us about yourself and how to reach you</CardDescription>
          </CardHeader>
          {showHelp && (
            <div className="absolute top-2 right-2 z-10 bg-[#0f1a2c]/95 border border-cyan-500/20 rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="text-sm font-semibold mb-1 text-cyan-400">How this helps</h4>
              <p className="text-sm text-blue-300">
                Bob uses this info to properly route your project and ensure accountability.
              </p>
            </div>
          )}
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={`bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 ${
                    errors.fullName ? "border-red-400 focus:ring-red-500" : ""
                  }`}
                />
                {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={`bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 ${
                    errors.email ? "border-red-400 focus:ring-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>
          </CardContent>
        </div>

        {/* Organization Information Section */}
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 text-white relative shadow-cyan-500/10 shadow-md">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Building className="h-5 w-5" />
              Organization Information
              {showHelp && (
                <div className="bg-cyan-600 text-white rounded-full p-1 shadow-lg animate-pulse cursor-help">
                  <Info className="h-3 w-3" />
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-blue-300">Provide details about your organization</CardDescription>
          </CardHeader>
          {showHelp && (
            <div className="absolute top-2 right-2 z-10 bg-[#0f1a2c]/95 border border-cyan-500/20 rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="text-sm font-semibold mb-1 text-cyan-400">How this helps</h4>
              <p className="text-sm text-blue-300">Org size and industry help Ada estimate planning complexity.</p>
            </div>
          )}
          <CardContent className="p-0 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName" className="text-white">
                Organization Name *
              </Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                placeholder="Enter your organization name"
                className={`bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 ${
                  errors.organizationName ? "border-red-400 focus:ring-red-500" : ""
                }`}
              />
              {errors.organizationName && <p className="text-sm text-red-400">{errors.organizationName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgSize" className="text-white">
                  Organization Size *
                </Label>
                <Select value={formData.orgSize} onValueChange={(value) => handleInputChange("orgSize", value)}>
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${errors.orgSize ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select organization size" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="<10" className="text-white hover:bg-slate-700">
                      Less than 10 employees
                    </SelectItem>
                    <SelectItem value="10-50" className="text-white hover:bg-slate-700">
                      10-50 employees
                    </SelectItem>
                    <SelectItem value="51-200" className="text-white hover:bg-slate-700">
                      51-200 employees
                    </SelectItem>
                    <SelectItem value="201-1000" className="text-white hover:bg-slate-700">
                      201-1000 employees
                    </SelectItem>
                    <SelectItem value="1000+" className="text-white hover:bg-slate-700">
                      1000+ employees
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.orgSize && <p className="text-sm text-red-400">{errors.orgSize}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry" className="text-white">
                  Industry *
                </Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${errors.industry ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="government" className="text-white hover:bg-slate-700">
                      Government
                    </SelectItem>
                    <SelectItem value="healthcare" className="text-white hover:bg-slate-700">
                      Healthcare
                    </SelectItem>
                    <SelectItem value="education" className="text-white hover:bg-slate-700">
                      Education
                    </SelectItem>
                    <SelectItem value="finance" className="text-white hover:bg-slate-700">
                      Finance
                    </SelectItem>
                    <SelectItem value="technology" className="text-white hover:bg-slate-700">
                      Technology
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-sm text-red-400">{errors.industry}</p>}
              </div>
            </div>
          </CardContent>
        </div>

        {/* Project Details Section */}
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 text-white relative shadow-cyan-500/10 shadow-md">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Target className="h-5 w-5" />
              Project Details
              {showHelp && (
                <div className="bg-cyan-600 text-white rounded-full p-1 shadow-lg animate-pulse cursor-help">
                  <Info className="h-3 w-3" />
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-blue-300">
              Describe your project requirements and constraints
            </CardDescription>
          </CardHeader>
          {showHelp && (
            <div className="absolute top-2 right-2 z-10 bg-[#0f1a2c]/95 border border-cyan-500/20 rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="text-sm font-semibold mb-1 text-cyan-400">How this helps</h4>
              <p className="text-sm text-blue-300">Timeline and team size influence Max's prototype scope.</p>
            </div>
          )}
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectCategory" className="text-white">
                  Project Category *
                </Label>
                <Select
                  value={formData.projectCategory}
                  onValueChange={(value) => handleInputChange("projectCategory", value)}
                >
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${
                      errors.projectCategory ? "border-red-400" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="internal-ops" className="text-white hover:bg-slate-700">
                      Internal Operations
                    </SelectItem>
                    <SelectItem value="customer-facing" className="text-white hover:bg-slate-700">
                      Customer-Facing
                    </SelectItem>
                    <SelectItem value="compliance" className="text-white hover:bg-slate-700">
                      Compliance
                    </SelectItem>
                    <SelectItem value="research" className="text-white hover:bg-slate-700">
                      Research
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectCategory && <p className="text-sm text-red-400">{errors.projectCategory}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-white">
                  Timeline *
                </Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${errors.timeline ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="<30-days" className="text-white hover:bg-slate-700">
                      Less than 30 days
                    </SelectItem>
                    <SelectItem value="1-3-months" className="text-white hover:bg-slate-700">
                      1-3 months
                    </SelectItem>
                    <SelectItem value="3-6-months" className="text-white hover:bg-slate-700">
                      3-6 months
                    </SelectItem>
                    <SelectItem value="6+-months" className="text-white hover:bg-slate-700">
                      6+ months
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.timeline && <p className="text-sm text-red-400">{errors.timeline}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white">
                  Budget Range *
                </Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${errors.budget ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="<10k" className="text-white hover:bg-slate-700">
                      Less than $10,000
                    </SelectItem>
                    <SelectItem value="10-50k" className="text-white hover:bg-slate-700">
                      $10,000 - $50,000
                    </SelectItem>
                    <SelectItem value="50-200k" className="text-white hover:bg-slate-700">
                      $50,000 - $200,000
                    </SelectItem>
                    <SelectItem value="200-500k" className="text-white hover:bg-slate-700">
                      $200,000 - $500,000
                    </SelectItem>
                    <SelectItem value=">500k" className="text-white hover:bg-slate-700">
                      More than $500,000
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.budget && <p className="text-sm text-red-400">{errors.budget}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize" className="text-white">
                  Team Size *
                </Label>
                <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${errors.teamSize ? "border-red-400" : ""}`}
                  >
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="1" className="text-white hover:bg-slate-700">
                      1 person
                    </SelectItem>
                    <SelectItem value="2-5" className="text-white hover:bg-slate-700">
                      2-5 people
                    </SelectItem>
                    <SelectItem value="6-10" className="text-white hover:bg-slate-700">
                      6-10 people
                    </SelectItem>
                    <SelectItem value="10+" className="text-white hover:bg-slate-700">
                      10+ people
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.teamSize && <p className="text-sm text-red-400">{errors.teamSize}</p>}
              </div>
            </div>
          </CardContent>
        </div>

        {/* AI Opportunity Description Section */}
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 text-white relative shadow-cyan-500/10 shadow-md">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Bot className="h-5 w-5" />
              AI Opportunity Description
              {showHelp && (
                <div className="bg-cyan-600 text-white rounded-full p-1 shadow-lg animate-pulse cursor-help">
                  <Info className="h-3 w-3" />
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-blue-300">
              Help us understand the AI solution you want to implement
            </CardDescription>
          </CardHeader>
          {showHelp && (
            <div className="absolute top-2 right-2 z-10 bg-[#0f1a2c]/95 border border-cyan-500/20 rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="text-sm font-semibold mb-1 text-cyan-400">How this helps</h4>
              <p className="text-sm text-blue-300">These responses inform the v0.dev prompt for your AI solution.</p>
            </div>
          )}
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aiSolutionType" className="text-white">
                  What type of AI solution are you exploring? *
                </Label>
                <Select
                  value={formData.aiSolutionType}
                  onValueChange={(value) => handleInputChange("aiSolutionType", value)}
                >
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${
                      errors.aiSolutionType ? "border-red-400" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select AI solution type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="ai-assistant" className="text-white hover:bg-slate-700">
                      AI Assistant
                    </SelectItem>
                    <SelectItem value="training-onboarding" className="text-white hover:bg-slate-700">
                      Training/Onboarding AI
                    </SelectItem>
                    <SelectItem value="workflow-automation" className="text-white hover:bg-slate-700">
                      Workflow Automation
                    </SelectItem>
                    <SelectItem value="predictive-analytics" className="text-white hover:bg-slate-700">
                      Predictive Analytics
                    </SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.aiSolutionType && <p className="text-sm text-red-400">{errors.aiSolutionType}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="aiPrimaryUser" className="text-white">
                  Who is the primary user of this AI solution? *
                </Label>
                <Select
                  value={formData.aiPrimaryUser}
                  onValueChange={(value) => handleInputChange("aiPrimaryUser", value)}
                >
                  <SelectTrigger
                    className={`bg-slate-800/50 border-slate-600 text-white ${
                      errors.aiPrimaryUser ? "border-red-400" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select primary user" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="internal-staff" className="text-white hover:bg-slate-700">
                      Internal Staff
                    </SelectItem>
                    <SelectItem value="executives" className="text-white hover:bg-slate-700">
                      Executives
                    </SelectItem>
                    <SelectItem value="customers" className="text-white hover:bg-slate-700">
                      Customers
                    </SelectItem>
                    <SelectItem value="partners" className="text-white hover:bg-slate-700">
                      Partners
                    </SelectItem>
                    <SelectItem value="mixed-audience" className="text-white hover:bg-slate-700">
                      Mixed Audience
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.aiPrimaryUser && <p className="text-sm text-red-400">{errors.aiPrimaryUser}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiGoal" className="text-white">
                What is the primary goal of this AI implementation? *
              </Label>
              <Textarea
                id="aiGoal"
                value={formData.aiGoal}
                onChange={(e) => handleInputChange("aiGoal", e.target.value)}
                placeholder="Example: Reduce support workload by 40%, automate internal onboarding, assist customers 24/7..."
                className={`min-h-[100px] bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 ${
                  errors.aiGoal ? "border-red-400 focus:ring-red-500" : ""
                }`}
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <div>{errors.aiGoal && <p className="text-sm text-red-400">{errors.aiGoal}</p>}</div>
                <p className="text-xs text-blue-300">{formData.aiGoal.length}/500 characters (minimum 30)</p>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center sm:justify-end">
          <Button
            onClick={handleContinue}
            disabled={!isValid}
            size="lg"
            className="w-full sm:w-auto text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:text-slate-400"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm text-blue-300">
            All fields marked with * are required. This information helps us create a customized assessment for your
            organization.
          </p>
        </div>
      </div>
    </div>
  )
}
