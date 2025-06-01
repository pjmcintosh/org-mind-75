"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Edit, CheckCircle, Building, MessageSquare } from "lucide-react"
import HelpToggle from "@/components/overlays/help-toggle"

interface StaticQuestion {
  question: string
  answer: string
}

interface DynamicQuestion {
  question: string
  answer: string
}

export default function ReviewSummaryPage() {
  console.log("Loaded: ClientReviewSummary")

  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock static questions (Organization & Project Info)
  const [staticQuestions] = useState<StaticQuestion[]>([
    { question: "Full Name", answer: "Sarah Johnson" },
    { question: "Email Address", answer: "sarah.johnson@techcorp.com" },
    { question: "Organization Name", answer: "TechCorp Solutions Inc" },
    { question: "Organization Size", answer: "201-1000 employees" },
    { question: "Industry", answer: "Technology" },
    { question: "Project Category", answer: "Internal Operations" },
    { question: "Timeline", answer: "3-6 months" },
    { question: "Budget Range", answer: "$50,000 - $200,000" },
    { question: "Team Size", answer: "6-10 people" },
  ])

  // Mock dynamic questions (Project-Specific Context)
  const [dynamicQuestions] = useState<DynamicQuestion[]>([
    {
      question: "What are the main challenges your organization is currently facing?",
      answer:
        "Our main challenges include integrating legacy systems with newer technologies, resistance to change from some team members, and a skills gap in emerging digital technologies like AI and cloud computing.",
    },
    {
      question: "What specific outcomes are you hoping to achieve through this project?",
      answer:
        "We want to improve operational efficiency, enhance customer experience, enable remote work capabilities, and position ourselves as a leader in our industry through innovative technology adoption.",
    },
    {
      question: "How would you describe your current technology infrastructure?",
      answer:
        "We have a mix of legacy systems from the early 2000s and some newer cloud-based tools. Our data is siloed across different departments, and we lack a unified platform for collaboration.",
    },
    {
      question: "What is your organization's experience with digital transformation initiatives?",
      answer:
        "This is our first major digital transformation effort. We've done some small-scale technology upgrades, but nothing comprehensive. Leadership is committed but we need guidance on best practices.",
    },
    {
      question: "Are there any specific compliance or regulatory requirements we should consider?",
      answer:
        "Yes, we need to comply with SOC 2 Type II requirements for our client data handling, and we're also subject to state privacy regulations. Data security and audit trails are critical.",
    },
  ])

  const generateRequirementsJson = () => {
    const requirements = {
      project_id: "PRJ-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      timestamp: new Date().toISOString(),
      client_info: {
        name: staticQuestions[0].answer,
        email: staticQuestions[1].answer,
        organization: staticQuestions[2].answer,
      },
      organization_details: {
        size: staticQuestions[3].answer,
        industry: staticQuestions[4].answer,
      },
      project_scope: {
        category: staticQuestions[5].answer,
        timeline: staticQuestions[6].answer,
        budget: staticQuestions[7].answer,
        team_size: staticQuestions[8].answer,
      },
      detailed_requirements: dynamicQuestions.map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
      confidence_score: 0.92,
      generated_by: "Bob",
      status: "ready_for_planning",
    }

    return requirements
  }

  const handleApproveAndSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate and log requirements JSON
      const requirementsJson = generateRequirementsJson()
      console.log("Generated Requirements JSON:", JSON.stringify(requirementsJson, null, 2))

      // Show success toast
      toast({
        title: "Project Submitted Successfully!",
        description: "Your project has been approved and sent for processing.",
      })

      // Navigate to confirmation page
      router.push("/client/confirmation")
    } catch (error) {
      console.error("Error submitting project:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your project. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1323] to-[#101d34] text-white px-6 py-10">
      {/* Help Overlay */}
      <div className="flex justify-end mb-4">
        <HelpToggle
          title="Review Summary Help"
          content={
            <div>
              This summary provides a snapshot of your project submissions and their current status.
              <br />
              <br />
              <strong>Key Sections:</strong>
              <ul className="list-disc ml-4 mt-2">
                <li>
                  <b>Status</b>: Your project's current review stage
                </li>
                <li>
                  <b>AI Insight</b>: Generated recommendations or alerts
                </li>
                <li>
                  <b>Feedback</b>: Analyst notes, if available
                </li>
                <li>
                  <b>Date Submitted</b>: When your project was initially submitted
                </li>
              </ul>
              <br />
              <strong>Next Steps:</strong>
              <br />
              Review the insights and feedback to understand your project's progress. Contact support if you have
              questions about any recommendations.
            </div>
          }
        />
      </div>

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-cyan-400">Review Summary</h1>
        <p className="text-blue-300">A snapshot of your current engagements and insights</p>
      </div>

      {/* Organization & Project Info Section */}
      <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 shadow-cyan-500/10 shadow-md">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
            <Building className="h-5 w-5 text-cyan-400" />
            Organization & Project Info
          </h2>
          <p className="text-blue-300">Your basic project and organizational details</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-cyan-500/20">
                <TableHead className="w-1/3 min-w-[120px] text-cyan-400">Question</TableHead>
                <TableHead className="min-w-[200px] text-cyan-400">Your Answer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staticQuestions.map((item, index) => (
                <TableRow key={index} className="border-cyan-500/20">
                  <TableCell className="font-medium text-blue-200">{item.question}</TableCell>
                  <TableCell className="text-white">{item.answer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Project-Specific Context Section */}
      <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-6 space-y-4 shadow-cyan-500/10 shadow-md">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            Project-Specific Context
          </h2>
          <p className="text-blue-300">Your detailed responses from the conversation with Bob</p>
        </div>
        <div className="space-y-6">
          {dynamicQuestions.map((item, index) => (
            <div key={index} className="border-l-4 border-cyan-500/40 pl-4 py-2">
              <h4 className="font-semibold text-cyan-400 mb-2">{item.question}</h4>
              <p className="text-blue-200 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-cyan-500/10 shadow-md">
          <div className="text-2xl font-bold text-cyan-400">{staticQuestions.length}</div>
          <div className="text-sm text-blue-300">Basic Questions</div>
        </div>
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-cyan-500/10 shadow-md">
          <div className="text-2xl font-bold text-cyan-400">{dynamicQuestions.length}</div>
          <div className="text-sm text-blue-300">Detailed Questions</div>
        </div>
        <div className="bg-[#0f1a2c]/80 border border-cyan-500/20 backdrop-blur-sm rounded-xl p-4 text-center shadow-cyan-500/10 shadow-md">
          <div className="text-2xl font-bold text-cyan-400">92%</div>
          <div className="text-sm text-blue-300">Completeness</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4 sm:pt-6">
        <Link href="/client/intake">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Edit className="h-4 w-4 mr-2" />
            Edit Answers
          </Button>
        </Link>

        <Button
          onClick={handleApproveAndSubmit}
          disabled={isSubmitting}
          size="lg"
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Submit
            </>
          )}
        </Button>
      </div>

      {/* Footer Help Text */}
      <div className="text-center pt-4 px-4">
        <p className="text-xs sm:text-sm text-blue-300">
          Once approved, your project will be sent to our AI team for analysis and planning. You'll receive updates on
          the confirmation page.
        </p>
      </div>
    </div>
  )
}
