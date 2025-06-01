export interface SignoffItem {
  title: string
  agent: string
  type: "Project Plan" | "POC" | "Contract"
  confidence: number
  submitted: string
}

export const signoffQueue: SignoffItem[] = [
  {
    title: "Digital Transformation Roadmap",
    agent: "Ada",
    type: "Project Plan",
    confidence: 92,
    submitted: "2025-05-20",
  },
  {
    title: "AI Co-Pilot POC for Workforce Automation",
    agent: "Max",
    type: "POC",
    confidence: 87,
    submitted: "2025-05-18",
  },
  {
    title: "Vendor NDA - Draft 3",
    agent: "Jason",
    type: "Contract",
    confidence: 78,
    submitted: "2025-05-17",
  },
]

console.log("Loaded: signoffs mock data")
