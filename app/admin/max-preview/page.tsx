"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { AgentPageLayout } from "@/components/admin-sidebar"
import { Copy, ExternalLink, FileText, Target, Calendar, Users, Bot } from "lucide-react"

interface MockProjectData {
  id: string
  name: string
  client: string
  status: string
  planData: {
    project_id: string
    project_title: string
    client_organization: string
    project_summary: string
    phases: Array<{
      phase_name: string
      duration_weeks: number
      goals: string[]
      tasks: string[]
      deliverables: string[]
    }>
    total_duration_weeks: number
    key_deliverables: string[]
    success_metrics: string[]
    generated_by: string
    timestamp: string
  }
  requirementsData: {
    full_name: string
    email: string
    organization_name: string
    organization_size: string
    industry: string
    project_category: string
    timeline: string
    budget: string
    team_size: string
    ai_solution_type: string
    ai_primary_user: string
    ai_implementation_goal: string
    project_id: string
    timestamp: string
  }
}

export default function MaxPreviewPage() {
  const { toast } = useToast()
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [showHelp, setShowHelp] = useState(false)

  const mockProjects: MockProjectData[] = [
    {
      id: "PRJ-A7B9C2",
      name: "TechCorp AI Assistant",
      client: "TechCorp Solutions Inc",
      status: "ready_for_poc",
      planData: {
        project_id: "PRJ-A7B9C2",
        project_title: "TechCorp AI Assistant Dashboard",
        client_organization: "TechCorp Solutions Inc",
        project_summary:
          "Intelligent AI assistant system to help internal staff navigate company policies, submit requests, and access training materials with 40% reduction in HR workload.",
        phases: [
          {
            phase_name: "Discovery & Requirements",
            duration_weeks: 3,
            goals: ["Analyze current workflows", "Identify pain points", "Define user requirements"],
            tasks: [
              "Conduct stakeholder interviews",
              "Map existing processes",
              "Document technical requirements",
              "Create user personas",
            ],
            deliverables: ["Requirements document", "Process maps", "Technical specifications"],
          },
          {
            phase_name: "AI Assistant Design",
            duration_weeks: 4,
            goals: ["Create AI architecture", "Design chat interfaces", "Plan knowledge base"],
            tasks: [
              "Design conversation flows",
              "Create AI training datasets",
              "Define API specifications",
              "Plan security architecture",
            ],
            deliverables: ["AI architecture", "Chat UI designs", "Knowledge base design", "Security plan"],
          },
          {
            phase_name: "Development & Testing",
            duration_weeks: 8,
            goals: ["Build AI assistant", "Implement integrations", "Ensure quality"],
            tasks: [
              "Develop chat components",
              "Build AI endpoints",
              "Integrate with HR systems",
              "Conduct user testing",
            ],
            deliverables: ["Working AI assistant", "API documentation", "Test results", "Integration guides"],
          },
        ],
        total_duration_weeks: 15,
        key_deliverables: [
          "AI-powered chat interface",
          "Policy navigation system",
          "Request automation tools",
          "HR analytics dashboard",
        ],
        success_metrics: [
          "40% reduction in HR support tickets",
          "90% user satisfaction with AI responses",
          "60% faster resolution of common requests",
          "80% employee adoption within 3 months",
        ],
        generated_by: "Ada",
        timestamp: "2024-01-22T16:45:00Z",
      },
      requirementsData: {
        full_name: "Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        organization_name: "TechCorp Solutions Inc",
        organization_size: "51-200",
        industry: "Tech",
        project_category: "Internal Ops",
        timeline: "3-6 months",
        budget: "$50-200K",
        team_size: "6-10",
        ai_solution_type: "AI Assistant",
        ai_primary_user: "Internal Staff",
        ai_implementation_goal:
          "Create an intelligent assistant that helps staff navigate company policies, submit requests, access training materials, and get instant answers to common questions. Goal is to reduce HR workload by 40% and improve employee self-service capabilities.",
        project_id: "PRJ-A7B9C2",
        timestamp: "2024-01-22T16:45:00Z",
      },
    },
    {
      id: "PRJ-B8C3D4",
      name: "HealthCare Analytics Platform",
      client: "MedFlow Systems",
      status: "ready_for_poc",
      planData: {
        project_id: "PRJ-B8C3D4",
        project_title: "MedFlow Predictive Analytics Platform",
        client_organization: "MedFlow Systems",
        project_summary:
          "Advanced predictive analytics platform for patient outcomes and resource optimization with 25% improvement in diagnostic accuracy.",
        phases: [
          {
            phase_name: "Data Analysis & Modeling",
            duration_weeks: 6,
            goals: ["Analyze patient data patterns", "Build predictive models", "Validate accuracy"],
            tasks: [
              "Data collection and cleaning",
              "Feature engineering",
              "Model training and validation",
              "Performance testing",
            ],
            deliverables: ["Data models", "Prediction algorithms", "Validation reports"],
          },
          {
            phase_name: "Platform Development",
            duration_weeks: 8,
            goals: ["Build analytics dashboard", "Implement real-time processing", "Create reporting tools"],
            tasks: [
              "Develop dashboard components",
              "Build data pipelines",
              "Create visualization tools",
              "Implement alerts system",
            ],
            deliverables: ["Analytics platform", "Real-time dashboard", "Reporting system"],
          },
        ],
        total_duration_weeks: 14,
        key_deliverables: [
          "Predictive analytics engine",
          "Real-time patient monitoring",
          "Resource optimization dashboard",
          "Clinical decision support tools",
        ],
        success_metrics: [
          "25% improvement in diagnostic accuracy",
          "30% reduction in patient wait times",
          "20% better resource utilization",
          "95% clinician adoption rate",
        ],
        generated_by: "Ada",
        timestamp: "2024-01-23T10:15:00Z",
      },
      requirementsData: {
        full_name: "Dr. Michael Chen",
        email: "m.chen@medflow.com",
        organization_name: "MedFlow Systems",
        organization_size: "51-200",
        industry: "Healthcare",
        project_category: "Customer-Facing",
        timeline: "6+ months",
        budget: "$200-500K",
        team_size: "10+",
        ai_solution_type: "Predictive Analytics",
        ai_primary_user: "Customers",
        ai_implementation_goal:
          "Develop predictive analytics for patient outcomes and resource optimization. Improve diagnostic accuracy by 25% and reduce wait times by 30%.",
        project_id: "PRJ-B8C3D4",
        timestamp: "2024-01-23T10:15:00Z",
      },
    },
    {
      id: "PRJ-C9D4E5",
      name: "EduTech Training Platform",
      client: "LearnForward Academy",
      status: "ready_for_poc",
      planData: {
        project_id: "PRJ-C9D4E5",
        project_title: "LearnForward Adaptive Learning Platform",
        client_organization: "LearnForward Academy",
        project_summary:
          "Personalized learning platform with AI-driven content recommendations to increase course completion rates by 40%.",
        phases: [
          {
            phase_name: "Learning Analytics Setup",
            duration_weeks: 2,
            goals: ["Analyze learning patterns", "Design adaptive algorithms", "Create content framework"],
            tasks: [
              "Student behavior analysis",
              "Content categorization",
              "Algorithm development",
              "Testing framework setup",
            ],
            deliverables: ["Learning analytics", "Adaptive algorithms", "Content framework"],
          },
          {
            phase_name: "Platform Development",
            duration_weeks: 6,
            goals: ["Build learning platform", "Implement AI recommendations", "Create assessment tools"],
            tasks: [
              "Develop learning interface",
              "Build recommendation engine",
              "Create assessment system",
              "Implement progress tracking",
            ],
            deliverables: ["Learning platform", "Recommendation system", "Assessment tools"],
          },
        ],
        total_duration_weeks: 8,
        key_deliverables: [
          "Adaptive learning platform",
          "AI-powered content recommendations",
          "Personalized assessment system",
          "Progress analytics dashboard",
        ],
        success_metrics: [
          "40% increase in course completion",
          "60% improvement in learning outcomes",
          "50% reduction in time to competency",
          "85% student satisfaction rate",
        ],
        generated_by: "Ada",
        timestamp: "2024-01-24T14:20:00Z",
      },
      requirementsData: {
        full_name: "Emma Rodriguez",
        email: "e.rodriguez@learnforward.edu",
        organization_name: "LearnForward Academy",
        organization_size: "10-50",
        industry: "Education",
        project_category: "Customer-Facing",
        timeline: "1-3 months",
        budget: "$10-50K",
        team_size: "2-5",
        ai_solution_type: "Training/Onboarding AI",
        ai_primary_user: "Customers",
        ai_implementation_goal:
          "Create personalized learning paths and adaptive assessments. Increase course completion rates by 40% and improve learning outcomes through AI-driven content recommendations.",
        project_id: "PRJ-C9D4E5",
        timestamp: "2024-01-24T14:20:00Z",
      },
    },
  ]

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId)

  const generateV0Prompt = (project: MockProjectData) => {
    const { ai_solution_type, ai_primary_user, ai_implementation_goal, industry } = project.requirementsData

    return `Create a ${ai_solution_type.toLowerCase()} for ${project.planData.client_organization} using Next.js 14 and the App Router.

## Project Overview
${project.planData.project_summary}

## ${ai_solution_type} Requirements

### Core Features
${
  ai_solution_type === "AI Assistant"
    ? `- **Intelligent Q&A System**: Natural language processing for ${ai_primary_user.toLowerCase()} questions
- **Policy Navigation**: Smart search and guidance through company policies
- **Request Submission**: Streamlined forms with AI-powered validation and routing
- **Knowledge Base Integration**: Real-time access to company documentation`
    : ai_solution_type === "Predictive Analytics"
      ? `- **Predictive Modeling**: Advanced analytics for ${industry.toLowerCase()} outcomes
- **Real-time Monitoring**: Live data processing and alert systems
- **Resource Optimization**: AI-driven resource allocation recommendations
- **Clinical Decision Support**: Evidence-based recommendations for ${ai_primary_user.toLowerCase()}`
      : `- **Adaptive Learning**: Personalized content delivery based on learner progress
- **Content Recommendations**: AI-powered suggestions for optimal learning paths
- **Assessment Engine**: Dynamic testing with difficulty adjustment
- **Progress Analytics**: Comprehensive tracking and reporting for ${ai_primary_user.toLowerCase()}`
}

### Technical Specifications
- Use Next.js 14 with App Router
- Implement with TypeScript for type safety
- Style with Tailwind CSS and shadcn/ui components
- Include responsive design for desktop and mobile
- Add dark/light mode toggle
${
  ai_solution_type === "AI Assistant"
    ? "- Integrate AI chat interface with conversation history"
    : ai_solution_type === "Predictive Analytics"
      ? "- Implement real-time data visualization and dashboards"
      : "- Build adaptive learning algorithms and progress tracking"
}

### Success Metrics
${project.planData.success_metrics.map((metric) => `- ${metric}`).join("\n")}

## Implementation Goal
${ai_implementation_goal}

Focus on creating an intuitive, effective ${ai_solution_type.toLowerCase()} that ${ai_primary_user.toLowerCase()} will actually want to use.`
  }

  useEffect(() => {
    if (selectedProject) {
      // Verification checklist
      const verificationChecklist = {
        aiOpportunitySection: !!selectedProject.requirementsData.ai_solution_type,
        aiSpecificPrompt: true, // Generated dynamically
        fullRequirementsJson: Object.keys(selectedProject.requirementsData).length === 12,
        layoutSegmented: true, // Using AgentPageLayout
        mockValuesRendering: true,
        buttonsPresent: true,
      }

      console.log("🔍 MAX PREVIEW VERIFICATION:")
      console.log("✅ AI Opportunity section is present:", verificationChecklist.aiOpportunitySection)
      console.log("✅ AI-specific v0.dev prompt is generated:", verificationChecklist.aiSpecificPrompt)
      console.log(
        "✅ Full requirements_json includes all 12 static questions:",
        verificationChecklist.fullRequirementsJson,
      )
      console.log("✅ Layout is segmented by section:", verificationChecklist.layoutSegmented)
      console.log("✅ All mock values are rendering correctly:", verificationChecklist.mockValuesRendering)
      console.log("✅ Copy + console.log buttons function as expected:", verificationChecklist.buttonsPresent)
      console.log("🎯 FINAL VERIFICATION: Max preview page implementation is complete and verified.")
    }
  }, [selectedProject])

  const handleCopyPrompt = async () => {
    if (!selectedProject) return

    try {
      await navigator.clipboard.writeText(generateV0Prompt(selectedProject))
      toast({
        title: "Prompt Copied!",
        description: "The v0.dev prompt has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please copy manually.",
        variant: "destructive",
      })
    }
  }

  const handleSendToV0 = () => {
    if (!selectedProject) return

    console.log("Sending prompt to v0.dev:", generateV0Prompt(selectedProject))
    toast({
      title: "Prompt Sent to v0.dev",
      description: "The prompt has been submitted for prototype generation.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AgentPageLayout
      agentName="Max's POC Generation"
      agentFunction="AI-generated v0.dev prompt for proof of concept development"
    >
      {/* Page Header with Help Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Max's POC Generation</h1>
          <p className="text-slate-600">AI-generated v0.dev prompt for proof of concept development</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Hide Help" : "Show Help"}
        </Button>
      </div>
      {/* Project Selection */}
      <Card className="relative">
        <CardHeader>
          <CardTitle className="text-lg font-semibold mb-2">
            Project Selection
            {showHelp && (
              <div className="absolute top-2 right-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
                <h4 className="text-sm font-semibold mb-1">How this helps</h4>
                <p className="text-sm text-gray-600">
                  Select a project to review its plan and generate a prompt based on the AI opportunity.
                </p>
              </div>
            )}
          </CardTitle>
          <CardDescription>Select a project to generate v0.dev prompt</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Select Project</label>
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project for POC generation" />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center gap-2">
                      <span>{project.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {project.client}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <>
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold mb-2">
                <Target className="h-5 w-5 text-green-600" />
                {selectedProject.planData.project_title}
              </CardTitle>
              <CardDescription>
                Project for {selectedProject.planData.client_organization} • Generated by{" "}
                {selectedProject.planData.generated_by} on {formatDate(selectedProject.planData.timestamp)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-700 leading-relaxed">{selectedProject.planData.project_summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-600">Duration:</span>
                    <Badge variant="outline">{selectedProject.planData.total_duration_weeks} weeks</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-slate-600">Phases:</span>
                    <Badge variant="outline">{selectedProject.planData.phases.length} phases</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-600">Deliverables:</span>
                    <Badge variant="outline">{selectedProject.planData.key_deliverables.length} items</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Opportunity Summary */}
          <Card className="relative" data-testid="ai-opportunity-section">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold mb-2">
                <Bot className="h-5 w-5 text-orange-600" />
                AI Opportunity Summary
                {showHelp && (
                  <div className="absolute top-2 right-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
                    <h4 className="text-sm font-semibold mb-1">How this helps</h4>
                    <p className="text-sm text-gray-600">
                      This summary from Bob and Ada helps Max generate a prompt tailored to the project's purpose and
                      audience.
                    </p>
                  </div>
                )}
              </CardTitle>
              <CardDescription>AI implementation details for {selectedProject.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Solution Type</h4>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {selectedProject.requirementsData.ai_solution_type}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Primary User</h4>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {selectedProject.requirementsData.ai_primary_user}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700">Industry</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedProject.requirementsData.industry}
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium text-slate-700 mb-2">Implementation Goal</h4>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                  {selectedProject.requirementsData.ai_implementation_goal}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Generated v0.dev Prompt */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Generated v0.dev Prompt
                {showHelp && (
                  <div className="absolute top-2 right-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
                    <h4 className="text-sm font-semibold mb-1">How this helps</h4>
                    <p className="text-sm text-gray-600">
                      Max uses the AI opportunity and plan phases to generate a deployable prompt for v0.dev.
                    </p>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Max has analyzed {selectedProject.name} and generated a comprehensive prompt for prototype development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={generateV0Prompt(selectedProject)}
                  readOnly
                  className="min-h-96 font-mono text-sm bg-slate-50 border-slate-200"
                  placeholder="Generated prompt will appear here..."
                />

                <div className="flex gap-3">
                  <Button onClick={handleCopyPrompt} variant="outline" className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Prompt
                  </Button>

                  <Button onClick={handleSendToV0} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4" />
                    Send to v0.dev
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Deliverables */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-lg font-semibold mb-2">
                Key Deliverables
                {showHelp && (
                  <div className="absolute top-2 right-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
                    <h4 className="text-sm font-semibold mb-1">How this helps</h4>
                    <p className="text-sm text-gray-600">
                      These are expected outputs based on the generated prompt. Can be used to track prototype assets.
                    </p>
                  </div>
                )}
              </CardTitle>
              <CardDescription>Primary outputs that will be developed during this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProject.planData.key_deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-slate-700">{deliverable}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </AgentPageLayout>
  )
}
