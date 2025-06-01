import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Mock responses based on message content
    let response = "I understand. Could you tell me more about that?"

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("organization") || lowerMessage.includes("company")) {
      response =
        "That's great! What industry is your organization in, and approximately how many employees do you have?"
    } else if (lowerMessage.includes("employee") || lowerMessage.includes("staff") || lowerMessage.includes("people")) {
      response =
        "Thank you for that information. What are the main challenges your organization is currently facing? This could be related to communication, productivity, culture, or any other areas."
    } else if (
      lowerMessage.includes("challenge") ||
      lowerMessage.includes("problem") ||
      lowerMessage.includes("issue")
    ) {
      response =
        "I see. Those are important challenges to address. How would you describe the current communication flow within your organization? Are there any bottlenecks or areas where information doesn't flow smoothly?"
    } else if (
      lowerMessage.includes("communication") ||
      lowerMessage.includes("meeting") ||
      lowerMessage.includes("email")
    ) {
      response =
        "Communication is crucial for organizational success. What tools and processes does your organization currently use for project management and collaboration?"
    } else if (lowerMessage.includes("tool") || lowerMessage.includes("software") || lowerMessage.includes("system")) {
      response =
        "That's helpful context. Now, thinking about your organizational culture, how would you describe the current level of employee engagement and satisfaction?"
    } else if (
      lowerMessage.includes("culture") ||
      lowerMessage.includes("engagement") ||
      lowerMessage.includes("satisfaction")
    ) {
      response =
        "Understanding culture is key to organizational health. What are your primary goals for this assessment? What outcomes are you hoping to achieve?"
    } else if (lowerMessage.includes("goal") || lowerMessage.includes("outcome") || lowerMessage.includes("improve")) {
      response =
        "Excellent! Based on our conversation, I'm getting a good picture of your organization. Is there anything else about your current situation or specific areas of concern you'd like to share before we proceed with the detailed assessment?"
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      response =
        "Hello! I'm excited to help you with your organizational assessment. Let's start with some basic information about your organization. What's the name of your company and what does it do?"
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Error in Bob API:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
