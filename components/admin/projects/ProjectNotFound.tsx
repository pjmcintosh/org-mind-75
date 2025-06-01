import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"

interface ProjectNotFoundProps {
  projectId: string
}

export function ProjectNotFound({ projectId }: ProjectNotFoundProps) {
  console.log(`Project not found for ID: ${projectId}`)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-slate-900">Project Not Found</h2>
          <p className="text-slate-600 mb-4">
            The project with ID <span className="font-mono font-medium">"{projectId}"</span> could not be found in our
            records.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">
              Please check the project ID or contact your administrator if you believe this is an error.
            </p>
          </div>
          <div className="mt-6">
            <Button asChild className="w-full">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
