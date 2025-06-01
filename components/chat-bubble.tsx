"use client"

import type React from "react"

interface ChatBubbleProps {
  text: string
  isUser: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser }) => {
  return (
    <div className={`chat-bubble ${isUser ? "user" : "other"}`}>
      <p>{text}</p>
      <style jsx>{`
        .chat-bubble {
          background-color: ${isUser ? "#DCF8C6" : "#FFFFFF"};
          border-radius: 10px;
          padding: 8px 12px;
          margin-bottom: 8px;
          max-width: 70%;
          word-wrap: break-word;
          align-self: ${isUser ? "flex-end" : "flex-start"};
        }

        .user {
          background-color: #DCF8C6;
          align-self: flex-end;
        }

        .other {
          background-color: #FFFFFF;
          align-self: flex-start;
        }
      `}</style>
    </div>
  )
}

export default ChatBubble
