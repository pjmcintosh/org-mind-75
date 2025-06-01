// Board Summary Data for Executive AI Governance Dashboard
// Structured for board-level readability and future API binding

export interface BoardGovernance {
  aiInFilings: string
  trainingStatus: string
  skillsMatrixNote: string
  complianceScore: number
  riskLevel: "Low" | "Medium" | "High"
}

export interface BoardMeetings {
  timeOnAI: string
  agendaUpdate: string
  caremarkNote: string
  quarterlyFocus: number
  meetingsHeld: number
  aiDecisions: number
}

export interface TrainingAndDocs {
  acceptedSources: string[]
  uploadInstructions: string
  currentGaps: string
  completionRate: number
  certificationsSubmitted: number
  trainingHours: number
}

export interface BoardMetrics {
  totalMembers: number
  trainedMembers: number
  compliancePercentage: number
  meetingFocusPercentage: number
  riskGaps: number
  lastUpdated: string
}

export interface BoardMember {
  name: string
  role: string
  aiTrainingComplete: boolean
  lastTrainingDate?: string
  certifications: string[]
  riskCoverage: "Complete" | "Partial" | "None"
}

export interface BoardSummaryData {
  governance: BoardGovernance
  meetings: BoardMeetings
  trainingAndDocs: TrainingAndDocs
  metrics: BoardMetrics
  members: BoardMember[]
  quarterlyHighlights: string[]
  riskAssessment: {
    level: "Low" | "Medium" | "High"
    factors: string[]
    mitigationActions: string[]
  }
}

export const BoardSummary: BoardSummaryData = {
  governance: {
    aiInFilings:
      "83% of recent filings include AI-related disclosures, demonstrating strong regulatory compliance posture.",
    trainingStatus: "4 out of 9 board members have logged at least one AI learning milestone this fiscal year.",
    skillsMatrixNote:
      "Board coverage is strong in finance and legal domains but underrepresented in AI risk and systems oversight capabilities.",
    complianceScore: 83,
    riskLevel: "Medium",
  },

  meetings: {
    timeOnAI:
      "22% of board meeting time last quarter was dedicated to AI strategy, risk assessment, and governance discussions.",
    agendaUpdate:
      "All board agendas now include a mandatory 'AI Risk & Opportunity Assessment' segment per updated governance protocols.",
    caremarkNote:
      "Caremark exposure exists for 3 members lacking validated AI oversight training, requiring immediate attention.",
    quarterlyFocus: 22,
    meetingsHeld: 4,
    aiDecisions: 7,
  },

  trainingAndDocs: {
    acceptedSources: [
      "LinkedIn Learning AI Governance Certification",
      "Harvard Executive Education AI Strategy Program",
      "MIT Sloan AI Governance and Risk Management",
      "Stanford Directors' College AI Oversight",
      "NACD Blue Ribbon Commission AI Training",
    ],
    uploadInstructions:
      "Board members may submit proof of completion certificates for inclusion in the corporate governance oversight archive and fiduciary documentation.",
    currentGaps:
      "3 directors lack current AI training records or validated documentation, creating potential governance and liability exposure.",
    completionRate: 67,
    certificationsSubmitted: 12,
    trainingHours: 156,
  },

  metrics: {
    totalMembers: 9,
    trainedMembers: 4,
    compliancePercentage: 83,
    meetingFocusPercentage: 22,
    riskGaps: 3,
    lastUpdated: "2024-12-29",
  },

  members: [
    {
      name: "Sarah Chen",
      role: "Board Chair",
      aiTrainingComplete: true,
      lastTrainingDate: "2024-11-15",
      certifications: ["Harvard AI Strategy", "MIT AI Governance"],
      riskCoverage: "Complete",
    },
    {
      name: "Michael Rodriguez",
      role: "Audit Committee Chair",
      aiTrainingComplete: true,
      lastTrainingDate: "2024-10-22",
      certifications: ["LinkedIn AI Governance"],
      riskCoverage: "Partial",
    },
    {
      name: "Dr. Jennifer Walsh",
      role: "Technology Committee Chair",
      aiTrainingComplete: true,
      lastTrainingDate: "2024-12-01",
      certifications: ["Stanford Directors' College", "NACD AI Training"],
      riskCoverage: "Complete",
    },
    {
      name: "Robert Kim",
      role: "Compensation Committee Chair",
      aiTrainingComplete: true,
      lastTrainingDate: "2024-09-18",
      certifications: ["Harvard AI Strategy"],
      riskCoverage: "Partial",
    },
    {
      name: "Lisa Thompson",
      role: "Independent Director",
      aiTrainingComplete: false,
      certifications: [],
      riskCoverage: "None",
    },
    {
      name: "David Park",
      role: "Independent Director",
      aiTrainingComplete: false,
      certifications: [],
      riskCoverage: "None",
    },
    {
      name: "Maria Gonzalez",
      role: "Independent Director",
      aiTrainingComplete: false,
      certifications: [],
      riskCoverage: "None",
    },
    {
      name: "James Wilson",
      role: "Lead Independent Director",
      aiTrainingComplete: false,
      certifications: [],
      riskCoverage: "Partial",
    },
    {
      name: "Dr. Amanda Foster",
      role: "Risk Committee Chair",
      aiTrainingComplete: false,
      certifications: [],
      riskCoverage: "None",
    },
  ],

  quarterlyHighlights: [
    "Implemented mandatory AI risk assessment in all board agendas",
    "4 board members completed recognized AI governance training programs",
    "83% compliance rate achieved for AI disclosure requirements",
    "Identified and documented 3 critical training gaps requiring immediate action",
    "Established partnership with Harvard and MIT for ongoing director education",
  ],

  riskAssessment: {
    level: "Medium",
    factors: [
      "33% of board members lack AI oversight training",
      "Potential Caremark liability exposure for untrained directors",
      "Rapid AI adoption outpacing governance framework updates",
      "Regulatory landscape evolving faster than board competency development",
    ],
    mitigationActions: [
      "Mandate AI training completion for all directors by Q2 2025",
      "Establish quarterly AI risk assessment reviews",
      "Engage external AI governance consultants for board education",
      "Implement director liability insurance updates for AI oversight",
    ],
  },
}

// Helper functions for data access and manipulation
export const getBoardComplianceScore = (): number => {
  return BoardSummary.metrics.compliancePercentage
}

export const getTrainedMembersCount = (): { trained: number; total: number } => {
  return {
    trained: BoardSummary.metrics.trainedMembers,
    total: BoardSummary.metrics.totalMembers,
  }
}

export const getRiskLevel = (): "Low" | "Medium" | "High" => {
  return BoardSummary.riskAssessment.level
}

export const getUntrainedMembers = (): BoardMember[] => {
  return BoardSummary.members.filter((member) => !member.aiTrainingComplete)
}

export const getQuarterlyMetrics = () => {
  return {
    complianceScore: BoardSummary.governance.complianceScore,
    meetingFocus: BoardSummary.meetings.quarterlyFocus,
    trainedMembers: BoardSummary.metrics.trainedMembers,
    totalMembers: BoardSummary.metrics.totalMembers,
    riskGaps: BoardSummary.metrics.riskGaps,
  }
}

export const getBoardSkillsMatrix = () => {
  return BoardSummary.members.map((member) => ({
    name: member.name,
    role: member.role,
    aiCompetency: member.aiTrainingComplete,
    riskCoverage: member.riskCoverage,
    certificationCount: member.certifications.length,
  }))
}
