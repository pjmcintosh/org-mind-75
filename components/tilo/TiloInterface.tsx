"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Mic, MicOff } from "lucide-react"

// This component might be using its own speech recognition implementation
export default function TiloInterface() {
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<any[]>([])

  // Custom speech recognition implementation that might conflict
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser")
      return
    }

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInputValue(transcript)
      // Process transcript
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  // Rest of the component...
  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-4">
            {/* Message content */}
          </div>
        ))}
      </div>

      {/* Input area with custom mic button */}
      <div className="border-t border-gray-700 p-4 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2"
          placeholder="Type a message..."
        />
        <Button
          onClick={handleVoiceInput}
          className={`ml-2 p-2 rounded-full ${isListening ? "bg-red-500" : "bg-blue-500"}`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>
        <Button
          onClick={() => {
            /* Send message logic */
          }}
          disabled={!inputValue.trim()}
          className="ml-2 p-2 rounded-full bg-blue-600"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
