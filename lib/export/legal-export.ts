// Legal document export utilities
export interface LegalDocumentData {
  contractType: string
  content: string
  generatedAt: string
  confidence: number
  tokensUsed: number
  estimatedCost: string
}

export const exportToPDF = async (documentData: LegalDocumentData) => {
  console.log(`Exported ${documentData.contractType} as PDF`)

  // Mock PDF export - in real implementation would use jsPDF or similar
  const element = document.getElementById("legal-document-content")
  if (!element) return

  // Simulate PDF generation
  const blob = new Blob(["PDF content would be here"], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${documentData.contractType.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const exportToDOCX = async (documentData: LegalDocumentData) => {
  console.log(`Exported ${documentData.contractType} as DOCX`)

  // Mock DOCX export - in real implementation would use docx library
  const blob = new Blob(["DOCX content would be here"], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${documentData.contractType.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.docx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const copyToClipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    console.log("Legal document copied to clipboard")
    return true
  } catch (err) {
    console.error("Failed to copy to clipboard:", err)
    return false
  }
}
