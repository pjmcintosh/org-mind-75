"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TiloChatProps {
  onMessageSent: (message: string) => void
}

const TiloChat: React.FC<TiloChatProps> = ({ onMessageSent }) => {
  const [message, setMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const recognition = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition
      const SpeechGrammarList = window.webkitSpeechGrammar
      const SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent

      recognition.current = new SpeechRecognition()
      recognition.current.continuous = false
      recognition.current.lang = "en-US"
      recognition.current.interimResults = false
      recognition.current.maxAlternatives = 1

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setMessage(transcript)
      }

      recognition.current.onspeechend = () => {
        setIsListening(false)
        recognition.current?.stop()
      }

      recognition.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }
    } else {
      console.warn("Web Speech API is not supported in this browser.")
    }

    return () => {
      recognition.current?.stop()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onMessageSent(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true)
      recognition.current.start()
    }
  }

  const stopListening = () => {
    if (recognition.current) {
      setIsListening(false)
      recognition.current.stop()
    }
  }

  return (
    <div className="tilo-chat">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onInput={handleTextAreaChange}
        placeholder="Type your message..."
        className="tilo-chat-input"
      />
      <div className="tilo-chat-buttons">
        <button onClick={handleSendMessage} className="tilo-chat-send-button">
          Send
        </button>
        {"webkitSpeechRecognition" in window && (
          <button onClick={isListening ? stopListening : startListening} className="tilo-chat-mic-button">
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        )}
      </div>
    </div>
  )
}

export default TiloChat
